import { TextField } from '@adobe/react-spectrum';
import { SpectrumTextFieldProps } from '@react-types/textfield';
import {FieldJson} from '@adobe/forms-next-core';
import {useRuleEngine} from '../react-mapper/hooks';
import React from 'react';
import {renderIfVisible} from '../react-mapper/utils';
const TextFieldComponent = function (originalProps: FieldJson) {
    const [props, dispatchChange] = useRuleEngine<FieldJson, string>(originalProps);
    console.log('rendering TextField ' + props[':id'] + ' ' + props[':value']);

    const spectrumMapper: SpectrumTextFieldProps = {
        name: props[':name'],
        placeholder: props[':placeholder'],
        value: props[':value'] as string,
        label: props[':hideTitle'] === true ? '' :props[':title'],
        ...(props[':constraints'] && props[':constraints'][':required'] && {
            isRequired: true,
            necessityIndicator: 'icon'
        }),
        validationState: props[':valid'] === false ? 'invalid' : (props[':valid'] === undefined ? undefined : 'valid'),
        onChange : dispatchChange
    };

    return renderIfVisible(props, <TextField {...spectrumMapper} />);
};


export default TextFieldComponent;