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

import React, {JSXElementConstructor, useEffect, useState} from 'react';
import FormContext from './FormContext';
import {Action, checkIfKeyAdded, createFormInstance, FieldJson, FormModel, jsonString} from '@adobe/aem-forms-af-core';
import {FormJson} from '@adobe/aem-forms-af-core';
import {IntlConfig, defineMessages, IntlProvider} from 'react-intl';
// quarry intl is not working with react-intl formatMessage
import {getTranslationMessages} from './i18n';
import {renderChildren} from '../renderChildren';
// @ts-ignore
import packageJson from '../../package.json';
import {useAdoption} from '@quarry/eim-provider';
import afLocalizationJson from '../i18n.json';
import {ChangePayload} from '@adobe/aem-forms-af-core';
import {usePrevious} from '../hooks';

/**
 * The minimum set of translation config that contains messages for all supported locales.
 */
type TranslationConfigWithAllMessages = {
    /** Locale */
    locale?: string;
    /** Messages for all supported locales */
    localizationMessages?: Record<string, IntlConfig['messages']>;
}

type customEventHandlers = {
    [key: string]: any;
}

type InitializeAction = Action & {
    type: 'initialize',
    target: FormModel
}

type FieldChanged = Action & {
    target: FormModel,
    type: 'fieldChanged',
    payload: {
        field: FieldJson,
        changes: ChangePayload
    }
}

type Submit = Action & {
    target: FormModel,
    type: 'submit'
}

type AdaptiveFormProps = customEventHandlers & TranslationConfigWithAllMessages & {
    formJson: FormJson,
    onInitialize?: (a: InitializeAction) => any
    onFieldChanged?: (a: FieldChanged) => any
    onSubmit?: (a:Submit) => any
    /** {@link Field.id | field name} to set focus on **/
    focusOn?: string
    mappings: {[key:string]:JSXElementConstructor<any>}
}

const AdaptiveForm = function (props: AdaptiveFormProps) {
    const { formJson, mappings, locale, localizationMessages, onInitialize, focusOn} = props;
    const [state, setState] = useState<{ model: FormModel, id: string } | null>(null);
    //  this gets updated to new value on every rerender.
    //  using JSON.stringify to convert object to string and storing it in usePrevious
    const prevFormJsonStr = usePrevious(jsonString(formJson));
    const [refMap] = useState<any>({});
    if (localizationMessages) {
        // not using useMemo hook because createForm call is already optimized
        // any expensive react operation should generally be inside useMemo
        // todo: the input to defineMessages react-intl API could come from a restful end point
        defineMessages(getTranslationMessages(formJson));
    }
    let localeDictJson = localizationMessages;
    let localizationMessagesProp;
    if (typeof localizationMessages === 'string') {
        try {
            // if messages are in incorrect format, just log an error
            localeDictJson = JSON.parse(localizationMessages);
        } catch(ex) {
            console.log('Translation messages are in incorrect format');
            localeDictJson = localizationMessages;
        }
    }
    let afLocalization: any = {...afLocalizationJson};
    if (locale) {
        localizationMessagesProp = localeDictJson?.[locale];
        if (localizationMessagesProp) {
            afLocalization = afLocalization?.[locale] || {};
            localizationMessagesProp = {...localizationMessagesProp, ...afLocalization};
         }
    }
    // this logs event only if used inside unified shell
    // name aligns to the string used in quarry external docs
    useAdoption({name: '@aemforms/adaptive-form', version: packageJson.version});
    useEffect(() => {
        // @ts-ignore
        let prevFormJson = prevFormJsonStr ? JSON.parse(prevFormJsonStr) : undefined;
        const isOnlyDataAdded = checkIfKeyAdded(formJson, prevFormJson, 'data');
        // useEffect gets called even if there is no change in formJson, hence adding an explicit check here
        // @ts-ignore
        const shouldNewModelBeCreated = ((isOnlyDataAdded && jsonString(formJson?.data) !== jsonString(prevFormJson?.data)) || !isOnlyDataAdded);
        // @ts-ignore
        const form = shouldNewModelBeCreated ? createFormInstance(formJson, ()=>{}, 'error', isOnlyDataAdded ? state?.model: null) : state?.model;
        if (typeof onInitialize === 'function') {
            onInitialize({
                type : 'initialize',
                // @ts-ignore
                target: form,
                payload: undefined,
                metadata: undefined,
                isCustomEvent: false
            });
        }
        if (!isOnlyDataAdded) {
            // initialize all the event handlers
            Object.keys(props)
                .map((propKey) => {
                        if (propKey.startsWith('on') && propKey !== 'onInitialize' && typeof props[propKey] === 'function') {
                            // get the event name from the function
                            let eventName = propKey.substring(propKey.indexOf('on') + 2);
                            eventName = eventName.charAt(0).toLowerCase() + eventName.slice(1);
                            // subscribe to the event
                            // @ts-ignore
                            form.subscribe((action) => {
                                props[propKey](action);
                            }, eventName);
                        }
                    }
                );
            // @ts-ignore
            const localState = {model: form, id: form.getUniqueId()};
            // @ts-ignore
            setState(localState);
        }
    }, [formJson]);

    if (focusOn && refMap[focusOn]) {
        refMap[focusOn].setFocus();
    }
    const formState = state?.model?.getState();

    return (
        state && formState ?
            // @ts-ignore
            (<FormContext.Provider value={{mappings, form: state.model, modelId: state.id, refMap: refMap}}>
            <IntlProvider onError={(err)=> console.log(err)} locale={locale as string} messages={localizationMessagesProp}>
                <form>
                    {formState.title ?<h2>{formState.title}</h2> : null}
                    {
                        renderChildren(formState, mappings, state.id)
                    }
                </form>
            </IntlProvider>
            </FormContext.Provider>) : <div>Loading Form</div>);
};

export default AdaptiveForm;