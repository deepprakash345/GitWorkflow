import { TextField } from '@adobe/react-spectrum';
import { SpectrumTextFieldProps } from '@react-types/textfield';
import {FieldJson} from '@adobe/forms-next-core';
const TextFieldComponent = function (props: FieldJson) {

    const spectrumProps: SpectrumTextFieldProps = {
        placeholder: props[':placeholder'],
        value: props[':value'] as string,
        label: props[':title'],
        ...(props[':constraints'][':required'] && { isRequired: true, necessityIndicator: 'icon' }),
        validationState: props[':valid'] === false ? 'invalid' : (props[':valid'] === undefined ? undefined : 'valid')
    };

    return (
        <TextField {...spectrumProps} />
    );
};



export default TextFieldComponent;