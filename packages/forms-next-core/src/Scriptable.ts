import {FieldsetModel, RulesJson, ScriptableField} from './types';
import Node from './Node';
import RuleEngine from './rules/RuleEngine';
import {Node as RuleNode} from '@aemforms/forms-next-expression-parser/dist/node/node';
import {Action, Change} from './controller/Controller';
import {mergeDeep} from './utils/JsonUtils';
import {invalidateTranslation} from './utils/TranslationUtils';
import {BaseNode} from './BaseNode';

abstract class Scriptable<T extends RulesJson> extends BaseNode<T> implements ScriptableField {

    private _events: {
        [key: string]: RuleNode
    } = {};

    private _rules: {
        [key: string]: RuleNode
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

    protected executeAllRules(context: any) {
        const scope = this.getExpressionScope();
        return Object.fromEntries(Object.entries(this.rules).map(([prop, rule]) => {
            const node = this.getCompiledRule(prop, rule);
            const newVal = this.ruleEngine.execute(node, scope, context);
            if (newVal != this.getP(prop, undefined)) {
                return [prop, newVal];
            } else {
                return [];
            }
        }).filter(x => x.length == 2));
    }

    private getSiblings() {
        if (typeof this.parent === 'undefined') { //when this is form
            return undefined;
        }
        if (this.parent.type === 'array') {
            let parent = this.parent as FieldsetModel;
            let name = parent.name || '';
            while (name.length == 0) {
                parent = parent.parent as FieldsetModel;
                name = parent.name || '';
            }
            return {
                name: parent.getRuleNode()
            };
        } else if (this.parent.type === 'object') {
            let obj:any = {};
            let parent = this.parent as FieldsetModel;
            let name = parent.name || '';
            let parents = [parent];
            while (name.length == 0) {
                parent = parent.parent as FieldsetModel;
                name = parent.name || '';
                if (parent.type !== 'array') {
                    parents.push(parent);
                }
            }
            obj[name] = parent.getRuleNode();
            while (parents.length > 0) {
                parent = parents.pop() as FieldsetModel;
                parent.items
                    .filter(p => (p.name || '').length > 0)
                    .forEach( x => {
                        //@ts-ignore
                        obj[x.name] = x.getRuleNode();
                    });
            }
            return obj;
        }
    }

    private getExpressionScope() {
        const target = {
            self: this.getRuleNode(),
            siblings: this.parent?.directReferences() || {}
        };
        const scope = new Proxy(target, {
            get: (target: any, prop: string | Symbol, receiver) => {
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

    protected executeEvent(context: any, eventName: string) {
        const node = this.getCompiledEvent(eventName);
        let updates;
        if (node) {
            updates = this.ruleEngine.execute(node, this.getExpressionScope(), context);
        }
        return updates;
    }

    protected handleValueChange(payload: string) {
        return {};
    }

    executeAction(action: Action, context: any, notifyDependents: (e: Action) => void) {
        //console.log('new action ' + action);
        let updates: any;
        const evntName = action.type;
        if (action.isCustomEvent) {
            updates = {
                ...updates,
                ...this.executeEvent(context, `custom:${evntName}`) as object
            };
            notifyDependents(action);
        } else {
            if (evntName === 'change') {
                updates = this.handleValueChange(action.payload);
                updates = {
                    ...updates,
                    ...this.executeAllRules(context)
                };
                this._jsonModel = mergeDeep(this._jsonModel, updates);
            }
            updates = {
                ...this.executeEvent(context, evntName) as object
            };
            if (evntName !== 'change') {
                notifyDependents(action);
            }
        }
        if ((updates && Object.keys(updates).length > 0) || evntName === 'change') {
            // in case of updates, invalidate translation object to remove stale value
            invalidateTranslation(this._jsonModel, updates);
            // merge deep since rules like
            // todo: fix order
            if ('value' in updates) {
                const res = this.handleValueChange(updates.value);
                updates = {
                    ...updates,
                    ...res
                };
            }
            this._jsonModel = mergeDeep(this._jsonModel, updates);
            notifyDependents(new Change(action.payload));
        }
    }

}

export default Scriptable;