import { Button } from '@adobe/react-spectrum';
import React from 'react';
import {useRuleEngine} from '../react-mapper/hooks';
import {FieldJson} from '@adobe/forms-next-core';

const ButtonComp = function (originalProps: FieldJson) {
    const [props, handlers] = useRuleEngine<FieldJson, any>(originalProps);
    return (<Button variant="primary" onPress={() => {
        handlers.dispatchClick();
    }}>{props.title}</Button>);
};

export default ButtonComp;