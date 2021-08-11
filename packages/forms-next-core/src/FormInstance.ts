import Field from './Field';
import Form from './Form';
import Fieldset from './Fieldset';
import {getProperty} from './utils/JsonUtils';
import {Items} from './Types';

const items2Json = (items: Items<Field | Fieldset>): Items<any> => {
   return Object.fromEntries(Object.entries(items).map(([key, item]) => [key, item.json()]));
};

const mapItems = function (items: Items<any>, parentId: string = ''): Items<Field | Fieldset> {
  const newEntries = Object.entries(items).map(([key, item]) => {
    const newItem = Object.assign({}, item);
    let retVal: Field | Fieldset;
    const name = getProperty(newItem, 'name', '');
    if (name.length > 0) {
      newItem[':id'] = (parentId.length > 0 ? parentId + '.' : '') + name;
    }
    const children = getProperty(newItem, 'items', undefined);
    if (children !== undefined) {
      const newItems = mapItems(children, newItem[':id']);
      newItem[':items'] = items2Json(newItems);
      retVal = new Fieldset(newItem);
    } else {
      retVal = new Field(newItem);
    }
    return [key, retVal];
  });
  return Object.fromEntries(newEntries);
};

export const createFormInstance = (formModel: any): any => {
  const mappedItems = mapItems(getProperty(formModel, 'items', {}), '');
  formModel[':items'] = items2Json(mappedItems);
  return new Form(formModel);
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