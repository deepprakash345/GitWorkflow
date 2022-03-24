import Container from './Container';
import {ContainerModel, FieldJson, FieldModel, FieldsetJson, FieldsetModel, FormModel} from './types';
import Field from './Field';
import FileUpload from './FileUpload';
import {isCheckbox, isCheckboxGroup, isFile} from './utils/JsonUtils';
import {ExecuteRule, Initialize} from './controller/Controller';
import Form from './Form';
import Checkbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';

/**
 * Creates a child model inside the given parent
 * @param child
 * @param options
 * @private
 */
export const createChild = (child: FieldsetJson | FieldJson, options: {form: FormModel, parent: ContainerModel}) => {
  let retVal: FieldsetModel | FieldModel;
  if ('items' in child) {
    retVal = new Fieldset(child as FieldsetJson, options);
  } else {
    if (isFile(child) || child.fieldType === 'file-input') {
      // @ts-ignore
      retVal = new FileUpload(child as FieldJson, options);
    } else if (isCheckbox(child)) {
      retVal = new Checkbox(child, options);
    } else if (isCheckboxGroup(child)) {
      retVal = new CheckboxGroup(child, options);
    } else  {
      retVal = new Field(child as FieldJson, options);
    }
  }
  (options.form as Form).fieldAdded(retVal);
  return retVal;
};

const defaults = {
  visible: true
};

/**
 * Defines a field set class which extends from {@link Container | container}
 */
export class Fieldset extends Container<FieldsetJson> implements FieldsetModel {

  /**
   * @param params
   * @param _options
   * @private
   */
  public constructor (params: FieldsetJson, _options: {form: FormModel, parent: ContainerModel}) {
    super(params, _options);
    this._applyDefaults();
    this.queueEvent(new Initialize());
    this.queueEvent(new ExecuteRule());
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

  // @ts-ignore
  protected _createChild(child: FieldsetJson | FieldJson, options: any): FieldModel | FieldsetModel {
    const {parent = this} = options;
    return createChild(child, {form: this.form, parent: parent});
  }

  get items() {
    return super.items;
  }

  get value() {
    return null;
  }
}
