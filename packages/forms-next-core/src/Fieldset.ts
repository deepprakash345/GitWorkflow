import Container from './Container';
import {FieldJson, FieldModel, FieldsetJson, FieldsetModel, FormModel} from './types';
import Field from './Field';

export const createChild = (child: FieldsetJson | FieldJson, form: FormModel) => {
  let retVal: Fieldset | Field;
  if ('items' in child) {
    retVal = new Fieldset(child as FieldsetJson, form);
  } else {
    retVal = new Field(child as FieldJson, form);
  }
  return retVal;
};

const defaults = {
  visible: true
};

export class Fieldset extends Container<FieldsetJson> implements FieldsetModel {

  private _controller;

  public constructor (params: FieldsetJson, private _form: FormModel) {
    super(params);
    this.initialize();
    this._applyDefaults();
    this._controller = this._form.createController(this);
  }

  private _applyDefaults() {
    Object.entries(defaults).map(([key, value]) => {
      //@ts-ignore
      if (this._jsonModel[key] === undefined) {
        //@ts-ignore
        this._jsonModel[key] = value;
      }
    });
  }


  get ruleEngine() {
    return this._form.ruleEngine;
  }

  get form(): FormModel {
    return this._form;
  }

  get visible () {
    return this._jsonModel.visible;
  }

  protected _createChild(child: FieldsetJson | FieldJson): FieldModel | FieldsetModel {
    return createChild(child, this.form);
  }

  get name () {
    return this.getP('name', '');
  }

  get controller() {
    return this._controller;
  }
}
