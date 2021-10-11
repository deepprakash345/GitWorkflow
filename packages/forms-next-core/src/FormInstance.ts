import Form from './Form';
import {jsonString} from './utils/JsonUtils';
import {Controller, Change, Initialize} from './controller/Controller';
import {request} from './utils/Fetch';

export const createFormInstance = async (formModel: any, options?: any): Promise<Controller> => {
    let f = new Form({...formModel});
    if (f.metaData?.dataUrl || formModel?.data) {
        // check if data is present as part of form model definition
        let formData = formModel?.data;
        try {
            // if there is data URL, fetch the form data and override the data present in the form model definition
            const data = await fetchData(f.metaData.dataUrl, options);
            formData = JSON.parse(data?.data);
        } catch (e) {
            console.log(e);
        } finally {
            if (formData) {
                f.setData(formData);
            }
        }
    }
    // Once the field or panel is initialized, execute the initialization script
    // this means initialization happens after prefill and restore
    // Before execution of calcExp, visibleExp, enabledExp, validate, options, navigationChange, we execute init script
    f.controller()?.dispatch(new Initialize(undefined, true));
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