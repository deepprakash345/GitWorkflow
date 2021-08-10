import { TextField } from '@adobe/react-spectrum';
import { SpectrumTextFieldProps } from '@react-types/textfield';
import { FieldModel } from '@adobe/forms-next-core';
import { StringConstraints } from '@adobe/forms-next-core';
const TextFieldComponent = function (props: FieldModel) {

    const { id, name, value,
        readOnly, enabled,
        title, constraints, valid, placeholder
    } = props;

    const { required, minLength, maxLength } = constraints as StringConstraints;

    const spectrumProps: SpectrumTextFieldProps = {
        placeholder,
        value: value as string,
        label: title,
        ...(required && { isRequired: true, necessityIndicator: 'icon' }),
        validationState: valid === false ? 'invalid' : (valid === undefined ? undefined : 'valid')
    };

    return (
        <TextField {...spectrumProps} />
    );
};



export default TextFieldComponent;