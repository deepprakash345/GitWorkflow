import {Action, ConstraintsMessages, ContainerModel, FieldJson, FieldModel, FormModel, ValidationError} from './types';
import {Constraints, ValidConstraints} from './utils/ValidationUtils';
import {Change, ExecuteRule, Initialize, Invalid, propertyChange, Valid} from './controller';
import Scriptable from './Scriptable';
import {defaultFieldTypes} from './utils/SchemaUtils';
import DataValue from './data/DataValue';
import DataGroup from './data/DataGroup';

/**
 * Defines a form object field which implements {@link FieldModel | field model} interface
 */
class Field extends Scriptable<FieldJson> implements FieldModel {

    /**
     * @param params
     * @param _options
     * @private
     */
    public constructor(params: FieldJson,
                       _options: { form: FormModel, parent: ContainerModel }) {
        super(params, _options);
        this._applyDefaults();
        this.queueEvent(new Initialize());
        this.queueEvent(new ExecuteRule());
    }

    /**
     * @private
     */
    _initialize(): any {
        super._initialize();
        this.setupRuleNode();
    }

    protected _getDefaults() {
        return {
            readOnly: false,
            enabled: true,
            visible: true,
            type: this._getFallbackType()
        };
    }

    /**
     * Returns the fallback type to be used for this field, in case type is not defined. Otherwise returns
     * undefined
     * @protected
     */
    protected _getFallbackType(): string | undefined {
        const type = this._jsonModel.type
        if (typeof type !== "string") {
            const _enum = this.enum;
            return _enum && _enum.length > 0 ? typeof _enum[0] : 'string';
        }
    }

