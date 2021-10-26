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

    constructor(n: FormJson) {
        super(n, new RuleEngine());
        this._jsonModel.id = '$form';
        this._data = {};
        this._jsonModel.data = this._data;

    }

    protected initialize(ruleEngine: RuleEngine,
                         _createController?: (elem: (FieldModel | FieldsetModel)) => Controller) {
        this._eventQueue = new EventQueue<BaseModel>();
        this._controller = createController(this as FormModel, this._eventQueue)();
        super.initialize(ruleEngine, _createController);
    }

    private dataRefRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g

    get metaData(): FormMetaData {
        let metaData = this.getP<MetaDataJson>('metadata', {});
        return new FormMetaData(metaData);
    }

    protected _createChild(child: FieldsetJson | FieldJson, ruleEngine: RuleEngine): FieldModel | FieldsetModel {
        return createChild(child, ruleEngine,(elem) => {
            let controller = createController(this as FormModel, this._eventQueue)(elem);
            controller.subscribe((e: Action) => {
                let elem = e.target.getState();
                this.updateDataDom(elem as FieldJson);
                //this._eventQueue.queue(this, new Change(undefined, true));
            });
            return controller;
        });
    }

    mergeDataModel(dataModel : any, parentDataModel?: any) {
        this._data = {...dataModel};
        this._jsonModel.data = this._data;
        super.mergeDataModel(this._data, this._data);
        this._eventQueue.runPendingQueue();
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
