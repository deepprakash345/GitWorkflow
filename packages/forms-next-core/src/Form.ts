import Container from './Container';
import {FormModel} from './Types';
import {Action} from './controller/Actions';
import {makeFormula} from '@adobe/forms-next-expression-parser';
import runtime from './AFRuntime';
import AFNodeFactory from './rules/AFNodeFactory';
import {mergeDeep} from './utils/JsonUtils';

type callbackFn = (id:string, obj: any) => void

class Form extends Container implements FormModel {

    nodeFactory = new AFNodeFactory()

    callbacks: {
        [key: string] : callbackFn[]
    } = {}

    public getElement(id: string) {
        //todo: do this only if id contains " as . can be used the name (`address."street.name"`)
        let r = makeFormula(id, runtime, this.nodeFactory);
        let node = r.compile();
        return node.search(this._jsonModel[':items']);
    }

    public dispatch(action: Action) {
        let elem = this.getElement(action.id);
        switch (action.type) {
            case 'change':
                this.handleChange(elem, action.payload);
        }
    }

    private evaluateConstraints(elem: any) {
        return true;
    }

    private handleChange(elem: any, value: string) {
        elem[':value'] = value;
        let valid = this.evaluateConstraints(elem);
        elem[':valid'] = valid;
        this.executeAllRules();
        this.trigger(elem[':id'], elem);
    }

    trigger(id: string, elem: any) {
        if (id in this.callbacks) {
            this.callbacks[id].map(x => {
                x(id, elem);
            });
        }
    }

    subscribe(id: string, callback: callbackFn) {
        this.callbacks[id] = this.callbacks[id] || [];
        this.callbacks[id].push(callback);
    }

    _executeRulesForElement(element:any, rules: any) {
        return Object.fromEntries(Object.entries(rules).map(([prop, rule]) => {
            if (typeof rule === 'object') {
                throw [];
            } else if (typeof rule === 'string') {
                let r = makeFormula(rule as string, runtime, new AFNodeFactory(this._jsonModel[':items'], element));
                let node = r.compile();
                return [prop, node.search(element)];
            } else {
                return [prop];
            }
        }).filter(x => x.length == 2));
    }

    executeAllRules(items: any = this._jsonModel[':items']) {
        Object.entries(items).forEach( ([key, x]: [string, any]) => {
            if (':items' in x) {
                this.executeAllRules(x[':items']);
            } else if (':rules' in x) {
                items[key] = mergeDeep(x, this._executeRulesForElement(x, x[':rules']));
                this.trigger(x[':id'], items[key]);
            }
        });
    }
}
export default Form;
