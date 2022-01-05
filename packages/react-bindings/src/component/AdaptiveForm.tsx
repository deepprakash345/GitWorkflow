import React, {JSXElementConstructor, useEffect, useState} from 'react';
import FormContext from './FormContext';
import {createFormInstance, FormModel} from '@aemforms/forms-next-core/lib';
import {FormJson} from '@aemforms/forms-next-core';
import {IntlConfig, defineMessages, IntlProvider} from 'react-intl';
// quarry intl is not working with react-intl formatMessage
import {getTranslationMessages} from './i18n';
import {renderChildren} from '../renderChildren';

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

type AdaptiveFormProps = customEventHandlers & TranslationConfigWithAllMessages & {
    formJson: FormJson,
    mappings: {[key:string]:JSXElementConstructor<any>}
}

const AdaptiveForm = function (props: AdaptiveFormProps) {
    const { formJson, mappings, locale, localizationMessages, onInitialize} = props;
    const [state, setState] = useState<{ model: FormModel, id: string } | null>(null);
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
    if (locale) {
        localizationMessagesProp = localeDictJson?.[locale];
    }
    useEffect(() => {
        const form = createFormInstance(formJson);
        if (typeof onInitialize === 'function') {
            onInitialize({
                type : 'initialize',
                target: form
            });
        }
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
    const formState = state?.model?.getState();
    return (
        state && formState ?
            (<FormContext.Provider value={{mappings, form: state.model, modelId: state.id}}>
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