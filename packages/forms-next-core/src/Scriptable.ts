import {RulesJson, ScriptableField} from './types';
import Node from './Node';
import RuleEngine from './rules/RuleEngine';
import {Node as RuleNode} from '@adobe/forms-next-expression-parser/dist/node/node';
import {Json} from '@adobe/forms-next-expression-parser';
import {Action, Change, Submit} from './controller/Controller';
import {mergeDeep} from './utils/JsonUtils';
import {invalidateTranslation} from './utils/TranslationUtils';

class Scriptable<T extends RulesJson> extends Node<T> implements ScriptableField {

    private _events : {
        [key:string] : RuleNode
    } = {};

    private _rules : {
        [key:string] : RuleNode
    } = {};

    constructor(n: T, protected _ruleEngine:RuleEngine) {
        super(n);
    }

    get rules() {
        return this._jsonModel.rules || {};
    }

    private getCompiledRule(eName: string, rule: string) {
        if (!(eName in this._rules)) {
            let eString = rule || this.rules[eName];
            if (typeof eString === 'string' && eString.length > 0) {
                this._rules[eName] = this.ruleEngine().compileRule(eString);
            } else {
                throw new Error(`only expression strings are supported. ${typeof(eString)} types are not supported`);
            }
        }
        return this._rules[eName];
    }

    private getCompiledEvent(eName: string) {
        if (!(eName in this._events)) {
            let eString = this._jsonModel.events?.[eName];
            if (typeof eString === 'string' && eString.length > 0) {
                this._events[eName] = this.ruleEngine().compileRule(eString);
            }
        }
        return this._events[eName];
    }

    private ruleEngine() {
        return this._ruleEngine;
    }

    protected executeAllRules(context: any) {
        return Object.fromEntries(Object.entries(this.rules).map(([prop, rule]) => {
            const node = this.getCompiledRule(prop, rule);
            const newVal = this.ruleEngine().execute(node, context);
            if (newVal != this.getP(prop, undefined)) {
                return [prop, newVal];
            } else  {
                return [];
            }
        }).filter(x => x.length == 2));
    }

    protected executeEvent(context: any, eventName: string) {
        const node = this.getCompiledEvent(eventName);
        let updates;
        if (node) {
            updates = this.ruleEngine().execute(node, context);
        }
        return updates;
    }

    protected handleValueChange(payload: string) {
        return {};
    }

    executeAction(action: Action, context: any, notifyDependents: (e: Action) => void) {
        //console.log('new action ' + action);
        let updates : any;
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
                if (Object.keys(updates).length === 0 || updates.valid === false) {
                    updates = {
                        ...updates,
                        ...this.executeAllRules(context)
                    };
                }
            }
            updates = {
                ...updates,
                ...this.executeEvent(context, evntName) as object
            };
            if (evntName !== 'change') {
                notifyDependents(action);
            }
        }
        if (updates && Object.keys(updates).length > 0) {
            // in case of updates, invalidate translation object to remove stale value
            invalidateTranslation(this._jsonModel, updates);
            // merge deep since rules like
            // todo: fix order
            if ('value' in updates && (evntName !== 'change' || action.isCustomEvent)) {
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