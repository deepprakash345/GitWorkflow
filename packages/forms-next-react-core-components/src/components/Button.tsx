import { Button } from '@adobe/react-spectrum';
import React from 'react';
import {useRuleEngine} from '../react-mapper/hooks';
import {FieldJson} from '@adobe/forms-next-core';
import {useIntl} from 'react-intl';
import {translateMessage} from '../utils/SpectrumMappers';

const ButtonComp = function (originalProps: FieldJson) {
    const [props, handlers] = useRuleEngine<FieldJson, any>(originalProps);
    const { formatMessage } = useIntl();
    const formatMsg = translateMessage(props, formatMessage);
    return (<Button variant="primary" onPress={() => {
        handlers.dispatchClick();
    }}>{formatMsg('title')}</Button>);
};

export default ButtonComp;