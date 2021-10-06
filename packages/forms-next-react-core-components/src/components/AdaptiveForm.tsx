import React, { JSXElementConstructor, useEffect} from 'react';
import {renderChildren} from '../react-mapper/utils';
import FormContext from '../react-mapper/FormContext';
import {createFormInstance} from '@adobe/forms-next-core/lib';
import {jsonString} from '@adobe/forms-next-core/lib/utils/JsonUtils';
import {callbackFn, Controller, CustomEvent} from '@adobe/forms-next-core/lib/controller/Controller';
import {FormJson} from '@adobe/forms-next-core';

type AdaptiveFormProps = {
    formJson: FormJson,
    mappings: {[key:string]:JSXElementConstructor<any>},
    onSubmit?: callbackFn,
    onCustomEvent?: callbackFn
}

const AdaptiveForm = function (props: AdaptiveFormProps) {
    const { formJson, mappings, onSubmit, onCustomEvent} = props;
    let [controller, setController] = React.useState<Controller|undefined>(undefined);
    const createForm = async (json: string) => {
        try {
            const data = JSON.parse(json);
            const controller = await createFormInstance(data);
            if (typeof onSubmit === 'function') {
                controller.subscribe((action) => {
                    onSubmit(new CustomEvent(action.type, controller.getState()[':data'], true));
                }, 'submit');
            }
            if (typeof onCustomEvent === 'function') {
                controller.subscribe((action) => {
                    onCustomEvent(action);
                }, 'customEvent');
            }
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