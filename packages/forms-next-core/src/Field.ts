import {ConstraintsMessages, FieldJson, FieldModel} from './types';
import {filterProps, jsonString, undefinedValueFilter} from './utils/JsonUtils';
import {Constraints} from './utils/ValidationUtils';
import {Controller} from './controller/Controller';
import Scriptable from './Scriptable';
import {emptyController} from './controller/Controller';
import {defaultViewTypes} from './utils/SchemaUtils';
import RuleEngine from './rules/RuleEngine';

class Field extends Scriptable<FieldJson> implements FieldModel {
  private _controller: Controller;

  public constructor (params: FieldJson,
                      ruleEngine: RuleEngine,
                      createController?: (elem : FieldModel) => Controller) {
    super(params, ruleEngine);
    let value = this.getP('value', undefined);
    if (value === undefined) {
      this._jsonModel.value = this.default; //TODO: see if we want to keep :
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
    if (createController) {
      this._controller = createController(this as FieldModel);
    } else {
      this._controller = emptyController(this as FieldModel);
    }
  }

  get readOnly () {
    return this.getP('readOnly', false);
  }

  get enabled () {
    return this.getP('enabled', true);
  }

  get 'default' () {
    return this.getP('default', undefined);
  }

  get visible () {
    return this.getP('visible', true);
  }

  get valid () {
    return this._jsonModel.valid;
  }

  get id() {
    return this._jsonModel.id;
  }

  public json (): FieldJson {
    return filterProps(Object.assign({}, super.json(), {
      'value': this._jsonModel.value,
      'readOnly': this.readOnly,
      'enabled': this.enabled,
      'default': this.default,
      'visible': this.visible,
      'valid': this.valid,
      'id' : this.id,
      'viewType' : this.viewType
    }), undefinedValueFilter);
  }

  get value() {
    this._ruleEngine.trackDependency(this);
    if (this._jsonModel.value === undefined) return null;
    else return this._jsonModel.value;
  }

  valueOf() {
    this._ruleEngine.trackDependency(this);
    return this._jsonModel.value || null;
  }

  toString() {
    return this._jsonModel.value?.toString() || '';
  }

  get name() {
    return this._jsonModel.name;
  }

  get dataRef() {
    return this._jsonModel.dataRef;
  }

  get title() {
    return this._jsonModel.title;
  }

  get viewType() {
    return this._jsonModel.viewType || defaultViewTypes(this._jsonModel);
  }

  get enum() {
    return this._jsonModel.enum;
  }

  private getErrorMessage(constraint: keyof(ConstraintsMessages)) {
    return this._jsonModel.constraintMessages?.[constraint as keyof(ConstraintsMessages)] || 'There is an error in the field';
  }

  private evaluateConstraints(value: string) {
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

  private checkInput(input: string) {
    //todo : execute change event
    let {valid, value, constraint} = this.evaluateConstraints(input);
    let elem = {
      'valid' : valid,
      'value' : value,
      'errorMessage' : ''
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

  controller() {
    return this._controller;
  }
}

export default Field;
