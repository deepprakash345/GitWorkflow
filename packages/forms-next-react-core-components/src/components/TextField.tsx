import { TextField } from '@adobe/react-spectrum';
import { SpectrumTextFieldProps } from '@react-types/textfield';
import {FieldJson} from '@adobe/forms-next-core';
import Form from '@adobe/forms-next-core/lib/Form';
import {Change} from '@adobe/forms-next-core/lib/controller/Actions';
import {useState} from 'react';

type Mapping<T> = T & {
    mappings: any
    form: Form
}

const TextFieldComponent = function (props: Mapping<FieldJson>) {

    const spectrumProps = (props: any) => {return {
        placeholder: props[':placeholder'],
        value: props[':value'] as string,
        label: props[':title'],
        ...(props[':constraints'] && props[':constraints'][':required'] && {
            isRequired: true,
            necessityIndicator: 'icon'
        }),
        validationState: props[':valid'] === false ? 'invalid' : (props[':valid'] === undefined ? undefined : 'valid')
    };
    };

    const {form} = props;

    const [spectrumState, setSpectrumState] = useState(spectrumProps(props));

    const handleChange = (val: string) => {
        const changeAction = new Change(props[':id'] as string, val);
        form.dispatch(changeAction);
    };

    form.subscribe(props[':id'] as string, (id, x: any) => {
        setSpectrumState(spectrumProps(x));
    });

    return (
        <TextField {...spectrumState} onChange={handleChange}/>
    );
};



export default TextFieldComponent;