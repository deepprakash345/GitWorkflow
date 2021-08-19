import Field from './Field';
import Form from './Form';
import Fieldset from './Fieldset';
import {getProperty} from './utils/JsonUtils';
import {FormJson, Items} from './Types';

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
    const children = getProperty(newItem, ':items', undefined);
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

export const createFormInstance = async (formModel: any): Promise<Form> => {
    const mappedItems = mapItems(getProperty(formModel, 'items', {}), '');
    formModel = {
        ...formModel,
        ':items': items2Json(mappedItems)
    };
    let f = new Form(formModel);
    if (f.metaData?.dataUrl) {
        const data = await fetchData(f.metaData.dataUrl + window.location.search);
        const formData = JSON.parse(data)[':data'];
        // if data exist, set the form data
        // todo: handle attachments, metadata later
        if (formData) {
            f.setData(JSON.parse(formData));
        }
    }
    f.executeAllRules();
    return f;
};

declare var fetch: any;

export const fetchForm = (url: string) : Promise<string> =>  {
  return fetch(`${url}.model.json`)
      .then((response: any) => response.text()).then((data: string) => {
        let formObj = JSON.parse(data);
        if ('model' in formObj) {
            const {model} = formObj;
            formObj = model;
        }
        return JSON.stringify(formObj, null, 2);
      });
};

export const submitForm = (url: string, data: any, form: Form) : Promise<string> =>  {
    // todo: add attachments and metadata later
    const formData = new FormData();
    formData.append(':data', data);
    formData.append(':contentType', 'application/json');
    const requestOptions: any = {
        method: 'POST',
        body: formData
    };

    return fetch(url, requestOptions)
        .then((response: any) => {
            // todo: trigger an error event
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((data: any) => {
            // todo: send the payload(data) to the rule grammar
            let rule = form.json()[':events']?.[':submitSuccess'];
            form._executeRule(form.json(), rule);
        })
        // todo: trigger an error event
        .catch((error: any) => console.log('error', error));
};

export const fetchData = (url: string) : Promise<string> =>  {
    // todo: add attachments and metadata later
    const requestOptions: any = {
        method: 'POST'
    };

    return fetch(url, requestOptions)
        .then((response: any) => response.text()).then((data: string) => {
            // todo: assuming that the return type is application/json
            let formData = JSON.parse(data);
            return JSON.stringify(formData, null, 2);
        })
        .catch((error: any) => console.log('error', error));
};