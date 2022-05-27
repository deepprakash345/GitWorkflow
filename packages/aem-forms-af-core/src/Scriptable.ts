/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

import {Action, RulesJson, ScriptableField} from './types';
import {BaseNode} from './BaseNode';

/**
 * Defines scriptable aspects (ie rules, events) of form runtime model. Any form runtime object which requires
 * execution of rules/events should extend from this class.
 */

const dynamicProps = ['label',
    'enum',
    'enumNames',
    'enforceEnum',
    'exclusiveMinimum',
    'exclusiveMaximum',
    'maxLength',
    'maximum',
    'maxItems',
    'minLength',
    'minimum',
    'minItems',
    'required',
    'step',
    'description',
    'properties',
    'readOnly',
    'value',
    'visible',
    'enabled',
    'placeholder'];

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
            const eString = rule || this.rules[eName];
            if (typeof eString === 'string' && eString.length > 0) {
                try {
                    this._rules[eName] = this.ruleEngine.compileRule(eString);
                } catch (e) {
                    this.form.logger.error(`Unable to compile rule \`"${eName}" : "${eString}"\` Exception : ${e}`);
                }
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
                this._events[eName] = (eString as string[]).map(x => {
                    try {
                        return this.ruleEngine.compileRule(x);
                    } catch (e) {
                        this.form.logger.error(`Unable to compile expression \`"${eName}" : "${eString}"\` Exception : ${e}`);
                    }
                    return null;
                }).filter(x => x !== null);
            }
        }
        return this._events[eName] || [];
    }

    private applyUpdates(updates: any ) {
        Object.entries(updates).forEach(([key, value]) => {
            // @ts-ignore
            // the first check is to disable accessing this.value & this.items property
            // otherwise that will trigger dependency tracking
            if (key in dynamicProps || (key in this && typeof this[key] !== 'function')) {
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
                let newVal;
                if (node) {
                    newVal = this.ruleEngine.execute(node, scope, context, true);
                    if (dynamicProps.indexOf(prop) > -1) {
                        //@ts-ignore
                        this[prop] = newVal;
                    }
                }
                return [];
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
            get: (target: any, prop: string | symbol) => {
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
                        return target.siblings[prop];
                    } else {
                        return target.self[prop];
                    }
                }
            },
            has : (target: { siblings: any; self: any }, prop: string | symbol)  => {
                prop = prop as string;
                const selfPropertyOrChild = target.self[prop];
                const sibling = target.siblings[prop];
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
        const node = this.ruleEngine.compileRule(expr);
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
}

export default Scriptable;