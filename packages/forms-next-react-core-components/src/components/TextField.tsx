import { TextField } from '@adobe/react-spectrum';
import { FieldModel } from '@adobe/forms-next-core';
import { SpectrumTextFieldProps } from '@react-types/textfield';
import { StringConstraints } from '@adobe/forms-next-core';
const TextFieldComponent = function (props: FieldModel) {

    const { id, name, value,
        readOnly, enabled,
        title, constraints, valid
    } = props;

    const { required, minLength, maxLength } = constraints as StringConstraints;

    const spectrumProps: SpectrumTextFieldProps = {
        value: value as string,
        label: title,
        ...(required && { isRequired: true, necessityIndicator: 'icon' }),
        validationState: valid ? 'valid' : 'invalid'
    };

    return (
        <TextField {...spectrumProps} />
    );
};



export default TextFieldComponent;