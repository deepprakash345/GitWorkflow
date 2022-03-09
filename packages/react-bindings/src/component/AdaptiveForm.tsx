import React, {JSXElementConstructor, useEffect, useState} from 'react';
import FormContext, {IFormContext} from './FormContext';
import {Action, createFormInstance, FieldJson, FormModel} from '@aemforms/forms-core';
import {Change, FormJson} from '@aemforms/forms-core';
import {IntlConfig, defineMessages, IntlProvider} from 'react-intl';
// quarry intl is not working with react-intl formatMessage
import {getTranslationMessages} from './i18n';
import {renderChildren} from '../renderChildren';
// @ts-ignore
import packageJson from '../../package.json';
import {useAdoption} from '@quarry/eim-provider';
import afLocalizationJson from '../i18n.json';
import {ChangePayload} from '@aemforms/forms-core';

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
    const [refMap, setRefMap] = useState<any>({});
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
        const form = createFormInstance(formJson);
        if (typeof onInitialize === 'function') {
            onInitialize({
                type : 'initialize',
                target: form,
                payload: undefined,
                metadata: undefined,
                isCustomEvent: false
            });
        }
        // initialize all the event handlers
        Object.keys(props)
            .map((propKey) => {
                    if (propKey.startsWith('on') && propKey !== 'onInitialize' && typeof props[propKey] === 'function') {
                        // get the event name from the function
                        let eventName = propKey.substring(propKey.indexOf('on') + 2);
                        eventName = eventName.charAt(0).toLowerCase() + eventName.slice(1);
                        // subscribe to the event
                        form.subscribe((action) => {
                            props[propKey](action);
                        }, eventName);
                    }
                }
            );
        const state = {model: form, id: form.getUniqueId()};
        setState(state);
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