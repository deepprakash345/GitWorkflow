import { TextField, TextArea } from '@adobe/react-spectrum';
import {FieldJson} from '@aemforms/forms-next-core';
import React from 'react';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor,
    stringConstraintConvertor, withErrorMessage
} from '../utils/SpectrumMappers';
import {useRenderer} from '@aemforms/forms-next-react-bindings';

const mapper = combineConvertors(baseConvertor,
    fieldConvertor,
    constraintConvertor,
    stringConstraintConvertor, (a, b) => {
        return {width: '300px'};
    });

const FormTextField = withErrorMessage(TextField);
const FormTextArea = withErrorMessage(TextArea);

const TextFieldComponent = function (props: FieldJson & {id: string}) {
    const component = props.viewType === 'multiline-input' ? FormTextArea : FormTextField;
    const renderedComponent = useRenderer(props, component, mapper);
    return renderedComponent;
};

export default TextFieldComponent;