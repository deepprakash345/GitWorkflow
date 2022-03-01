import { TextField, TextArea } from '@adobe/react-spectrum';
import {FieldJson, State} from '@aemforms/crispr-core';
import React from 'react';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor,
    stringConstraintConvertor, withErrorMessage
} from '../utils/SpectrumMappers';
import {useRenderer} from '@aemforms/crispr-react-bindings';

const mapper = combineConvertors(baseConvertor,
    fieldConvertor,
    constraintConvertor,
    stringConstraintConvertor, (a, b) => {
        return {width: '100%'};
    });

const TextFieldComponent = function (props: State<FieldJson>) {
    const component = props[':type'] === 'multiline-input' ? TextArea : TextField;
    const renderedComponent = useRenderer(props, component, mapper, true);
    return renderedComponent;
};

export default TextFieldComponent;