import Form from './Form';
import {jsonString} from './utils/JsonUtils';
import {ExecuteRule, Initialize} from './controller/Controller';
import {request} from './utils/Fetch';
import RuleEngine from './rules/RuleEngine';
import {FormModel} from './types';

export const createFormInstance = (formModel: any): Promise<FormModel> => {
    try {
        let f = new Form({...formModel}, new RuleEngine());
        let formData = formModel?.data;
        if (formData) {
            f.importData(formData);
        }
        // Once the field or panel is initialized, execute the initialization script
        // this means initialization happens after prefill and restore
        // Before execution of calcExp, visibleExp, enabledExp, validate, options, navigationChange, we execute init script
        f.dispatch(new Initialize(undefined, true));
        f.dispatch(new ExecuteRule(undefined, true));
        return Promise.resolve(f);
    } catch (e: any) {
        return Promise.reject(new Error(e));
    }
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