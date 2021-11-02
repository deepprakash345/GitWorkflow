import Container from './Container';
import {
    BaseModel,
    FieldJson,
    FieldModel,
    FieldsetJson,
    FieldsetModel,
    FormJson,
    FormModel,
    MetaDataJson
} from './types';
import {resolve} from './utils/JsonUtils';
import FormMetaData from './FormMetaData';
import {createChild} from './Fieldset';
import {Action, Change, Controller, createController} from './controller/Controller';
import EventQueue from './controller/EventQueue';
import RuleEngine from './rules/RuleEngine';

class Form extends Container<FormJson> implements FormModel {

    // @ts-ignore
    _controller : Controller
    // @ts-ignore
    _eventQueue : EventQueue<BaseModel>

    constructor(n: FormJson, ruleEngine: RuleEngine) {
        super(n, ruleEngine);
        this._jsonModel.id = '$form';
        this._data = {};
        this._jsonModel.data = this._data;
    }

    protected initialize(ruleEngine: RuleEngine,
                         _createController?: (elem: (FieldModel | FieldsetModel)) => Controller) {
        this._eventQueue = new EventQueue<BaseModel>();
        this._controller = createController(this, this._eventQueue)();
        super.initialize(ruleEngine, _createController);
    }

    private dataRefRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g

    get metaData(): FormMetaData {
        let metaData = this.getP<MetaDataJson>('metadata', {});
        return new FormMetaData(metaData);
    }

    protected _createChild(child: FieldsetJson | FieldJson, ruleEngine: RuleEngine): FieldModel | FieldsetModel {
        return createChild(child, ruleEngine,createController(this, this._eventQueue));
    }

    importData(dataModel: any) {
        this._data = {...dataModel};
        this._jsonModel.data = this._data;
        this.syncDataAndFormModel(this._data, this._data);
        this._eventQueue.runPendingQueue();
    }

    exportData() {
        this.syncDataAndFormModel(this._data, this._data, 'exportData');
        return this._data;
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

    controller() {
        return this._controller;
    }
}

export default Form;
