import React, {JSXElementConstructor, useEffect} from 'react';
import {renderChildren} from '../react-mapper/utils';
import FormContext from '../react-mapper/FormContext';
import {createFormInstance} from '@aemforms/forms-next-core/lib';
import {jsonString} from '@aemforms/forms-next-core/lib/utils/JsonUtils';
import {Controller} from '@aemforms/forms-next-core/lib/controller/Controller';
import {FormJson} from '@aemforms/forms-next-core';
import {IntlConfig, defineMessages, IntlProvider} from 'react-intl';
// quarry intl is not working with react-intl formatMessage
import {getTranslationMessages} from '../utils/i18n';

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
    let [controller, setController] = React.useState<Controller|undefined>(undefined);
    const createForm = async (json: string) => {
        try {
            const data = JSON.parse(json);
            if (localizationMessages) {
                // not using useMemo hook because createForm call is already optimized
                // any expensive react operation should generally be inside useMemo
                // todo: the input to defineMessages react-intl API could come from a restful end point
                defineMessages(getTranslationMessages(data));
            }
            const controller = await createFormInstance(data);
            if (typeof onInitialize === 'function') {
                onInitialize({
                    type : 'initialize',
                    target: controller
                });
            }
            Object.keys(props)
                .map((propKey) => {
                    if (propKey.startsWith('on') && propKey !== 'onInitialize' && typeof props[propKey] === 'function') {
                            // get the event name from the function
                            let eventName = propKey.substring(propKey.indexOf('on') + 2);
                            eventName = eventName.charAt(0).toLowerCase() + eventName.slice(1);
                            // subscribe to the event
                            controller.subscribe((action) => {
                                props[propKey](action);
                            }, eventName);
                        }
                    }
                );
            setController(controller);
            // eslint-disable-next-line no-empty
        } catch (e) {
            console.error('Error while creating Form' + e);
        }
    };
    useEffect(() => {
        createForm(jsonString(formJson));
    }, [formJson]);
    const state = controller?.getState();
    let localeDictJson = localizationMessages;
    let localizationMessagesProp = undefined;
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
    // create adaptive form instance
    // by adding IntlProvider, numberField would auto format the number based on the locale
    return (
            <FormContext.Provider value={{mappings: mappings, controller: controller}}>
                <IntlProvider onError={(err)=> console.log(err)} locale={locale as string} messages={localizationMessagesProp}>
                    {(state !== undefined) ? (
                    <form>
                        {state.title ?<h2>{state.title}</h2> : null}
                        { //@ts-ignore
                            renderChildren(controller?.getState(), mappings )
                        }
                    </form>
                    ) : 'Loading Form...'}
                </IntlProvider>
            </FormContext.Provider>
    );
};

export default AdaptiveForm;