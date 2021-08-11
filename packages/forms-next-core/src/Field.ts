import Node from './Node';
import {FieldJson, FieldModel} from './Types';
import {filterProps, undefinedValueFilter} from './utils/JsonUtils';


class Field extends Node<FieldJson> implements FieldModel {
  public constructor (params: FieldJson) {
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
    return this.getP('default', undefined);
  }

  get presence () {
    return this.getP('presence', true);
  }

  get valid () {
    return undefined;
  }

  public json (): FieldJson {
    return filterProps(Object.assign({}, super.json(), {
      ':value': this.value,
      ':readOnly': this.readOnly,
      ':enabled': this.enabled,
      ':default': this.default,
      ':presence': this.presence,
      ':valid': this.valid
      // eslint-disable-next-line no-unused-vars
    }), undefinedValueFilter);
  }

  get value() {
    return this.getP('value', null);
  }
}

export default Field;
