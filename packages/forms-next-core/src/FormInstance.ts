import { FieldModel, FormModel} from './Types';
import Field from './Field';
import Form from './Form';
import Fieldset from './Fieldset';
import {getProperty} from './utils/JsonUtils';


const createField = function (field: FieldModel) {
  return new Field(field);
};

type Items = {
  [key: string]: any
}

const mapItems = function (items: Items, parentId: string = ''): Array<Field|Fieldset> {
  return Object.values(items).map(item => {
    const newItem = Object.assign({}, item);
    let retVal: Field | Fieldset;
    if (getProperty(newItem, 'name', undefined)) {
      newItem[':id'] = (parentId.length > 0 ? parentId + '.' : '') + getProperty(newItem, 'name', '');
    }
    if (getProperty(newItem, 'items', undefined)) {
      const newItems = mapItems(newItem.items, newItem.id);
      retVal = new Fieldset(newItems);
    } else {
      retVal = createField(newItem);
    }
    return retVal;
  });
};

export const createFormInstance = (formModel: any): FormModel => {
  return new Form(mapItems(getProperty(formModel, 'items', {}), '') );
};

declare var fetch: any;

export const fetchForm = (url: string) : Promise<string> =>  {
  return fetch(`${url}.model.json`)
      .then((response: any) => response.text()).then((data: string) => {
        const oldForm = JSON.parse(data);
        const newForm = {items: [oldForm.rootPanel]};
        return JSON.stringify(newForm, null, 2);
      });
};