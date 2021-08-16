import Container from './Container';
import {FormModel} from './Types';
import {Action} from './controller/Actions';
import {makeFormula} from '@adobe/forms-next-expression-parser';
import AFNodeFactory from './rules/AFNodeFactory';
import {mergeDeep} from './utils/JsonUtils';
import {callbackFn, Controller} from './controller/Controller';


class Form extends Container implements FormModel, Controller {

    nodeFactory = new AFNodeFactory()

    callbacks: {
        [key: string] : callbackFn[]
    } = {}

    public getElement(id: string) {
        //todo: do this only if id contains " as . can be used the name (`address."street.name"`)
        let r = makeFormula(id, undefined, this.nodeFactory);
        r.compile();
        return r.search(this._jsonModel[':items']);
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

    _executeRulesForElement(element:any, rules: any) {
        return Object.fromEntries(Object.entries(rules).map(([prop, rule]) => {
            if (typeof rule === 'string') {
                let r = makeFormula(rule as string, undefined, new AFNodeFactory(this._jsonModel[':items'], element));
                r.compile();
                return [prop, r.search(element)];
            } else {
                throw `only expression strings are supported. ${typeof(rule)} types are not supported`;
            }
        }));
    }

    executeAllRules(items: any = this._jsonModel[':items']) {
        Object.entries(items).forEach( ([key, x]: [string, any]) => {
            if (':items' in x) {
                this.executeAllRules(x[':items']);
            } else if (':rules' in x) {
                //todo : handle the case for panels.
                items[key] = mergeDeep(x, this._executeRulesForElement(x, x[':rules']));
                this.trigger(x[':id'], items[key]);
            }
        });
    }
}
export default Form;
