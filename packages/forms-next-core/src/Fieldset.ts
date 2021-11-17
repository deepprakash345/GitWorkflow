import Container from './Container';
import {ContainerModel, FieldJson, FieldModel, FieldsetJson, FieldsetModel, FormModel} from './types';
import Field from './Field';
import {FieldAdded} from './controller/Controller';

export const createChild = (child: FieldsetJson | FieldJson, options: {form: FormModel, parent: ContainerModel}) => {
  let retVal: Fieldset | Field;
  if ('items' in child) {
    retVal = new Fieldset(child as FieldsetJson, options);
  } else {
    retVal = new Field(child as FieldJson, options);
  }
  return retVal;
};

const defaults = {
  visible: true
};

export class Fieldset extends Container<FieldsetJson> implements FieldsetModel {

  private _controller;

  public constructor (params: FieldsetJson, _options: {form: FormModel, parent: ContainerModel}) {
    super(params, _options);
    this.initialize();
    this._applyDefaults();
    this._controller = _options.form.createController(this);
    this.form.controller.dispatch(new FieldAdded(this));
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

  get type() {
    const ret = super.type;
    if (ret === 'array' || ret === 'object') {
      return ret;
    }
    return undefined;
  }

  protected _createChild(child: FieldsetJson | FieldJson): FieldModel | FieldsetModel {
    return createChild(child, {form: this.form, parent: this});
  }

  get controller() {
    return this._controller;
  }

  get items() {

    return super.items;
  }
}
