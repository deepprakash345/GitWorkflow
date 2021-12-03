import Container from './Container';
import {BaseModel, ContainerModel, FieldJson, FieldModel, FieldsetJson, FieldsetModel, FormModel} from './types';
import Field from './Field';
import FileUpload from './FileUpload';
import {isFile} from './utils/JsonUtils';
import {ActionImpl} from './controller/Controller';
import Form from './Form';
import DataGroup from './data/DataGroup';

export const createChild = (child: FieldsetJson | FieldJson, options: {form: FormModel, parent: ContainerModel}) => {
  let retVal: FieldsetModel | FieldModel;
  if ('items' in child) {
    retVal = new Fieldset(child as FieldsetJson, options);
  } else {
    if (isFile(child)) {
      // @ts-ignore
      retVal = new FileUpload(child as FieldJson, options);
    } else {
      retVal = new Field(child as FieldJson, options);
    }
  }
  (options.form as Form).fieldAdded(retVal);
  return retVal;
};

const defaults = {
  visible: true
};

export class Fieldset extends Container<FieldsetJson> implements FieldsetModel {

  public constructor (params: FieldsetJson, _options: {form: FormModel, parent: ContainerModel}) {
    super(params, _options);
    this._applyDefaults();
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

  get items() {
    return super.items;
  }

  get value() {
    return null;
  }
}
