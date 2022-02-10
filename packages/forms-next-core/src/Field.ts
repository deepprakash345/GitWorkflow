import {Action, ConstraintsMessages, ContainerModel, FieldJson, FieldModel, FormModel} from './types';
import {Constraints} from './utils/ValidationUtils';
import {Change, ExecuteRule, Initialize, Invalid, propertyChange, Valid} from './controller/Controller';
import Scriptable from './Scriptable';
import {defaultViewTypes} from './utils/SchemaUtils';
import DataValue from './data/DataValue';
import DataGroup from './data/DataGroup';

class Field extends Scriptable<FieldJson> implements FieldModel {

    public constructor(params: FieldJson,
                       _options: { form: FormModel, parent: ContainerModel }) {
        super(params, _options);
        this._applyDefaults();
        this.queueEvent(new Initialize());
        this.queueEvent(new ExecuteRule());
    }

    _initialize(): any {
        super._initialize();
        this.setupRuleNode();
    }

    protected _getDefaults() {
        return {
            readOnly: false,
            enabled: true,
            visible: true,
            type: 'string'
        };
    }

    protected _applyDefaults() {
        Object.entries(this._getDefaults()).map(([key, value]) => {
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
            const type = this._jsonModel.type;
            if (type === 'boolean') {
                this._jsonModel.enum = [true, false];
            }
        }
    }

    get readOnly() {
        return this._jsonModel.readOnly;
    }

    set readOnly(e) {
        this._setProperty('readOnly', e);
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
        this._setProperty('enum', e);
    }

    get enumNames() {
        return this._jsonModel.enumNames;
    }

    set enumNames(e) {
        this._setProperty('enumNames', e);
    }

    get value() {
        this.ruleEngine.trackDependency(this);
        if (this._jsonModel.value === undefined) return null;
        else return this._jsonModel.value;
    }

    set value(v) {
        const changes = this.checkInput(v);
        if (changes.value) {
            if (changes.valid) {
                this.triggerValidationEvent(changes);
            }
            const changeAction = new Change({changes: Object.values(changes)});
            this.dispatch(changeAction);
            const dataNode = this.getDataNode();
            if (typeof dataNode !== 'undefined') {
                dataNode.$value = this._jsonModel.value;
            }
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

    /**
     *
     * @private
     */
    _getConstraintObject() {
        return Constraints;
    }

    private evaluateConstraints(value: any) {
        let constraint = 'type';
        let elem = this._jsonModel;
        const Constraints = this._getConstraintObject();
        const supportedConstraints = Object.keys(Constraints).filter(x => x != 'type' && x != 'enum');
        const typeRes = Constraints.type(elem.type || 'string', value);
        const res = typeRes;
        const isArrayType = this.type ? this.type.indexOf('[]') > -1 : false;
        if (res.valid) {
            const invalidConstraint = supportedConstraints.find(key => {
                if (key in elem) {
                    // @ts-ignore
                    const restriction = elem[key];
                    // @ts-ignore
                    const fn = Constraints[key];
                    if (res.value instanceof Array && isArrayType) {
                        return res.value.some(x => !(fn(restriction, value).valid));
                    } else {
                        return !fn(restriction, res.value).valid;
                    }
                } else {
                    return false;
                }
            });
            if (invalidConstraint != null) {
                res.valid = false;
                constraint = invalidConstraint;
            } else if (this._jsonModel.enforceEnum === true && res.value != null) {
                const fn = Constraints.enum;
                let enumCheck;
                if (res.value instanceof Array && isArrayType) {
                    enumCheck = res.value.every(x => fn(elem.enum || [], x).valid);
                } else {
                    enumCheck =  fn(elem.enum || [], res.value).valid;
                }
                res.valid = enumCheck;
                constraint = 'enum';
            }
        }
        return {
            valid: res.valid,
            constraint,
            value: res.value
        };
    }

    triggerValidationEvent(changes: any) {
        if (changes.valid) {
            if (this.valid) {
                this.dispatch(new Valid());
            } else {
                this.dispatch(new Invalid());
            }
        }
    }

    protected checkInput(input: any) {
        let {valid, value, constraint} = this.evaluateConstraints(input);
        const elem = {
            'valid': valid,
            'value': value,
            'errorMessage': valid ? '' : this.getErrorMessage(constraint as keyof ConstraintsMessages)
        };
        return this._checkUpdates(['value', 'valid', 'errorMessage'], elem);
    }

    change(event: Action, context: any) {

    }

    /**
     * Checks whether there are any updates in the properties
     * @param propNames
     * @param updates
     * @private
     */
    protected _checkUpdates(propNames: string[], updates: any) {
        return propNames.reduce((acc: any, propertyName) => {
            //@ts-ignore
            const prevValue = this._jsonModel[propertyName];
            const currentValue = updates[propertyName];
            if (currentValue !== prevValue) {
                acc[propertyName] = {
                    propertyName,
                    currentValue,
                    prevValue
                };
                // @ts-ignore
                this._jsonModel[propertyName] = currentValue;
            }
            return acc;
        }, {});
    }

    validate(action: Action) {
        const changes = this.checkInput(this._jsonModel.value);
        if (changes.valid) {
            this.triggerValidationEvent(changes);
            this.notifyDependents(new Change({ changes: Object.values(changes) }));
        }
    }

    importData(contextualDataModel: DataGroup) {
        this._bindToDataModel(contextualDataModel);
        const dataNode = this.getDataNode();
        if (dataNode !== undefined) {
            const changeAction = propertyChange('value', dataNode.$value, this._jsonModel.value);
            this._jsonModel.value = dataNode.$value;
            this.queueEvent(changeAction);
        }
    }

    defaultDataModel(name: string|number): DataValue {
        return new DataValue(name, this._jsonModel.value, this.type || 'string');
    }
}

export default Field;
