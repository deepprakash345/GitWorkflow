import {Action, ConstraintsMessages, ContainerModel, FieldJson, FieldModel, FormModel} from './types';
import {resolve} from './utils/JsonUtils';
import {Constraints} from './utils/ValidationUtils';
import {propertyChange} from './controller/Controller';
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
    private _tokens: Token[] = []
    private _parentData: any = null;
    public constructor(params: FieldJson,
                       _options: { form: FormModel, parent: ContainerModel }) {
        super(params, _options);
        this._applyDefaults();
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

    set readOnly(e) {
        if (e !== this._jsonModel.readOnly) {
            const changeAction = propertyChange('readOnly', e, this._jsonModel.enum);
            this._jsonModel.readOnly = e;
            this.notifyDependents(changeAction);
        }
    }

    get enabled() {
        return this._jsonModel.enabled;
    }

    set enabled(e) {
        this._jsonModel.enabled = e;
    }

    get valid() {
        return this._jsonModel.valid;
    }

    get enum() {
        return this._jsonModel.enum;
    }

    set enum(e) {
        if (e !== this._jsonModel.enum) {
            const changeAction = propertyChange('enum', e, this._jsonModel.enum);
            this._jsonModel.enum = e;
            this.notifyDependents(changeAction);
        }
    }

    get enumNames() {
        return this._jsonModel.enumNames;
    }

    set enumNames(e) {
        if (e !== this._jsonModel.enumNames) {
            const changeAction = propertyChange('enum', e, this._jsonModel.enumNames);
            this._jsonModel.enumNames = e;
            this.notifyDependents(changeAction);
        }
    }

    get value() {
        this.ruleEngine.trackDependency(this);
        if (this._jsonModel.value === undefined) return null;
        else return this._jsonModel.value;
    }

    set value(v) {
        const res = this.checkInput(v);
        if (res.value !== this._jsonModel.value) {
            const curr = this._jsonModel.value;
            this._jsonModel.valid = res.valid;
            this._jsonModel.errorMessage = res.errorMessage;
            this._jsonModel.value = res.value;
            const changeAction = propertyChange('value', res.value, curr);
            this.dispatch(changeAction);
            this.form.getEventQueue().runPendingQueue();
        }
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

    change(event: Action, context: any) {
        //this.executeAllRules(context);
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
        this._jsonModel.value = data;
    }

    exportData(dataModel: any) {
        if (this.dataRef != null) {
            resolve(dataModel, this.dataRef, this._jsonModel.value);
        } else if (this.dataRef !== null) {
            return this._jsonModel.value;
        }
    }
}

export default Field;
