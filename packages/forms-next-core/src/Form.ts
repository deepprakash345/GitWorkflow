import Container from './Container';
import {
    BaseModel,
    FieldJson,
    FieldModel,
    FieldsetJson,
    FieldsetModel,
    FormJson,
    FormModel, Items,
    MetaDataJson
} from './types';
import FormMetaData from './FormMetaData';
import {createChild} from './Fieldset';
import {Action, Controller, createController} from './controller/Controller';
import EventQueue from './controller/EventQueue';
import RuleEngine from './rules/RuleEngine';
import {IdGenerator} from './utils/FormUtils';

class Form extends Container<FormJson> implements FormModel {

    // @ts-ignore
    _controller: Controller
    // @ts-ignore
    _eventQueue: EventQueue<BaseModel>
    _fields: Items<FieldsetModel | FieldModel> = {}
    _ids: Generator<string, void, string>

    constructor(n: FormJson, private _ruleEngine: RuleEngine) {
        //@ts-ignore
        super(n, {});
        this._ids = IdGenerator();
        this._data = {};
        this._jsonModel.data = this._data;
        this._eventQueue = new EventQueue<BaseModel>();
        this._controller = createController(this, this._eventQueue)();
        this.initialize();
    }

    private dataRefRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g

    get metaData(): FormMetaData {
        let metaData = this.getP<MetaDataJson>('metadata', {});
        return new FormMetaData(metaData);
    }

    protected _createChild(child: FieldsetJson | FieldJson): FieldModel | FieldsetModel {
        return createChild(child, {form: this, parent: this});
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
        return {...data, ...this._data};
    }

    /**
     * returns the current state of the form
     */
    json() {
        const self = this;
        const res = super.json();
        Object.defineProperty(res, 'data', {
            get() {
                return self.exportData();
            }
        });
        return res;
    }

    get controller() {
        return this._controller;
    }

    get type() {
        return 'object';
    }

    get form(): FormModel {
        return this;
    }

    get id() {
        return '$form';
    }

    get ruleEngine() {
        return this._ruleEngine;
    }

    getUniqueId(): string {
        if (this._ids == null) {
            return '';
        }
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

    get name() {
        return '$form';
    }
}

export default Form;
