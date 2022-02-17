import { Flex } from '@adobe/react-spectrum';
import {FieldsetJson} from '@aemforms/crispr-core';
import React, {useContext} from 'react';

import {useRuleEngine, renderChildren, FormContext} from '@aemforms/crispr-react-bindings';
import {State} from '@aemforms/crispr-core/lib';

const Panel = function (fieldset: State<FieldsetJson>) {
    const context = useContext(FormContext);
    const [props, handlers] = useRuleEngine(fieldset);

    if (props.visible) {
        return (<Flex direction="column" width="300px" gap="10px">
            {renderChildren(props, context.mappings, context.modelId, handlers)}
        </Flex>);
    } else {
        return null;
    }
};

export default Panel;