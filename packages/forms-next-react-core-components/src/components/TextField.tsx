import { TextField, TextArea } from '@adobe/react-spectrum';
import {FieldJson, State} from '@aemforms/forms-core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor,
    stringConstraintConvertor
} from '../utils/SpectrumMappers';
import {useRenderer} from '@aemforms/forms-super-component';

const mapper = combineConvertors(baseConvertor,
    fieldConvertor,
    constraintConvertor,
    stringConstraintConvertor, () => {
        return {width: '100%'};
    });

const TextFieldComponent = function (props: State<FieldJson>) {
    const component = props[':type'] === 'multiline-input' ? TextArea : TextField;
    const renderedComponent = useRenderer(props, component, mapper, true);
    return renderedComponent;
};

export default TextFieldComponent;