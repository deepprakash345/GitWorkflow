import {Action, RulesJson, ScriptableField} from './types';
import {BaseNode} from './BaseNode';
import {propertyChange} from './controller/Controller';

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
                this._events[eName] = this.ruleEngine.compileRule(eString);
            }
        }
        return this._events[eName];
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
                const newVal = this.ruleEngine.execute(node, scope, context);
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
            siblings: this.parent?.directReferences() || {}
        };
        const scope = new Proxy(target, {
            get: (target: any, prop: string | Symbol, receiver) => {
                if (prop === Symbol.toStringTag) {
                    return 'Object';
                }
                prop = prop as string;
                var selfProperty = target.self[prop];
                if (prop.startsWith('$')) {
                    //This will not be required once rule grammar supports $
                    return selfProperty;
                } else if (typeof selfProperty !== 'undefined') { //found a child
                    return selfProperty;
                } else if (prop in target.siblings) { // found a sibling
                    return target.siblings[prop];
                }
                return selfProperty;
            },
            has : (target: { siblings: any; self: any }, prop: string | symbol)  => {
                prop = prop as string;
                var selfProperty = target.self[prop];
                var sibling = target.siblings[prop];
                return typeof selfProperty != 'undefined' || typeof sibling != 'undefined';
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

    executeRule(event: Action, context: any) {
        if (typeof event.payload.ruleName === 'undefined') {
            this.executeAllRules(context);
        }
    }

    executeAction(action: Action) {
        const context = {
            'form': this.form,
            '$form': this.form.getRuleNode(),
            '$field': this.getRuleNode(),
            'field': this,
            '$event': {
                type: action.type,
                payload: action.payload,
                target: this
            }
        };
        const eventName = action.isCustomEvent ? `custom:${action.type}` : action.type;
        const funcName = action.isCustomEvent  ? `custom_${action.type}` : action.type;
        const node = this.getCompiledEvent(eventName);
        this.executeEvent(context, node);
        // @ts-ignore
        if (funcName in this && typeof this[funcName] === 'function') {
            //@ts-ignore
            this[funcName](action, context);
        }
        this.notifyDependents(action);
    }

    _setProperty<T>(prop: string, newValue: T) {
        //@ts-ignore
        const oldValue = this._jsonModel[prop];
        if (oldValue !== newValue) {
            const changeAction = propertyChange(prop, newValue, oldValue);
            //@ts-ignore
            this._jsonModel[prop] = newValue;
            this.notifyDependents(changeAction);
        }
    }
}

export default Scriptable;