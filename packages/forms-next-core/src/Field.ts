import Node from './Node';
import { FieldModel } from './Types';

class Field extends Node<FieldModel> {
  public constructor (params: FieldModel) {
    super(params);
    if (this._jsonModel.value === undefined) {
      this._jsonModel.value = this.default;
    }
  }

  public get value () : string | number | null {
    return this._jsonModel.value || null;
  }

  get readOnly () {
    return this._jsonModel.readOnly || false;
  }

  get enabled () {
    return this._jsonModel.enabled || true;
  }

  get 'default' () {
    return this._jsonModel.default;
  }

  get presence () {
    return this._jsonModel.presence || true;
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
}

export default Field;
