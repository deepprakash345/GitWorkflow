import Field from './Field';
import Form from './Form';
import Fieldset from './Fieldset';
import {getProperty, jsonString} from './utils/JsonUtils';
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

type FormData = {
    ':data' : any
}

export const createFormInstance = async (formModel: any, options?: any): Promise<Form> => {
    const mappedItems = mapItems(getProperty(formModel, 'items', {}), '');
    formModel = {
        ...formModel,
        ':items': items2Json(mappedItems),
        ':id' : '$form'
    };
    let f = new Form(formModel);
    if (f.metaData?.dataUrl) {
        let formData;
        try {
            const data: FormData = await fetchData(f.metaData.dataUrl, options);
            formData = JSON.parse(data?.[':data']);
        } catch (e) {
            console.log(e);
            formData = null;
        } finally {
            if (formData) {
                f.setData(formData);
            }
        }
    }
    f.executeAllRules();
    return f;
};

declare var fetch: any;

export const fetchForm = (url: string) : Promise<string> =>  {
  return request(`${url}.model.json`).then((formObj : any) => {
          if ('model' in formObj) {
              const {model} = formObj;
              formObj = model;
          }
          return jsonString(formObj);
    });
};

export type RequestOptions = {
    contentType ?: string,
    method: 'POST' | 'GET'
}

const defaultRequestOptions: RequestOptions = {
    method: 'GET'
};

export const request = (url: string, data: any = null, options: RequestOptions = defaultRequestOptions) => {
    return fetch(url, {
        ...options,
        body: data
    }).then((response: Response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
};

const fetchData = (url: string, data?: any) =>  {
    return request(url, data, {
        method: 'POST'
    });
};