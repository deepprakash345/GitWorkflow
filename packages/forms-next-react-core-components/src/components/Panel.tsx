import { Flex } from '@adobe/react-spectrum';
import {FieldsetJson} from '@aemforms/forms-next-core';
import React, {useContext} from 'react';

import {useRuleEngine, renderChildren, FormContext} from '@aemforms/forms-next-react-bindings';

const Panel = function (fieldset: FieldsetJson & {id :string}) {
    const mappings = useContext(FormContext).mappings;
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