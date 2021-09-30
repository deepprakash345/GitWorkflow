import {ConstraintsMessages, FieldJson, FieldModel} from './types';
import {filterProps, undefinedValueFilter} from './utils/JsonUtils';
import {Constraints} from './utils/ValidationUtils';
import {Controller} from './controller/Controller';
import Scriptable from './Scriptable';
import {emptyController} from './controller/Controller';

class Field extends Scriptable<FieldJson> implements FieldModel {
  private _controller: Controller;

  public constructor (params: FieldJson, createController?: (elem : FieldModel) => Controller) {
    super(params);
    let value = this.getP('value', undefined);
    if (value === undefined) {
      this._jsonModel[':value'] = this.default; //TODO: see if we want to keep :
    }
    if (createController) {
      this._controller = createController(this as FieldModel);
    } else {
      this._controller = emptyController(this as FieldModel);
    }
  }

  get readOnly () {
    return this.getP(':readOnly', false);
  }

  get enabled () {
    return this.getP(':enabled', true);
  }

  get 'default' () {
    return this.getP(':default', undefined);
  }

  get visible () {
    return this.getP(':visible', true);
  }

  get valid () {
    return this._jsonModel[':valid'];
  }

  get id() {
    return this._jsonModel[':id'];
  }

  public json (): FieldJson {
    return filterProps(Object.assign({}, super.json(), {
      ':value': this._jsonModel[':value'],
      ':readOnly': this.readOnly,
      ':enabled': this.enabled,
      ':default': this.default,
      ':visible': this.visible,
      ':valid': this.valid,
      ':id' : this.id
      // eslint-disable-next-line no-unused-vars
    }), undefinedValueFilter);
  }

  get value() {
    if (this._jsonModel[':value'] === undefined) return null;
    else return this._jsonModel[':value'];
  }

  get name() {
    return this._jsonModel[':name'];
  }

  get dataRef() {
    return this._jsonModel[':dataRef'];
  }

  get title() {
    return this._jsonModel[':title'];
  }


  private getErrorMessage(constraint: keyof(ConstraintsMessages)) {
    return this._jsonModel[':constraintMessages']?.[constraint as keyof(ConstraintsMessages)] || 'There is an error in the field';
  }

  private evaluateConstraints(value: string) {
    let constraint = ':dataType';
    let elem = this._jsonModel;
    const constraints = elem[':constraints'] || {};
    const res = Constraints.dataType(constraints[':dataType'] || 'string', value);
    if (res.valid) {
      const invalidConstraint = Object.entries(constraints).find(([key, restriction]) => {
        let x = key.replace(/^:/, '');
        if (x in Constraints && x !== 'dataType' && typeof (Constraints as any)[x] === 'function') {
          return !((Constraints as any)[x](restriction, res.value).valid);
        } else if (x !== 'dataType') {
          console.error('invalid constraint ' + key);
          return false;
        }
      });
      if (invalidConstraint != null) {
        res.valid = false;
        constraint = invalidConstraint[0];
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
      ':valid' : valid,
      ':value' : value,
      ':errorMessage' : ''
    };
    if (!valid) {
      console.log(`${constraint} validation failed for ${this.id} with value ${value}`);
      elem[':errorMessage'] = this.getErrorMessage(constraint as keyof ConstraintsMessages);
    } else {
      elem[':value'] = value;
      elem[':errorMessage'] = '';
      //todo : make it conditional based on valid flag
    }
    return elem;
  }

  protected handleValueChange(payload: any) {
    if (payload !== undefined) {
      //todo : set empty string to `empty` value
      return this.checkInput(payload != null ? payload.toString() : undefined);
    }
    return {};
  }

  controller() {
    return this._controller;
  }
}

export default Field;
