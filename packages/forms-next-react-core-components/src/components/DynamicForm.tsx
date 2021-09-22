import { Flex } from '@adobe/react-spectrum';
import React, {FormEventHandler, JSXElementConstructor, useEffect} from 'react';
import {renderChildren} from '../react-mapper/utils';
import FormContext from '../react-mapper/FormContext';
import {createFormInstance} from '@adobe/forms-next-core/lib';
import {jsonString} from '@adobe/forms-next-core/lib/utils/JsonUtils';
import {Controller} from '@adobe/forms-next-core/lib/controller/Controller';
import {FormJson} from '@adobe/forms-next-core';

const Form = function (props: { formJson: FormJson, mappings: {[key:string]:JSXElementConstructor<any>}, onSubmit?: FormEventHandler, onCustomEvent?: FormEventHandler}) {
    const { formJson, mappings, onSubmit, onCustomEvent} = props;
    let [controller, setController] = React.useState<Controller|undefined>(undefined);
    const createForm = async (json: string) => {
        try {
            const data = JSON.parse(json);
            const controller = await createFormInstance(data);
            if (typeof onSubmit === 'function') {
                // todo: have to fix this, support for subscribing events needs to be different than model update
                controller.subscribe('submit', () => {
                    onSubmit(controller.getState()[':data']);
                });
            }
            // todo: have to handle custom events in trigger API in Form.ts later
            if (typeof onCustomEvent === 'function') {
                controller.subscribe('customEvent', () => {
                    onCustomEvent(controller.getState()[':data']);
                });
            }
            setController(controller);
            // eslint-disable-next-line no-empty
        } catch (e) {
        }
    };
    useEffect(() => {
        createForm(jsonString(formJson));
    }, []);
    return (
            <FormContext.Provider value={{mappings: mappings, controller: controller}}>
                <form>
                    {(controller?.getState() !== undefined) ? (
                    <Flex direction="column" width="size-4000" gap="size-100">
                            {renderChildren(controller?.getState(), mappings)}
                    </Flex>
                    ) : 'Loading Form...'}
                </form>
            </FormContext.Provider>

    );
};

export default Form;