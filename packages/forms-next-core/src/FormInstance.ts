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

export const request = (url: string, data: any = null, options: RequestOptions = {}) => {
    const opts = {...defaultRequestOptions, ...options};
    return fetch(url, {
        ...opts,
        body: data
    }).then((response: Response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
};

export const fetchForm = (url: string, headers: any = {}): Promise<string> => {
    let headerObj = new Headers();
    Object.entries(headers).forEach(([key, value]) => {
        headerObj.append(key, value as string);
    });
    return request(`${url}.model.json`, null, {headers}).then((formObj: any) => {
        if ('model' in formObj) {
            const {model} = formObj;
            formObj = model;
        }
        return jsonString(formObj);
    });
};

export type RequestOptions = {
    contentType?: string,
    method?: 'POST' | 'GET',
    headers?: any,
    mode?: string
};


const defaultRequestOptions: RequestOptions = {
    method: 'GET'
};


const fetchData = (url: string, data?: any) => {
    return request(url, data, {
        method: 'POST'
    });
};