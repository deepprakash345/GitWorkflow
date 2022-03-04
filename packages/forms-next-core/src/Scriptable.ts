import {Action, RulesJson, ScriptableField} from './types';
import {BaseNode} from './BaseNode';
import {propertyChange} from './controller/Controller';

/**
 * Defines scriptable aspects (ie rules, events) of form runtime model. Any form runtime object which requires
 * execution of rules/events should extend from this class.
 */
abstract class Scriptable<T extends RulesJson> extends BaseNode<T> implements ScriptableField {
    private _events: {
        [key: string]: any
    } = {};

    private _rules: {
        [key: string]: any
    } = {};

    get rules() {
        return this._jsonModel.rules || {};
    }

    private getCompiledRule(eName: string, rule: string) {
        if (!(eName in this._rules)) {
            let eString = rule || this.rules[eName];
            if (typeof eString === 'string' && eString.length > 0) {
                this._rules[eName] = this.ruleEngine.compileRule(eString);
            } else {
                throw new Error(`only expression strings are supported. ${typeof (eString)} types are not supported`);
            }
        }
        return this._rules[eName];
    }

    private getCompiledEvent(eName: string) {
        if (!(eName in this._events)) {
            let eString = this._jsonModel.events?.[eName];
            if (typeof eString === 'string' && eString.length > 0) {
                eString = [eString];
            }
            if (typeof  eString !== 'undefined' && eString.length > 0) {
                this._events[eName] = (eString as string[]).map(x => this.ruleEngine.compileRule(x));
            }
        }
        return this._events[eName] || [];
    }

    private applyUpdates(updates: any ) {
        Object.entries(updates).forEach(([key, value]) => {
            // @ts-ignore
            // the first check is to disable accessing this.value & this.items property
            // otherwise that will trigger dependency tracking
            if (key in this._jsonModel || (key in this && typeof this[key] !== 'function')) {
                try {
                    // @ts-ignore
                    this[key] = value;
                } catch (e) {
                    console.error(e);
                }
            }
        });
    }

    protected executeAllRules(context: any) {
        const entries = Object.entries(this.rules);
        if (entries.length > 0) {
            const scope = this.getExpressionScope();
            const values = entries.map(([prop, rule]) => {
                const node = this.getCompiledRule(prop, rule);
                let newVal = this.ruleEngine.execute(node, scope, context, true);
                //@ts-ignore
                if (newVal != this._jsonModel[prop]) {
                    return [prop, newVal];
                } else {
                    return [];
                }
            }).filter(x => x.length == 2);
            this.applyUpdates(Object.fromEntries(values));
        }
    }

    private getExpressionScope() {
        const target = {
            self: this.getRuleNode(),
            siblings: this.parent?.ruleNodeReference() || {}
        };
        const scope = new Proxy(target, {
            get: (target: any, prop: string | Symbol, receiver) => {
                if (prop === Symbol.toStringTag) {
                    return 'Object';
                }
                prop = prop as string;
                // The order of resolution is
                // 1. property
                // 2. sibling
                // 3. child
                if (prop.startsWith('$')) {
                    //this returns children as well, so adding an explicit check for property name
                    return target.self[prop];
                } else {
                    if (prop in target.siblings) {
                        return target.siblings[prop]
                    } else {
                        return target.self[prop]
                    }
                }
            },
            has : (target: { siblings: any; self: any }, prop: string | symbol)  => {
                prop = prop as string;
                var selfPropertyOrChild = target.self[prop]
                var sibling = target.siblings[prop];
                return typeof selfPropertyOrChild != 'undefined' || typeof sibling != 'undefined';
            }
        });
        return scope;
    }

    private executeEvent(context: any, node: any) {
        let updates;
        if (node) {
            updates = this.ruleEngine.execute(node, this.getExpressionScope(), context);
        }
        if (typeof updates !== 'undefined') {
            this.applyUpdates(updates);
        }
    }

    /**
     * Executes the given rule
     * @param event
     * @param context
     * @private
     */
    executeRule(event: Action, context: any) {
        if (typeof event.payload.ruleName === 'undefined') {
            this.executeAllRules(context);
        }
    }

    executeExpression(expr: string) {
        const ruleContext = {
            'form': this.form,
            '$form': this.form.getRuleNode(),
            '$field': this.getRuleNode(),
            'field': this
        };
        const node = this.ruleEngine.compileRule(expr)
        return this.ruleEngine.execute(node, this.getExpressionScope(), ruleContext);
    }

    /**
     * Executes the given action
     * @param action    {@link Action | event object}
     */
    executeAction(action: Action) {
        const context = {
            'form': this.form,
            '$form': this.form.getRuleNode(),
            '$field': this.getRuleNode(),
            'field': this,
            '$event': {
                type: action.type,
                payload: action.payload,
                target: this.getRuleNode()
            }
        };
        const eventName = action.isCustomEvent ? `custom:${action.type}` : action.type;
        const funcName = action.isCustomEvent  ? `custom_${action.type}` : action.type;
        const node = this.getCompiledEvent(eventName);
        //todo: apply all the updates at the end  or
        // not trigger the change event until the execution is finished
        node.forEach((n:any) => this.executeEvent(context, n));
        // @ts-ignore
        if (funcName in this && typeof this[funcName] === 'function') {
            //@ts-ignore
            this[funcName](action, context);
        }
        this.notifyDependents(action);
    }

    /**
     * @param prop
     * @param newValue
     * @private
     */
    _setProperty<T>(prop: string, newValue: T, notify = true) {
        //@ts-ignore
        const oldValue = this._jsonModel[prop];
        if (oldValue !== newValue) {
            //@ts-ignore
            this._jsonModel[prop] = newValue;
            const changeAction = propertyChange(prop, newValue, oldValue);
            if (notify) {
                this.notifyDependents(changeAction);
            }
            return changeAction.payload.changes;
        }
        return []
    }
}

export default Scriptable;