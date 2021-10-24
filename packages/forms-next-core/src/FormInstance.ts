import Form from './Form';
import {jsonString} from './utils/JsonUtils';
import {Controller, Change, Initialize} from './controller/Controller';
import {request} from './utils/Fetch';

export const createFormInstance = async (formModel: any): Promise<Controller> => {
    let f = new Form({...formModel});
    let formData = formModel?.data;
    if (formData) {
        f.mergeDataModel(formData);
    }
    // Once the field or panel is initialized, execute the initialization script
    // this means initialization happens after prefill and restore
    // Before execution of calcExp, visibleExp, enabledExp, validate, options, navigationChange, we execute init script
    setTimeout(() => {
            f.controller()?.dispatch(new Initialize(undefined, true));
            f.controller()?.dispatch(new Change(undefined, true));
        }, 1);
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