import {BaseJson, ContainerModel, FormModel} from './types';
import Node from './Node';

export class BaseNode<T extends BaseJson> extends Node<T> {
    private _id: string
    public constructor(params: T,
                       //@ts_ignore
                       private _options: {form: FormModel, parent: ContainerModel}) {
        super(params);
        this._id = this.form.getUniqueId();
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

    json() {
        return {
            id: this.id,
            ...this._jsonModel
        };
    }
}