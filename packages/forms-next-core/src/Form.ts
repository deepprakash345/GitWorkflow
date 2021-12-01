import Container from './Container';
import {
    Action, BaseModel,
    FieldJson,
    FieldModel,
    FieldsetJson,
    FieldsetModel,
    FormJson,
    FormModel, Items
} from './types';
import FormMetaData from './FormMetaData';
import {createChild} from './Fieldset';
import EventQueue from './controller/EventQueue';
import RuleEngine from './rules/RuleEngine';
import {getAttachments, IdGenerator} from './utils/FormUtils';
import {BaseNode} from './BaseNode';

class Form extends Container<FormJson> implements FormModel {

    _fields: Items<FieldsetModel | FieldModel> = {}
    _ids: Generator<string, void, string>

    constructor(n: FormJson, private _ruleEngine: RuleEngine, private _eventQueue = new EventQueue()) {
        //@ts-ignore
        super(n, {});
        this._ids = IdGenerator();
        this._data = {};
        this._jsonModel.data = this._data;
        this._initialize(n.items);
    }

    private dataRefRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g

    get metaData(): FormMetaData {
        let metaData = this._jsonModel.metadata || {};
        return new FormMetaData(metaData);
    }

    protected _createChild(child: FieldsetJson | FieldJson): FieldModel | FieldsetModel {
        return createChild(child, {form: this, parent: this});
    }

    importData(dataModel: any) {
        this._data = {...dataModel};
        this._jsonModel.data = this._data;
        this.syncDataAndFormModel(this._data, this._data, 'importData');
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
    getState() {
        const self = this;
        const res = super.getState();
        res.id = '$form';
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

    get type() {
        return 'object';
    }

    get form(): FormModel {
        return this;
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

    fieldAdded(field: FieldModel | FieldsetModel) {
        this._fields[field.id] = field;
    }

    submit() {
        // if (action?.type === 'submit') {
        //     action = new Submit(context.$form?.getState().data);
        // }
        //this._fields[action.payload.id] = action.payload;
    }

    public getElement(id: string) {
        if (id == this.id) {
            return this;
        }
        return this._fields[id];
    }

    getEventQueue(): EventQueue {
        return this._eventQueue;
    }

    get name() {
        return '$form';
    }

    get value() {
        return null;
    }

    get id() {
        return '$form';
    }

    get title() {
        return this._jsonModel.title || '';
    }
}

export default Form;