    protected _applyDefaults() {
        Object.entries(this._getDefaults()).map(([key, value]) => {
            //@ts-ignore
            if (this._jsonModel[key] === undefined && value !== undefined) {
                //@ts-ignore
                this._jsonModel[key] = value;
            }
        });
        let value = this._jsonModel.value;
        if (value === undefined) {
            this._jsonModel.value = this._jsonModel.default;
        }
        if (this._jsonModel.fieldType === undefined) {
            //@ts-ignore
            if (this._jsonModel.viewType) {
                //@ts-ignore
                if (this._jsonModel.viewType.startsWith('custom:')) {
                    this.form.logger.error("viewType property has been removed. For custom types, use :type property")
                } else {
                    this.form.logger.error("viewType property has been removed. Use fieldType property")
                }
                //@ts-ignore
                this._jsonModel.fieldType = this._jsonModel.viewType
            } else {
                this._jsonModel.fieldType = defaultFieldTypes(this._jsonModel);
            }
        }
        if (this._jsonModel.enum === undefined) {
            const type = this._jsonModel.type;
            if (type === 'boolean') {
                this._jsonModel.enum = [true, false];
            }
        }
        if (typeof this._jsonModel.step !== 'number' || this._jsonModel.type !== "number") {
            this._jsonModel.step = undefined;
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

    get emptyValue() {
        if (this._jsonModel.emptyValue === null) return null;
        else if (this._jsonModel.emptyValue === '' && this.type === 'string') return '';
        else return undefined;
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

    get required() {
        return this._jsonModel.required || false;
    }

    set required(r) {
        this._setProperty('required', r);
    }

    set enumNames(e) {
        this._setProperty('enumNames', e);
    }

    get value() {
        this.ruleEngine.trackDependency(this);
        if (this._jsonModel.value === undefined) {
            return null;
        }
        else return this._jsonModel.value;
    }

    /**
     * returns whether the value is empty. Empty value is either a '', undefined or null
     * @private
     */
    private isEmpty() {
        return this._jsonModel.value === undefined || this._jsonModel.value === null || this._jsonModel.value === ''
    }

    set value(v) {
        const Constraints = this._getConstraintObject();
        const typeRes = Constraints.type(this._jsonModel.type || 'string', v);
        const changes = this._setProperty('value', typeRes.value, false)
        if (changes.length > 0) {
            const dataNode = this.getDataNode();
            if (typeof dataNode !== 'undefined') {
                dataNode.$value = this.isEmpty() ? this.emptyValue : this._jsonModel.value;
            }
            let updates
            if (typeRes.valid) {
                updates = this.evaluateConstraints();
            } else {
                let changes = {
                    'valid': typeRes.valid,
                    'errorMessage': typeRes.valid ? '' : this.getErrorMessage('type')
                };
                updates = this._applyUpdates(['valid', 'errorMessage'], changes);
            }
            if (updates.valid) {
                this.triggerValidationEvent(updates);
            }
            const changeAction = new Change({changes: changes.concat(Object.values(updates))})
            this.dispatch(changeAction);
        }
    }

    valueOf() {
        this.ruleEngine.trackDependency(this);
        return this._jsonModel.value || null;
    }

    toString() {
        return this._jsonModel.value?.toString() || '';
    }

    /**
     * Returns the error message for a given constraint
     * @param constraint
     */
    getErrorMessage(constraint: keyof (ConstraintsMessages)) {
        return this._jsonModel.constraintMessages?.[constraint as keyof (ConstraintsMessages)] || '';
    }

    /**
     *
     * @private
     */
    _getConstraintObject() {
        return Constraints;
    }


    /**
     * returns whether the field is array type or not
     * @private
     */
    private isArrayType() {
        return this.type ? this.type.indexOf('[]') > -1 : false;
    }

    /**
     *
     * @param value
     * @param constraints
     * @private
     */
    private checkEnum(value: any, constraints: any) {
        if (this._jsonModel.enforceEnum === true && value != null) {
            const fn = constraints.enum;
            if (value instanceof Array && this.isArrayType()) {
                return value.every(x => fn(this.enum || [], x).valid);
            } else {
                return  fn(this.enum || [], value).valid;
            }
        }
        return true;
    }

    /**
     * checks whether the value can be achieved by stepping the min/default value by the step constraint.
     * Basically to find a integer solution for n in the equation
     * initialValue + n * step = value
     * @param constraints
     * @private
     */
    private checkStep() {
        const value = this._jsonModel.value;
        if (typeof this._jsonModel.step === "number") {
            const initialValue = this._jsonModel.minimum || this._jsonModel.default || 0
            return (value - initialValue) % this._jsonModel.step === 0
        }
        return true;
    }

    /**
     * checks whether the validation expression returns a boolean value or not
     * @private
     */
    private checkValidationExpression() {
        if (typeof this._jsonModel.validationExpression === "string") {
            return this.executeExpression(this._jsonModel.validationExpression)
        }
        return true;
    }

    /**
     * Returns the applicable constraints for a given type
     * @private
     */
    private getConstraints() {
        switch (this.type) {
            case 'string':
                switch (this.format) {
                    case 'date':
                        return ValidConstraints.date
                    case 'binary':
                        return ValidConstraints.file
                    case 'data-url':
                        return ValidConstraints.file
                    default:
                        return ValidConstraints.string
                }
            case 'number':
                return ValidConstraints.number
        }
        if (this.isArrayType()) {
            return ValidConstraints.array
        }
        return []
    }

    /**
     * returns the format constraint
     */
    get format() {
        return this._jsonModel.format || '';
    }

    /**
     * @private
     */
    protected evaluateConstraints() {
        let constraint = 'type';
        let elem = this._jsonModel;
        let value = this._jsonModel.value;
        const Constraints = this._getConstraintObject()
        const supportedConstraints = this.getConstraints();
        let valid = true
        if (valid) {
            valid = Constraints.required(this.required, value).valid &&
                (this.isArrayType() && this.required ? value.length > 0 : true);
            constraint = 'required';
        }
        if (valid) {
            const invalidConstraint = supportedConstraints.find(key => {
                if (key in elem) {
                    // @ts-ignore
                    const restriction = elem[key];
                    // @ts-ignore
                    const fn = Constraints[key];
                    if (value instanceof Array && this.isArrayType()) {
                        return value.some(x => !(fn(restriction, value).valid));
                    } else if (typeof fn === "function") {
                        return !fn(restriction, value).valid;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
            if (invalidConstraint != null) {
                valid = false;
                constraint = invalidConstraint;
            } else {
                valid = this.checkEnum(value, Constraints)
                constraint = "enum"
                if (valid && this.type === "number") {
                    valid = this.checkStep()
                    constraint = "step"
                }
                if (valid) {
                    valid = this.checkValidationExpression();
                    constraint = "validationExpression"
                }
            }
        }
        if (!valid) {
            //@ts-ignore
            this.form.logger.log(`${constraint} constraint evaluation failed ${this[constraint]}. Received ${this._jsonModel.value}`);
        }
        let changes = {
            'valid': valid,
            'errorMessage': valid ? '' : this.getErrorMessage(constraint as keyof ConstraintsMessages)
        };
        return this._applyUpdates(['valid', 'errorMessage'], changes);
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

    change(event: Action, context: any) {

    }

    /**
     * Checks whether there are any updates in the properties. If there are applies them to the
     * json model as well.
     * @param propNames
     * @param updates
     * @private
     */
    protected _applyUpdates(propNames: string[], updates: any) {
        return propNames.reduce((acc: any, propertyName) => {
            //@ts-ignore
            const prevValue = this._jsonModel[propertyName];
            const currentValue = updates[propertyName];
            const changes = this._setProperty(propertyName, currentValue, false)
            if (changes.length > 0) {
                acc[propertyName] = changes[0]
            }
            return acc;
        }, {});
    }

    /**
     * Validates the current form object
     */
    validate() {
        let changes = this.evaluateConstraints();
        if (changes.valid) {
            this.triggerValidationEvent(changes);
            this.notifyDependents(new Change({ changes: Object.values(changes) }));
        }
        return this.valid ? [new ValidationError()]: [new ValidationError(this.id, [this._jsonModel.errorMessage])];
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

    /**
     * @param name
     * @private
     */
    defaultDataModel(name: string|number): DataValue {
        return new DataValue(name, this.isEmpty() ? this.emptyValue : this._jsonModel.value, this.type || 'string');
    }
}

export default Field;
