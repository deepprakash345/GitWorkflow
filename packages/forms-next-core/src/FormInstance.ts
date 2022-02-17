import Form from './Form';
import {jsonString} from './utils/JsonUtils';
import {request} from './utils/Fetch';
import RuleEngine from './rules/RuleEngine';
import {FormModel} from './types';

/**
 * Creates form instance using form model definition as per `crispr form specification`
 * @param formModel form model definition
 * @returns {@link FormModel | form model}
 */
export const createFormInstance = (formModel: any): FormModel => {
    try {
        let f = new Form({...formModel}, new RuleEngine());
        let formData = formModel?.data;
        if (formData) {
            f.importData(formData);
        }
        // Once the field or panel is initialized, execute the initialization script
        // this means initialization happens after prefill and restore
        // Before execution of calcExp, visibleExp, enabledExp, validate, options, navigationChange, we execute init script
        //f.queueEvent(new Initialize(undefined, true));
        //f.queueEvent(new ExecuteRule(undefined, true));
        f.getEventQueue().runPendingQueue();
        return f;
    } catch (e: any) {
        throw new Error(e);
    }
};


/**
 * Validates Form model definition with the given data
 * @param formModel     form model definition
 * @param data          form data
 * @returns `true`, if form is valid against the given form data, `false` otherwise
 */
export const validateFormInstance = (formModel: any, data: any): boolean => {
    try {
        let f = new Form({...formModel}, new RuleEngine());
        if (data) {
            f.importData(data);
        }
        return f.validate().length === 0;
    } catch (e: any) {
        throw new Error(e);
    }
};

/**
 * Helper API to fetch form model definition from an AEM instance
 * @param url       URL of the instance
 * @param headers   HTTP headers to pass to the aem instance
 * @returns promise which resolves to the form model definition
 */
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