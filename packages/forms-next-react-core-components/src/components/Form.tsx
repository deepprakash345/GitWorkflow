import { Flex } from '@adobe/react-spectrum';
import React, {useContext} from 'react';
import {renderChildren} from '../react-mapper/utils';
import formContext from '../react-mapper/FormContext';
import {FormJson} from '@adobe/forms-next-core';

const Form = function (props: { formJson: FormJson }) {
    const { formJson} = props;
    return (
            <form>
                <Flex direction="column" width="size-4000" gap="size-100">
                    {renderChildren(formJson, useContext(formContext).mappings)}
                </Flex>
            </form>
    );
};

export default Form;