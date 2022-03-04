import Container from './Container';
import {
    Action, BaseJson,
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
import {ActionImpl, ChangePayload, ExecuteRule, FieldChanged, Initialize, ValidationComplete} from './controller/Controller';

type LogFunction = "info" | "warn" | "error"
/**
 * Logging levels.
 */
export type LogLevel = "off" | LogFunction

const levels = {
    off: 0,
    info: 1,
    warn : 2,
    error: 3
}

/**
 * @private
 */
export class Logger {

    info(msg: string) {
        this.log(msg, 'info')
    }

    warn(msg: string) {
        this.log(msg, 'warn')
    }

    error(msg: string) {
        this.log(msg, 'error')
    }

    log(msg: string, level: LogFunction) {
        if (this.logLevel !== 0 && this.logLevel <= levels[level]) {
            console[level](msg)
        }
    }

    private logLevel: number

    constructor(logLevel: LogLevel = "off") {
        this.logLevel = levels[logLevel]
    }
}



/**
 * Defines `form model` which implements {@link FormModel | form model}
 */
class Form extends Container<FormJson> implements FormModel {

    /**
     * @private
     */
    private _fields: Items<FieldsetModel | FieldModel> = {}
    /**
     * @private
     */
    _ids: Generator<string, void, string>
    /**
     * @private
     */
    private _invalidFields: string[] = []

    private _logger: Logger

    /**
     * @param n
     * @param _ruleEngine
     * @param _eventQueue
     * @param logLevel
     * @private
     */
    constructor(n: FormJson,
                private _ruleEngine: RuleEngine,
                private _eventQueue = new EventQueue(),
                logLevel: LogLevel = "off") {
        //@ts-ignore
        super(n, {});
        this._logger = new Logger(logLevel)
        this.queueEvent(new Initialize());
        this.queueEvent(new ExecuteRule());
        this._ids = IdGenerator();
        this._bindToDataModel(new DataGroup('$form', {}));
        this._initialize();
    }

    get logger() {
        return this._logger;
    }

    private dataRefRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g

    get metaData(): FormMetaData {
        let metaData = this._jsonModel.metadata || {};
        return new FormMetaData(metaData);
    }

    get action() {
        return this._jsonModel.action;
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
     * Returns the current state of the form
     *
     * To access the form data and attachments, one needs to use the `data` and `attachments` property.
     * For example,
     * ```
     * const data = form.getState().data
     * const attachments = form.getState().attachments
     * ```
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

    /**
     * @param field
     * @private
     */
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
        field.subscribe((action) => {
            //@ts-ignore
            const field = action.target.getState();
            if (field) {
                const fieldChangedAction = new FieldChanged(action.payload.changes, field);
                this.dispatch(fieldChangedAction);
            }
        });
    }

    validate() {
        let validationErrors = super.validate();
        // trigger event on form so that user's can customize their application
        this.dispatch(new ValidationComplete(validationErrors));
        return validationErrors;
    }

    /**
     * Checks if the given form is valid or not
     * @returns `true`, if form is valid, `false` otherwise
     */
    isValid() {
        return this._invalidFields.length === 0;
    }

    /**
     * @param field
     * @private
     */
    dispatch(action: Action): void {
        if (action.type === 'submit') {
            super.queueEvent(action);
            this._eventQueue.runPendingQueue();
        } else {
            super.dispatch(action);
        }
    }

    /**
     * @param action
     * @private
     */
    executeAction(action: Action) {
        if (action.type !== 'submit' || this._invalidFields.length === 0) {
            super.executeAction(action);
        }
    }

    /**
     * @param action
     * @param context
     * @private
     */
    submit(action: Action, context: any) {
        // if no errors, only then submit
        if (this.validate().length === 0) {
            submit(context, action.payload.success, action.payload.error, action.payload.submit_as, action.payload.data);
        }
    }

    public getElement(id: string) {
        if (id == this.id) {
            return this;
        }
        return this._fields[id];
    }

    /**
     * @private
     */
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
