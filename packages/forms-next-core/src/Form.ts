import Container from './Container';
import {FormMetaDataModel, FormModel, MetaDataJson} from './Types';
import {Action} from './controller/Actions';
import {makeFormula} from '@adobe/forms-next-expression-parser';
import AFNodeFactory from './rules/AFNodeFactory';
import {getOrElse, mergeDeep} from './utils/JsonUtils';
import {callbackFn, Controller} from './controller/Controller';
import FunctionRuntime from './rules/FunctionRuntime';
import FormMetaData from "./FormMetaData";


class Form extends Container implements FormModel, Controller {

    private nodeFactory = new AFNodeFactory()
    private functions = new FunctionRuntime(this).getFunctions();

    private callbacks: {
        [key: string] : callbackFn[]
    } = {}

    private dataRefRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g

    get metaData () : FormMetaData | undefined {
        // @ts-ignore
        let metaData = this.getP<MetaDataJson>('metadata', undefined);
        return metaData ? new FormMetaData(metaData) : undefined;
    }

    public getElement(id: string) {
        //todo: or use dataRefRegex here as well
        let formula = makeFormula({}, this.nodeFactory);
        let node = formula.compile(id);
        return node.search(this._jsonModel[':items']);
    }

    public dispatch(action: Action) {
        let elem = this.getElement(action.id);
        console.log('new action ' + JSON.stringify(action, null, 2));
        if (elem == null) {
            throw `invalid action ${action.type}. ${action.id} doesn't exist`;
        }
        switch (action.type) {
            case 'change':
                this.handleChange(elem, action.payload);
                break;
            case 'click':
                this.handleClick(elem);
        }
    }

    private evaluateConstraints(elem: any) {
        return true;
    }

    private updateDataDom(elem: any) {
        const dataRef: string = elem[':dataRef'] || elem[':name'] || '';
        let data = this._jsonModel.data || {};
        this._jsonModel.data = data;
        if (dataRef.length > 0) {
            let m = this.dataRefRegex.exec(dataRef);
            if (m == null) {
                throw `Exception while parsing dataRef ${dataRef}. Element : ${elem[':id']}`;
            }
            do {
                let nextM = this.dataRefRegex.exec(dataRef);
                if (m.length < 2) {
                    throw `Exception while parsing dataRef ${dataRef}. Element : ${elem[':id']}`;
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
        this._executeRule(elem, rule);
    }

    /*
     * This API gets the element w.r.t to the node.
     * Eg - path is a/b/c, then it converts the path to a.b.c and then searches for c.
    */
    private _getElement(node: Object, path: string, options: any) {
        options = options || {};
        let {index} = options;
        let convertedPath = path.split('/').join('.');
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
            unsubscribe : () => {
                this.callbacks[id] = this.callbacks[id].filter(x => x !== callback);
                console.log(`subscription removed : ${id}, count : ${this.callbacks[id].length}`);
            }
        };
    }

    _executeRule(element: any, rule: any) {
        if (typeof rule === 'string') {
            let formula = makeFormula(this.functions, new AFNodeFactory(this._jsonModel[':items'], element));
            let node = formula.compile(rule as string);
            return node.search(element);
        } else {
            throw `only expression strings are supported. ${typeof(rule)} types are not supported`;
        }
    }

    _executeRulesForElement(element:any, rules: any) {
        return Object.fromEntries(Object.entries(rules).map(([prop, rule]) => {
            return [prop, this._executeRule(element, rule)];
        }));
    }

    setData(data: Object, items: any = this._jsonModel[':items']) {
        Object.entries(items).forEach( ([key, x]: [string, any]) => {
            if (':items' in x) {
                this.setData(x[':items']);
            } else if (':dataRef' in x || ':name' in x) {
                // todo: handle the case for panels
                let value = this._getElement(data, x[':dataRef'] || x[':name'], null);
                if (value) {
                    x[':value'] = value;
                    this.trigger(x[':id'], items[key]);
                }
            }
        });
    }

    executeAllRules(items: any = this._jsonModel[':items']) {
        Object.entries(items).forEach( ([key, x]: [string, any]) => {
            if (':items' in x) {
                this.executeAllRules(x[':items']);
            } else if (':rules' in x) {
                //todo : handle the case for panels.
                let updates = this._executeRulesForElement(x, x[':rules']);
                items[key] = mergeDeep(x, updates);
                if (':value' in updates) {
                    this.updateDataDom(items[key]);
                }
                this.trigger(x[':id'], items[key]);
            }
        });
    }

    getState() {
        return this.json();
    }
}
export default Form;
