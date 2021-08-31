import Form from './Form';
import {jsonString} from './utils/JsonUtils';

export const createFormInstance = async (formModel: any, options?: any): Promise<Form> => {
    let f = new Form({...formModel});
    if (f.metaData?.dataUrl) {
        let formData;
        try {
            const data = await fetchData(f.metaData.dataUrl, options);
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