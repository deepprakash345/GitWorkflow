import { Flex } from '@adobe/react-spectrum';
import {FieldsetJson} from '@adobe/forms-next-core';
import formContext from '../react-mapper/FormContext';
import React, {useContext} from 'react';
import {renderChildren, renderIfVisible} from '../react-mapper/utils';
import {useRuleEngine} from '../react-mapper/hooks';
const Panel = function (originalProps: FieldsetJson) {
    const mappings = useContext(formContext).mappings;
    const [props] = useRuleEngine<FieldsetJson, string>(originalProps);

    return renderIfVisible(props,(<Flex direction="column" width="300px" gap="10px">
                {renderChildren(props, mappings)}
            </Flex>));
};

export default Panel;