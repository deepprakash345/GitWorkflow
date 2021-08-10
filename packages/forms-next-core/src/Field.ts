import Node from './Node';
import {FieldModel} from './Types';

class Field extends Node<any> implements FieldModel {
  public constructor (params: FieldModel) {
    super(params);
    let value = this.getP('value', undefined);
    if (value === undefined) {
      this._jsonModel[':value'] = this.default; //TODO: see if we want to keep :
    }
  }

  get readOnly () {
    return this.getP('readOnly', false);
  }

  get enabled () {
    return this.getP('enabled', true);
  }

  get 'default' () {
    return this.getP('default', null);
  }

  get presence () {
    return this.getP('presence', true);
  }

  get valid () {
    return true;
  }

  public json (): FieldModel {
    return Object.assign({}, super.json(), {
      value: this.value,
      readOnly: this.readOnly,
      enabled: this.enabled,
      default: this.default,
      presence: this.presence,
      valid: this.valid
    });
  }

  get value() {
    return this.getP('value', null);
  }
}

export default Field;
