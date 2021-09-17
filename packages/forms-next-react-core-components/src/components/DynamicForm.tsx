import { Flex } from '@adobe/react-spectrum';
import React, {useEffect} from 'react';
import {renderChildren} from '../react-mapper/utils';
import FormContext from '../react-mapper/FormContext';
import {createFormInstance} from '@adobe/forms-next-core/lib';
import {jsonString} from '@adobe/forms-next-core/lib/utils/JsonUtils';
import {Controller} from '@adobe/forms-next-core/lib/controller/Controller';

const Form = function (props: { formJson: any, mappings: any}) {
    const { formJson, mappings} = props;
    let [controller, setController] = React.useState<Controller|undefined>(undefined);
    const createForm = async (json: string) => {
        try {
            const data = JSON.parse(json);
            const controller = await createFormInstance(data);
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