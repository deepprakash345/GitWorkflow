import Container from './Container';
import {
    Action,
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
import DataGroup from './data/DataGroup';
import {submit} from './rules/FunctionRuntime';
import {ActionImpl, ExecuteRule, Initialize} from './controller/Controller';

class Validate extends ActionImpl {
    constructor() {
        super({}, 'validate', {dispatch: true});
    }
}


class Form extends Container<FormJson> implements FormModel {

    _fields: Items<FieldsetModel | FieldModel> = {}
    _ids: Generator<string, void, string>
    _invalidFields: string[] = []

    constructor(n: FormJson, private _ruleEngine: RuleEngine, private _eventQueue = new EventQueue()) {
        //@ts-ignore
        super(n, {});
        this.queueEvent(new Initialize());
        this.queueEvent(new ExecuteRule());
        this._ids = IdGenerator();
        this._bindToDataModel(new DataGroup('$form', {}));
        this._initialize();
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
        this._bindToDataModel(new DataGroup('$form', dataModel));
        this.syncDataAndFormModel(this.getDataNode() as DataGroup);
        this._eventQueue.runPendingQueue();
    }

    exportData() {
        return this.getDataNode()?.$value;
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
                return getAttachments(self);
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
        field.subscribe((action) => {
            if (this._invalidFields.indexOf(action.target.id) === -1) {
                this._invalidFields.push(action.target.id);
            }
        }, 'invalid');
        field.subscribe((action) => {
            const index = this._invalidFields.indexOf(action.target.id);
            if (index > -1) {
                this._invalidFields.splice(index, 1);
            }
        }, 'valid');

    }

    dispatch(action: Action): void {
        if (action.type === 'submit') {
            this.queueEvent(new Validate());
            super.queueEvent(action);
            this._eventQueue.runPendingQueue();
        } else {
            super.dispatch(action);
        }
    }

    executeAction(action: Action) {
        if (action.type !== 'submit' || this._invalidFields.length === 0) {
            super.executeAction(action);
        }
    }

    submit(action: Action, context: any) {
        submit(context, action.payload.success, action.payload.error, action.payload.submit_as, action.payload.data);
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
