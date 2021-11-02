import {ConstraintsMessages, FieldJson, FieldModel, FormModel} from './types';
import {jsonString, resolve} from './utils/JsonUtils';
import {Constraints} from './utils/ValidationUtils';
import {Change, Controller} from './controller/Controller';
import Scriptable from './Scriptable';
import {defaultViewTypes} from './utils/SchemaUtils';

const defaults = {
  readOnly : false,
  enabled : true,
  visible : true,
  type : 'string'
};

class Field extends Scriptable<FieldJson> implements FieldModel {
  private _controller: Controller;

  public constructor (params: FieldJson,
                      private _form: FormModel) {
    super(params);
    this._applyDefaults();
    this._controller = _form.createController(this);
  }

  private _applyDefaults() {
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

  get readOnly () {
    return this._jsonModel.readOnly;
  }

  get enabled () {
    return this._jsonModel.enabled;
  }

  get visible () {
    return this._jsonModel.visible;
  }

  get valid () {
    return this._jsonModel.valid;
  }

  get id() {
    return this._jsonModel.id;
  }

  get type() {
    return this._jsonModel.type;
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
    return this._jsonModel.viewType;
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

  get ruleEngine() {
    return this._form.ruleEngine;
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
      console.log(`${constraint} validation failed for ${this._jsonModel.id} with value ${value}`);
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

  importData(dataModel: any, parentDataModel: any) {
    let data: any;
    const name = this.name || '';
    if (this.dataRef != 'none' && this.dataRef !== undefined) {
      data = resolve(dataModel, this.dataRef);
    } else if (this.dataRef !== 'none' && name.length > 0) {
      data = resolve(parentDataModel, name);
    }
    if (data !== undefined) {
      this.controller.queueEvent(new Change(data));
    }
  }

  exportData(dataModel: any, parentDataModel: any) {
    const name = this.name || '';
    if (this.dataRef != 'none' && this.dataRef !== undefined) {
      resolve(dataModel, this.dataRef, this.value);
    } else if (this.dataRef !== 'none' && name.length > 0) {
      resolve(parentDataModel, name, this.value);
    }
  }
}

export default Field;
