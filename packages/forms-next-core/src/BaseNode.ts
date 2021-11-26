import {BaseJson, ContainerModel, FieldsetModel, FormModel} from './types';
import Node from './Node';

export abstract class BaseNode<T extends BaseJson> extends Node<T> {
    private _id: string
    //@ts-ignore
    private _ruleNode: any
    public constructor(params: T,
                       //@ts_ignore
                       private _options: {form: FormModel, parent: ContainerModel}) {
        super(params);
        this._id = this.form.getUniqueId();
    }

    protected setupRuleNode() {
        this._ruleNode = new Proxy(this.directReferences(), this._proxyHandler());
    }

    protected directReferences() {
        return this;
    }

    getRuleNode() {
        return this._ruleNode;
    }

    private get(target: any, prop: string | Symbol) {
        if (prop === Symbol.toPrimitive) {
            return this.valueOf;
        } else if (typeof(prop) === 'string') {
            //look for property
            if (prop.startsWith('$')) {
                prop = prop.substr(1);
                //@ts-ignore
                // return only non functional properties in this object
                if (typeof this[prop] !== 'function') {
                    //@ts-ignore
                    return this[prop];
                }
            }
            //look in the items
            if (typeof target[prop] !== 'undefined') {
                return target[prop];
            }
            //since currently rule grammar doesn't support '$' for properties. This needs to be removed
            //@ts-ignore
            if (typeof this[prop] !== 'function') {
                //@ts-ignore
                return this[prop];
            }
        }
    }

    private _proxyHandler = () => {
        return {
            get: (target: any, prop: string, receiver: any) => {
                const value = this.get(target, prop);
                return value;
            }
        };
    }

    get id() {
        return this._id;
    }

    get index() {
        return this._jsonModel.index || 0;
    }

    set index(n: number) {
        this._jsonModel.index = n;
    }

    get parent() {
        return this._options.parent;
    }

    get type() {
        return this._jsonModel.type;
    }

    get viewType() {
        return this._jsonModel.viewType;
    }

    get name() {
        return this._jsonModel.name;
    }

    get dataRef() {
        return this._jsonModel.dataRef;
    }

    get visible() {
        return this._jsonModel.visible;
    }

    get form() {
        return this._options.form;
    }

    get ruleEngine() {
        return this.form.ruleEngine;
    }

    get label() {
        return this._jsonModel.label;
    }

    json() {
        return {
            id: this.id,
            ...this._jsonModel
        };
    }
}