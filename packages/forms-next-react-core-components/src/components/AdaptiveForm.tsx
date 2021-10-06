import React, { JSXElementConstructor, useEffect} from 'react';
import {renderChildren} from '../react-mapper/utils';
import FormContext from '../react-mapper/FormContext';
import {createFormInstance} from '@adobe/forms-next-core/lib';
import {jsonString} from '@adobe/forms-next-core/lib/utils/JsonUtils';
import {callbackFn, Controller, CustomEvent} from '@adobe/forms-next-core/lib/controller/Controller';
import {FormJson} from '@adobe/forms-next-core';

type customEventHandlers = {
    [key: string]: callbackFn;
}

type AdaptiveFormProps = customEventHandlers & {
    formJson: FormJson,
    mappings: {[key:string]:JSXElementConstructor<any>}
}

const AdaptiveForm = function (props: AdaptiveFormProps) {
    const { formJson, mappings} = props;
    let [controller, setController] = React.useState<Controller|undefined>(undefined);
    const createForm = async (json: string) => {
        try {
            const data = JSON.parse(json);
            const controller = await createFormInstance(data);
            Object.keys(props)
                .map((propKey) => {
                    if (propKey.startsWith('on') && typeof props[propKey] === 'function') {
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
        }
    };
    useEffect(() => {
        createForm(jsonString(formJson));
    }, [formJson]);
    return (
            <FormContext.Provider value={{mappings: mappings, controller: controller}}>
                {(controller?.getState() !== undefined) ? (
                <form>
                    {renderChildren(controller?.getState(), mappings)}
                </form>
                ) : 'Loading Form...'}
            </FormContext.Provider>

    );
};

export default AdaptiveForm;