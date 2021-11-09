import Container from './Container';
import {ContainerModel, FieldJson, FieldModel, FieldsetJson, FieldsetModel, FormModel} from './types';
import Field from './Field';

export const createChild = (child: FieldsetJson | FieldJson, form: FormModel, options: {index: number, parent: ContainerModel}) => {
  let retVal: Fieldset | Field;
  if ('items' in child) {
    retVal = new Fieldset(child as FieldsetJson, form, options);
  } else {
    retVal = new Field(child as FieldJson, form, options);
  }
  return retVal;
};

const defaults = {
  visible: true
};

export class Fieldset extends Container<FieldsetJson> implements FieldsetModel {

  private _controller;

  public constructor (params: FieldsetJson, private _form: FormModel, private _options: {parent: ContainerModel}) {
    super(params);
    this.initialize();
    this._applyDefaults();
    this._controller = this._form.createController(this);
  }

  get index() {
    return this._jsonModel.index || 0;
  }

  set index(n: number) {
    this._jsonModel.index = n;
  }

  get parent() {
    return this._options.parent;
  }

  get dataRef() {
    return this._jsonModel.dataRef;
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

  protected _createChild(child: FieldsetJson | FieldJson, options: any): FieldModel | FieldsetModel {
    return createChild(child, this.form, options);
  }

  get name () {
    return this.getP('name', '');
  }

  get controller() {
    return this._controller;
  }

  get items() {
    if (this._hasDynamicItems()) {
      this.ruleEngine.trackDependency(this);
    }
    return super.items;
  }
}
