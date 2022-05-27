/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

import Form, {Logger, LogLevel} from './Form';
import {jsonString} from './utils/JsonUtils';
import {request} from './utils/Fetch';
import RuleEngine from './rules/RuleEngine';
import {FormModel} from './types';
import EventQueue from './controller/EventQueue';

/**
 * Creates form instance using form model definition as per `adaptive form specification`
 * @param formModel form model definition
 * @param callback a callback that recieves the FormModel instance that gets executed before any event in the Form
 * is executed
 * @param logLevel Logging Level for the form. Setting it off will disable the logging
 * @param fModel existing form model, this is additional optimization to prevent creation of form instance
 * @returns {@link FormModel | form model}
 */
export const createFormInstance = (formModel: any, callback?: (f: FormModel) => any, logLevel: LogLevel = 'error', fModel: any = undefined): FormModel => {
    try {
        let f = fModel;
        if (f == null) {
            f = new Form({...formModel}, new RuleEngine(), new EventQueue(new Logger(logLevel)), logLevel);
        }
        const formData = formModel?.data;
        if (formData) {
            f.importData(formData);
        }
        if (typeof callback === 'function') {
            callback(f);
        }
        // Once the field or panel is initialized, execute the initialization script
        // this means initialization happens after prefill and restore
        // Before execution of calcExp, visibleExp, enabledExp, validate, options, navigationChange, we execute init script
        //f.queueEvent(new Initialize(undefined, true));
        //f.queueEvent(new ExecuteRule(undefined, true));
        f.getEventQueue().runPendingQueue();
        return f;
    } catch (e: any) {
        console.error(`Unable to create an instance of the Form ${e}`);
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
        const f = new Form({...formModel}, new RuleEngine());
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
    const headerObj = new Headers();
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