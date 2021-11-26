import {ConstraintsMessages, ContainerModel, FieldJson, FieldModel, FormModel} from './types';
import {jsonString, resolve} from './utils/JsonUtils';
import {Constraints} from './utils/ValidationUtils';
import {Change, Controller, FieldAdded} from './controller/Controller';
import Scriptable from './Scriptable';
import {defaultViewTypes} from './utils/SchemaUtils';
import {resolveData, Token, tokenize} from './utils/DataRefParser';

//todo: move to a single place in Model.ts or Json.ts
const defaults = {
    readOnly: false,
    enabled: true,
    visible: true,
    type: 'string'
};

class Field extends Scriptable<FieldJson> implements FieldModel {
    private _controller: Controller;
    private _tokens: Token[] = []
    private _parentData: any = null;
    public constructor(params: FieldJson,
                       _options: { form: FormModel, parent: ContainerModel }) {
        super(params, _options);
        this._applyDefaults();
        this._controller = _options.form.createController(this);
        this.form.controller.dispatch(new FieldAdded(this));
        this.setupRuleNode();
    }

    protected _applyDefaults() {
        Object.entries(defaults).map(([key, value]) => {
            //@ts-ignore
            if (this._jsonModel[key] === undefined) {
                //@ts-ignore
                this._jsonModel[key] = value;
            }
        });
        let value = this._jsonModel.value;
        if (value === undefined) {
            this._jsonModel.value = this._jsonModel.default;
        }
        if (this._jsonModel.viewType === undefined) {
            this._jsonModel.viewType = defaultViewTypes(this._jsonModel);
        }
        if (this._jsonModel.enum === undefined) {
            const type = this._jsonModel.type || 'string';
            if (type === 'boolean') {
                this._jsonModel.enum = [true, false];
            }
        }
    }

    get readOnly() {
        return this._jsonModel.readOnly;
    }

    get enabled() {
        return this._jsonModel.enabled;
    }

    get valid() {
        return this._jsonModel.valid;
    }

    get enum() {
        return this._jsonModel.enum;
    }

    get value() {
        this.ruleEngine.trackDependency(this);
        if (this._jsonModel.value === undefined) return null;
        else return this._jsonModel.value;
    }

    valueOf() {
        this.ruleEngine.trackDependency(this);
        return this._jsonModel.value || null;
    }

    toString() {
        return this._jsonModel.value?.toString() || '';
    }

    private getErrorMessage(constraint: keyof (ConstraintsMessages)) {
        return this._jsonModel.constraintMessages?.[constraint as keyof (ConstraintsMessages)] || 'There is an error in the field';
    }

    private evaluateConstraints(value: any) {
        let constraint = 'type';
        let elem = this._jsonModel;
        const supportedConstraints = Object.keys(Constraints).filter(x => x != 'type' && x != 'enum');
        const res = Constraints.type(elem.type || 'string', value);
        if (res.valid) {
            const invalidConstraint = supportedConstraints.find(key => {
                if (key in elem) {
                    // @ts-ignore
                    const restriction = elem[key];
                    // @ts-ignore
                    return !Constraints[key](restriction, res.value).valid;
                } else {
                    return false;
                }
            });
            if (invalidConstraint != null) {
                res.valid = false;
                constraint = invalidConstraint;
            } else if (this._jsonModel.enforceEnum === true) {
                let enumCheck = Constraints.enum(elem.enum || [], value);
                res.valid = enumCheck.valid;
                res.value = enumCheck.value;
                constraint = 'enum';
            }
        }
        return {
            valid: res.valid,
            constraint,
            value: res.value
        };
    }

    protected checkInput(input: any) {
        //todo : execute change event
        let {valid, value, constraint} = this.evaluateConstraints(input);
        let elem = {
            'valid': valid,
            'value': value,
            'errorMessage': ''
        };
        if (!valid) {
            console.log(`${constraint} validation failed for ${this.id} with value ${value}`);
            elem.errorMessage = this.getErrorMessage(constraint as keyof ConstraintsMessages);
        } else {
            elem.value = value;
            elem.errorMessage = '';
            //todo : make it conditional based on valid flag
        }
        return elem;
    }

    protected handleValueChange(payload: any) {
        if (payload !== undefined) {
            //todo : set empty string to `empty` value
            return this.checkInput(payload != null ? typeof payload == 'object' ? jsonString(payload) : payload.toString() : null);
        }
        return {};
    }

    get controller() {
        return this._controller;
    }

    importData(dataModel: any, contextualDataModel: any) {
        let data: any;
        const curValue = this.value;
        const dataRef = this._jsonModel.dataRef;
        let key: string|number = '';
        if (dataRef === null) {
            //do nothing
        } else if (dataRef !== undefined) {
            if (this._tokens.length === 0) {
                this._tokens = tokenize(dataRef);
            }
            const {result, parent} = resolveData(dataModel, this._tokens);
            this._parentData = parent;
            key = this._tokens.slice(-1)[0].value;
            data = result;
        } else {
            if (contextualDataModel != null) {
                this._parentData = contextualDataModel;
                const name = this._jsonModel.name || '';
                key = contextualDataModel instanceof Array ? this.index : name;
                data = this._parentData[key];
            }
        }
        if (key !== '') {
            if (data == null) {
                this._parentData[key] = curValue;
            }
            data = this._parentData[key];
        }
        if (data !== undefined) {
            this.controller.queueEvent(new Change(data));
        }
    }

    exportData(dataModel: any) {
        if (this.dataRef != null) {
            resolve(dataModel, this.dataRef, this.value);
        } else if (this.dataRef !== null) {
            return this.value;
        }
    }
}

export default Field;
