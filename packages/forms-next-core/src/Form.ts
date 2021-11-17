import Container from './Container';
import {
    BaseModel, ContainerModel,
    FieldJson,
    FieldModel,
    FieldsetJson,
    FieldsetModel,
    FormJson,
    FormModel, Items,
    MetaDataJson
} from './types';
import FormMetaData from './FormMetaData';
import {createChild, Fieldset} from './Fieldset';
import {Action, Change, Controller, createController} from './controller/Controller';
import EventQueue from './controller/EventQueue';
import RuleEngine from './rules/RuleEngine';
import {getAttachments, IdGenerator} from './utils/FormUtils';
import {splitTokens} from './utils/JsonUtils';

class Form extends Container<FormJson> implements FormModel {

    // @ts-ignore
    _controller : Controller
    // @ts-ignore
    _eventQueue : EventQueue<BaseModel>
    _fields : Items<FieldsetModel | FieldModel> = {}
    _ids: Generator<string, void, string>

    constructor(n: FormJson, private _ruleEngine: RuleEngine) {
        super(n);
        this._ids = IdGenerator();
        this._data = {};
        this._jsonModel.data = this._data;
        this._eventQueue = new EventQueue<BaseModel>();
        this._controller = createController(this, this._eventQueue)();
        this.initialize();
        this._jsonModel.id = '$form';
    }

    get ruleEngine() {
        return this._ruleEngine;
    }

    private dataRefRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g

    get metaData(): FormMetaData {
        let metaData = this.getP<MetaDataJson>('metadata', {});
        return new FormMetaData(metaData);
    }

    protected _createChild(child: FieldsetJson | FieldJson, options : any): FieldModel | FieldsetModel {
        return createChild(child, this, options);
    }

    createController(elem: FieldModel | FieldsetModel): Controller {
        return createController(this, this._eventQueue)(elem);
    }

    importData(dataModel: any) {
        this._data = {...dataModel};
        this._jsonModel.data = this._data;
        this.syncDataAndFormModel(this._data, this._data);
        this._eventQueue.runPendingQueue();
    }

    exportData() {
        const data = super.exportData(this._data);
        // override new data into this._data
        return {...this._data, ...data};
    }

    /**
     * returns the current state of the form
     */
    json() {
        const self = this;
        const res = super.json();
        Object.defineProperty(res, 'data', {
            get: function() {
                return self.exportData();
            }
        });
        Object.defineProperty(res, 'attachments', {
            get: function() {
                return getAttachments(res);
            }
        });
        return res;
    }

    get controller() {
        return this._controller;
    }

    get form(): FormModel {
        return this;
    }

    getUniqueId(): string {
        return this._ids.next().value as string;
    }

    executeAction(action: Action, context: any, trigger: (x: Action) => void): any {
        if (action.type === 'FieldAdded') {
            this._fields[action.payload.id] = action.payload;
        } else {
            super.executeAction(action, context, trigger);
        }
    }

    public getElement(id: string): FormModel | FieldModel | FieldsetModel {
        if (id == this.id) {
            return this;
        }
        return this._fields[id];
    }
}

export default Form;
