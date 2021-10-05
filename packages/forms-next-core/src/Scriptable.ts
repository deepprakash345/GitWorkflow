import {RulesJson, ScriptableField} from './types';
import Node from './Node';
import RuleEngine from './rules/RuleEngine';
import {Node as RuleNode} from '@adobe/forms-next-expression-parser/dist/node/node';
import {Json} from '@adobe/forms-next-expression-parser';
import {Action, Change, Submit} from './controller/Controller';
import {mergeDeep} from "./utils/JsonUtils";

class Scriptable<T extends RulesJson> extends Node<T> implements ScriptableField {

    private _events : {
        [key:string] : RuleNode
    } = {};

    private _rules : {
        [key:string] : RuleNode
    } = {};

    get rules() {
        return this._jsonModel[':rules'] || {};
    }

    private getCompiledRule(eName: string, rule: string) {
        if (!(eName in this._rules)) {
            let eString = rule || this.rules[eName];
            if (typeof eString === 'string' && eString.length > 0) {
                this._rules[eName] = RuleEngine.compileRule(eString);
            } else {
                throw new Error(`only expression strings are supported. ${typeof(eString)} types are not supported`);
            }
        }
        return this._rules[eName];
    }

    private getCompiledEvent(eName: string) {
        if (!(eName in this._events)) {
            let eString = this._jsonModel[':events']?.[eName];
            if (typeof eString === 'string' && eString.length > 0) {
                this._events[eName] = RuleEngine.compileRule(eString);
            }
        }
        return this._events[eName];
    }

    protected executeAllRules(context: any) {
        return Object.fromEntries(Object.entries(this.rules).map(([prop, rule]) => {
            const node = this.getCompiledRule(prop, rule);
            const newVal = node.search(this as unknown as Json, context);
            if (newVal != this.getP(prop, undefined)) {
                return [prop, newVal];
            } else  {
                return [];
            }
        }).filter(x => x.length == 2));
    }

    protected executeEvent(context: any, eventName: string) {
        const event = this.getCompiledEvent(eventName);
        let updates;
        if (event) {
            updates = event.search(this as unknown as Json, context);
        }
        return updates;
    }

    protected handleValueChange(payload: string) {
        return {};
    }

    dispatch(action: Action, context: any, trigger: (e: Action) => void) {
        console.log('new action ' + action);
        let updates : any;
        const evntName = action.type;
        if (action.isCustomEvent) {
            updates = {
                ...updates,
                ...this.executeEvent(context, evntName) as object
            };
            // for submit, we create payload and send it to the caller
            if (evntName === 'submit') {
                trigger(new Submit(context.$form?.controller()?.getState()[':data']));
            } else {
                trigger(action);
            }
        } else {
            if (evntName === 'change') {
                updates = this.handleValueChange(action.payload);
                if (Object.keys(updates).length === 0 || updates[':valid'] === false) {
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
                trigger(action);
            }
        }
        if (updates && Object.keys(updates).length > 0) {
            // merge deep since rules like
            // todo: fix order
            this._jsonModel = mergeDeep(this._jsonModel, updates);
            trigger(new Change(action.payload));
        }
    }

}

export default Scriptable;