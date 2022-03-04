import Form, {Logger, LogLevel} from './Form';
import {jsonString} from './utils/JsonUtils';
import {request} from './utils/Fetch';
import RuleEngine from './rules/RuleEngine';
import {FormModel} from './types';
import EventQueue from "./controller/EventQueue";

/**
 * Creates form instance using form model definition as per `crispr form specification`
 * @param formModel form model definition
 * @param callback a callback that recieves the FormModel instance that gets executed before any event in the Form
 * is executed
 * @param logLevel Logging Level for the form. Setting it off will disable the logging
 * @returns {@link FormModel | form model}
 */
export const createFormInstance = (formModel: any, callback?: (f: FormModel) => any, logLevel: LogLevel = "error"): FormModel => {
    try {
        let f = new Form({...formModel}, new RuleEngine(), new EventQueue(new Logger(logLevel)), logLevel);
        let formData = formModel?.data;
        if (formData) {
            f.importData(formData);
        }
        if (typeof callback === "function") {
            callback(f)
        }
        // Once the field or panel is initialized, execute the initialization script
        // this means initialization happens after prefill and restore
        // Before execution of calcExp, visibleExp, enabledExp, validate, options, navigationChange, we execute init script
        //f.queueEvent(new Initialize(undefined, true));
        //f.queueEvent(new ExecuteRule(undefined, true));
        f.getEventQueue().runPendingQueue();
        return f;
    } catch (e: any) {
        console.error(`Unable to create an instance of the Form ${e}`)
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