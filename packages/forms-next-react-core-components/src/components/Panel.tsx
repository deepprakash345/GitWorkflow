import { Flex } from '@adobe/react-spectrum';
import {FieldsetJson} from '@aemforms/forms-next-core';
import formContext from '../react-mapper/FormContext';
import React, {useContext} from 'react';
import {renderChildren} from '../react-mapper/utils';
import {useRuleEngine} from '../react-mapper/hooks';

const Panel = function (fieldset: FieldsetJson & {id :string}) {
    const mappings = useContext(formContext).mappings;
    const [props, handlers] = useRuleEngine(fieldset);

    if (props.visible) {
        return (<Flex direction="column" width="300px" gap="10px">
            {renderChildren(props, mappings, handlers)}
        </Flex>);
    } else {
        return null;
    }
};

export default Panel;