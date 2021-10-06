import Container from './Container';
import {
    FieldJson,
    FieldModel,
    FieldsetJson,
    FieldsetModel,
    FormJson,
    FormModel,
    MetaDataJson
} from './types';
import {getOrElse, splitTokens} from './utils/JsonUtils';
import FormMetaData from './FormMetaData';
import {createChild} from './Fieldset';
import {Action, Change, Controller, createController} from './controller/Controller';

class Form extends Container<FormJson> implements FormModel {

    _controller : Controller

    constructor(n: FormJson) {
        super(n);
        this._jsonModel.id = '$form';
        this._jsonModel.data = {};
        this._controller = createController(this)();
    }

    private dataRefRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g

    get metaData(): FormMetaData {
        let metaData = this.getP<MetaDataJson>('metadata', {});
        return new FormMetaData(metaData);
    }

    protected _createChild(child: FieldsetJson | FieldJson): FieldModel | FieldsetModel {
        return createChild(child, (elem) => {
            let controller = createController(this)(elem);
            controller.subscribe((e: Action) => {
                let elem = e.target.getState();
                if (!('valid' in elem) || elem.valid !== false) {
                    this.updateDataDom(elem as FieldJson);
                    //todo: trigger only dependencies
                    this.controller().dispatch(new Change(undefined, true));
                }
            });
            return controller;
        });
    }

    private updateDataDom(elem: FieldJson) {
        const dataRef: string = elem.dataRef || elem.name || '';
        let data = this._jsonModel.data;
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

    /**
     * prefill the form with data on the given element
     * @param data {object} data to prefill the form
     * @param [items] form element on which to apply the operation. The children of the element will also be included
     */
    setData(data: Object, items = this.items) {
        this._jsonModel.data = {...data};
        Object.values(items).forEach(x => {
            if ('items' in x) {
                this.setData(data, x.items);
            } else if (x.dataRef || x.name) {
                // todo: handle the case for panels
                let value = this._getElement(data, x.dataRef || x.name || '', null);
                if (value) {
                    x.controller()?.dispatch(new Change(value));
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

    controller() {
        return this._controller;
    }
}

export default Form;
