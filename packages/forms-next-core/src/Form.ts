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
import {resolve, splitTokens} from './utils/JsonUtils';
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
                this.updateDataDom(elem as FieldJson);
                if (!('valid' in elem) || elem.valid !== false) {
                    //todo: trigger only dependencies
                    this.controller().dispatch(new Change(undefined, true));
                }
            });
            return controller;
        });
    }

    private getBinding(elem: FieldJson) {
        return elem.dataRef === undefined ? (elem.name || '') : elem.dataRef;
    }

    private updateDataDom(elem: FieldJson) {
        const dataRef = this.getBinding(elem);
        if (dataRef != 'none') {
            let data = this._jsonModel.data;
            let tokens = splitTokens(dataRef);
            let token = tokens.next();
            while (!token.done) {
                let nextToken = tokens.next();
                if (!nextToken.done) {
                    data[token.value] = data[token.value] || {};
                    data = data[token.value];
                } else {
                    if (elem.valid !== false) {
                        data[token.value] = elem.value;
                    } else {
                        data[token.value] = undefined;
                    }
                }
                token = nextToken;
            }
        }
    }

    mergeDataModel(dataModel : any, parentDataModel?: any) {
        this._jsonModel.data = {...dataModel};
        Object.values(this.items).forEach(x => {
            if ('items' in x) {
                x.mergeDataModel(dataModel, dataModel);
            } else  {
                let data:any;
                if (x.dataRef != 'none' && x.dataRef !== undefined) {
                    data = resolve(dataModel, x.dataRef);
                } else if ((x.name || '')?.length > 0) {
                    data = resolve(dataModel, x.name || '');
                }
                if (data !== undefined) {
                    x.controller()?.dispatch(new Change(data));
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
