import Container from './Container';
import {FormJson, FormModel, MetaDataJson} from './Types';
import {Action} from './controller/Actions';
import {makeFormula} from '@adobe/forms-next-expression-parser';
import AFNodeFactory from './rules/AFNodeFactory';
import {getOrElse, mergeDeep} from './utils/JsonUtils';
import {callbackFn, Controller} from './controller/Controller';
import FunctionRuntime from './rules/FunctionRuntime';
import FormMetaData from './FormMetaData';


class Form extends Container<FormJson> implements FormModel, Controller {

    private nodeFactory = new AFNodeFactory()
    private functions = new FunctionRuntime(this).getFunctions();

    private callbacks: {
        [key: string]: callbackFn[]
    } = {}

    private dataRefRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g

    get metaData(): FormMetaData {
        let metaData = this.getP<MetaDataJson>('metadata', {});
        return new FormMetaData(metaData);
    }

    public getElement(id: string) {
        if (id === '$form') {
            return this._jsonModel;
        }
        //todo: or use dataRefRegex here as well
        let formula = makeFormula({}, this.nodeFactory);
        let node = formula.compile(id);
        return node.search(this._jsonModel[':items']);
    }

    public dispatch(action: Action) {
        if (action.id.length > 0) {
            let elem = this.getElement(action.id) as any;
            let eventName;
            console.log('new action ' + JSON.stringify(action, null, 2));
            if (elem == null && action.id !== '$all') {
                throw `invalid action ${action.type}. ${action.id} doesn't exist`;
            }
            switch (action.type) {
                case 'change':
                    this.handleChange(elem, action.payload);
                    break;
                case 'click':
                    this.handleClick(elem);
                    break;
                case 'customEvent':
                    eventName = action.payload[':name'];
                    if (action.id == '$all') {
                        this._executeEvents(eventName, action.payload.payload);
                    } else {
                        this._executeRule(elem, elem[':events']?.[eventName]);
                    }
            }
        }
    }

    private evaluateConstraints(elem: any) {
        return true;
    }

    private updateDataDom(elem: any) {
        const dataRef: string = elem[':dataRef'] || elem[':name'] || '';
        let data = this._jsonModel[':data'] || {};
        this._jsonModel[':data'] = data;
        if (dataRef.length > 0) {
            let m = this.dataRefRegex.exec(dataRef);
            if (m == null) {
                throw new Error(`Exception while parsing dataRef ${dataRef}. Element : ${elem[':id']}`);
            }
            do {
                let nextM = this.dataRefRegex.exec(dataRef);
                if (m.length < 2) {
                    throw new Error(`Exception while parsing dataRef ${dataRef}. Element : ${elem[':id']}`);
                } else {
                    if (nextM != null) {
                        let tmp = data[m[1]] || {};
                        data[m[1]] = tmp;
                        data = tmp;
                    } else {
                        data[m[1]] = elem[':value'];
                    }
                }
                m = nextM;
            } while (m != null);
        }
    }

    private handleChange(elem: any, value: string) {
        elem[':value'] = value;
        let valid = this.evaluateConstraints(elem);
        //todo : make it conditional based on valid flag
        this.updateDataDom(elem);
        elem[':valid'] = valid;
        this.executeAllRules();
        this.trigger(elem[':id'], elem);
    }

    private handleClick(elem: any) {
        let rule = elem[':events']?.[':click'];
        if (typeof rule === 'string' && rule.length > 0) {
            this._executeRule(elem, rule);
        }
    }

    /*
     * This API gets the element w.r.t to the node.
     * Eg - path is a/b/c, then it converts the path to a.b.c and then searches for c.
    */
    private _getElement(node: Object, path: string, options: any) {
        options = options || {};
        let {index} = options;
        let convertedPath = path;
        if (index) {
            convertedPath = convertedPath + '.' + index;
        }
        return getOrElse(node, convertedPath);
    }

    private trigger(id: string, elem: any) {
        if (id in this.callbacks) {
            console.log(`subscription to be triggered : ${id}`);
            //todo:  add in queue
            this.callbacks[id].map(x => {
                x(id, elem);
            });
        }
    }

    subscribe(id: string, callback: callbackFn) {
        this.callbacks[id] = this.callbacks[id] || [];
        this.callbacks[id].push(callback);
        console.log(`subscription added : ${id}, count : ${this.callbacks[id].length}`);
        return {
            unsubscribe: () => {
                this.callbacks[id] = this.callbacks[id].filter(x => x !== callback);
                console.log(`subscription removed : ${id}, count : ${this.callbacks[id].length}`);
            }
        };
    }

    /**
     * Execute a single rule on given element with the given payload
     * @param element
     * @param rule
     * @param payload
     * @private
     */
    private _executeRule(element: any, rule: any, payload?: any) {
        if (typeof rule === 'string') {
            let formula = makeFormula(this.functions, new AFNodeFactory(this._jsonModel, element));
            let node = formula.compile(rule as string);
            let context = {
                '$form' : this._jsonModel,
                '$field' : element,
                '$event' : {
                    'target' : element,
                    'type' : rule,
                    'payload' : payload
                }
            };
            return node.search(element, context);
        } else {
            throw new Error(`only expression strings are supported. ${typeof (rule)} types are not supported`);
        }
    }

    _executeEvents(eventName: any, payload?: any) {
        const checkAndExecute = (item: any) => {
            let item2 = item;
            const evnt = item?.[':events']?.[eventName];
            if (evnt) {
                let updates = this._executeRule(item, evnt, payload);
                item2 = mergeDeep(item, updates);
            }
            if (':items' in item2) {
                let entries= Object.entries(item2[':items'])
                    .map(([key, child]) => {
                        return [key, checkAndExecute(child)];
                    });
                item2[':items'] = Object.fromEntries(entries);
            }
            return item2;
        };
        this._jsonModel = checkAndExecute(this._jsonModel);
    }

    /**
     * Execute the given rules on the given element
     * @param element
     * @param rules
     * @private
     */
    private _executeRulesForElement(element: any, rules: any) {
        return Object.fromEntries(Object.entries(rules).map(([prop, rule]) => {
            return [prop, this._executeRule(element, rule)];
        }));
    }

    /**
     * prefill the form with data on the given element
     * @param data {object} data to prefill the form
     * @param [items] form element on which to apply the operation. The children of the element will also be included
     */
    setData(data: Object, items: any = this._jsonModel[':items']) {
        this._jsonModel[':data'] = Object.assign({}, data);
        Object.entries(items).forEach(([key, x]: [string, any]) => {
            if (':items' in x) {
                this.setData(data, x[':items']);
            } else if (':dataRef' in x || ':name' in x) {
                // todo: handle the case for panels
                let value = this._getElement(data, x[':dataRef'] || x[':name'], null);
                if (value) {
                    x[':value'] = value;
                    this.trigger(x[':id'], x);
                }
            }
        });
    }

    /**
     * Executes all rules on the items
     * @param items elements on which to execute all the rules. default is the entire form
     */
    executeAllRules(items: any = this._jsonModel[':items']) {
        Object.entries(items).forEach(([key, x]: [string, any]) => {
            if (':rules' in x) {
                let updates = this._executeRulesForElement(x, x[':rules']);
                //todo: handle the case where updates are same as the original object
                items[key] = mergeDeep(x, updates);
                if (':value' in updates) {
                    this.updateDataDom(items[key]);
                }
                this.trigger(x[':id'], items[key]);
            }
            if (':items' in x) {
                this.executeAllRules(x[':items']);
            }
        });
    }

    /**
     * returns the current state of the form
     */
    getState() {
        return this.json();
    }
}

export default Form;
