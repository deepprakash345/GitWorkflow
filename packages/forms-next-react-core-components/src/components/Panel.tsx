import { Flex } from '@adobe/react-spectrum';
import {FieldsetJson} from '@adobe/forms-next-core';
import formContext from '../react-mapper/FormContext';
import React, {useContext} from 'react';
import {renderChildren} from '../react-mapper/utils';
const Panel = function (props: FieldsetJson) {
    return (
        <Flex direction="column" width="size-2000" gap="size-100">
            {renderChildren(props, useContext(formContext).mappings)}
        </Flex>);
};

export default Panel;