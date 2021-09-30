import Form from './Form';
import {jsonString} from './utils/JsonUtils';
import {Controller, Change} from './controller/Controller';
import {request} from './utils/Fetch';

export const createFormInstance = async (formModel: any, options?: any): Promise<Controller> => {
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
    f.controller()?.dispatch(new Change(undefined, true));
    return f.controller();
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

const fetchData = (url: string, data?: any) => {
    return request(url, data, {
        method: 'POST'
    });
};