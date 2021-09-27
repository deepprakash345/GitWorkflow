import Container from './Container';
import {
    FieldJson,
    FieldModel,
    FieldsetJson,
    FieldsetModel,
    FormJson,
    FormModel, Items,
    MetaDataJson
} from './types';
import {Action, Change, copyAction} from './controller/Actions';
import {Json, makeFormula} from '@adobe/forms-next-expression-parser';
import AFNodeFactory from './rules/AFNodeFactory';
import {getOrElse, mergeDeep, splitTokens} from './utils/JsonUtils';
import {callbackFn, Controller} from './controller/Controller';
import FunctionRuntime from './rules/FunctionRuntime';
import FormMetaData from './FormMetaData';
import {createChild} from './Fieldset';
import RuleEngine from './rules/RuleEngine';
import {Node as RuleNode} from '@adobe/forms-next-expression-parser/dist/node/node';

class Form extends Container<FormJson> implements FormModel, Controller {

    private nodeFactory = new AFNodeFactory()

    private callbacks: {
        [key: string]: {
            [key: string]: callbackFn[]
        }
    } = {}

    private ruleEngine;

    constructor(n: FormJson) {
        super(n);
        this._jsonModel[':id'] = '$form';
        this._jsonModel[':data'] = {};
        this.ruleEngine = new RuleEngine(new FunctionRuntime(this).getFunctions(), this);
    }

    private dataRefRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g

    get metaData(): FormMetaData {
        let metaData = this.getP<MetaDataJson>('metadata', {});
        return new FormMetaData(metaData);
    }

    //todo: duplicate code alert (Fieldset#_createChild)
    protected _createChild(child: FieldsetJson | FieldJson): FieldModel | FieldsetModel {
        return createChild(child);
    }

    public getElement(id: string): FormModel | FieldModel | FieldsetModel {
        return super.getElement(id) as FormModel | FieldsetModel | FieldModel;
    }

    public dispatch(action: Action) {
        if (action.id.length > 0) {
            let elem = this.getElement(action.id);
            let eventName;
            console.log('new action ' + JSON.stringify(action, null, 2));
            let context = {
                '$form': this
            };
            if (elem !== undefined) {
                const x = elem.json();
                switch (action.type) {
                    case 'customEvent':
                        eventName = action.payload[':name'];
                        this._executeEvent(eventName, action.payload.payload);
                        this.trigger(x[':id'], elem.json(), eventName);
                        break;
                    default:
                        if (elem !== this) {
                            let updates = (elem as FieldModel | FieldsetModel).dispatch(action, this.ruleEngine, context);
                            if (':value' in updates && updates[':valid'] !== false) {
                                const field = elem as FieldModel;
                                this.updateDataDom(field);
                                this.trigger(field.id, field.json(), 'change');
                                this._dispatchActionToItems(context, new Change('', undefined));
                            }
                            if (action.type !== 'change' && elem.id !== undefined) {
                                this.trigger(elem.id, elem.json(), action.type);
                            }
                        }
                }
            } else if (action.id === '$all') {
                this._dispatchActionToItems(context, action);
            } else {
                throw new Error(`invalid action ${action.type}. ${action.id} doesn't exist`);
            }
        }
    }

    private updateDataDom(elem: FieldModel) {
        const dataRef: string = elem.dataRef || elem.name || '';
        let data = this._jsonModel[':data'];
        let tokens = splitTokens(dataRef);
        let token = tokens.next();
        while (!token.done) {
            let nextToken = tokens.next();
            if (!nextToken.done) {
                data[token.value] = data[token.value] || {};
                data = data[token.value];
            } else {
                data[token.value] = elem.value;
            }
            token = nextToken;
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

    private trigger(id: string, elem: any, eventName: string) {
        if (id in this.callbacks && eventName in this.callbacks[id]) {
            console.log(`subscription to be triggered : ${id}`);
            //todo:  add in queue
            this.callbacks[id][eventName].map(x => {
                x(id, elem, eventName);
            });
        }
    }

    subscribe(id: string, callback: callbackFn, eventName: string = 'change') {
        this.callbacks[id] = this.callbacks[id] || {};
        this.callbacks[id][eventName] = this.callbacks[id][eventName] || [];
        this.callbacks[id][eventName].push(callback);
        console.log(`subscription added : ${id}, count : ${this.callbacks[id].length}`);
        return {
            unsubscribe: () => {
                this.callbacks[id][eventName] = this.callbacks[id][eventName].filter(x => x !== callback);
                console.log(`subscription removed : ${id}, count : ${this.callbacks[id].length}`);
            }
        };
    }

    private _events: {
        [key: string]: RuleNode
    } = {};

    private getCompiledEvent(eName: string) {
        if (!(eName in this._events)) {
            let eString = this._jsonModel[':events']?.[eName];
            if (typeof eString === 'string' && eString.length > 0) {
                this._events[eName] = this.ruleEngine.compileRule(eString);
            }
        }
        return this._events[eName];
    }

    /**
     * Execute a single rule on given element with the given payload
     * @param eventName
     * @param payload
     * @private
     */
    private _executeEvent(eventName: string, payload?: any) {
        const event = this.getCompiledEvent(eventName);
        const context = {
            '$form': this,
            '$field': this,
            '$event': {
                'target': this,
                'type': eventName,
                'payload': payload
            }
        };
        if (event) {
            event.search(this as unknown as Json, context);
        }
    }

    _dispatchActionToItems(context: any, action: Action, items: Items<FieldModel | FieldsetModel> = this.items) {
        Object.entries(items).forEach(([key, x]: [string, any]) => {
            let updates = x.dispatch(copyAction(action, x.id), this.ruleEngine, context);
            if (updates) {
                if (':value' in updates) {
                    this.updateDataDom(x as FieldModel);
                    //todo: execute dependencies
                }
                if (Object.keys(updates).length > 0) {
                    this.trigger(x.id, x.json(), 'change');
                }
            }
            if ('items' in x) {
                this._dispatchActionToItems(context, action, x.items);
            }
        });
    }


    /**
     * prefill the form with data on the given element
     * @param data {object} data to prefill the form
     * @param [items] form element on which to apply the operation. The children of the element will also be included
     */
    setData(data: Object, items: any = this.items) {
        this._jsonModel[':data'] = {...data};
        Object.entries(items).forEach(([key, x]: [string, any]) => {
            if ('items' in x) {
                this.setData(data, x.items);
            } else if (x.dataRef || x.name) {
                // todo: handle the case for panels
                let value = this._getElement(data, x.dataRef || x.name, null);
                if (value) {
                    x.dispatch(new Change(x.id, value), this.ruleEngine, {'$form' : this});
                    this.trigger(x.id, x, 'change');
                }
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
