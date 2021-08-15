import { TextField } from '@adobe/react-spectrum';
import { SpectrumTextFieldProps } from '@react-types/textfield';
import {FieldJson} from '@adobe/forms-next-core';
import {useRuleEngine} from '../react-mapper/hooks';

const TextFieldComponent = function (originalProps: FieldJson) {
    const [props, dispatchChange] = useRuleEngine<FieldJson, string>(originalProps);
    console.log('rendering TextField ' + props[':id'] + ' ' + props[':value']);

    const spectrumProps: SpectrumTextFieldProps = {
        placeholder: props[':placeholder'],
        value: props[':value'] as string,
        label: props[':title'],
        ...(props[':constraints'] && props[':constraints'][':required'] && {
            isRequired: true,
            necessityIndicator: 'icon'
        }),
        validationState: props[':valid'] === false ? 'invalid' : (props[':valid'] === undefined ? undefined : 'valid')
    };

    const handleChange = (val: string) => {
       dispatchChange(val);
    };

    return (
        <TextField {...spectrumProps} onChange={handleChange} />
    );
};


export default TextFieldComponent;