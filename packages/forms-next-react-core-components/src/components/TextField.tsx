import { TextField, TextArea } from '@adobe/react-spectrum';
import {FieldJson} from '@adobe/forms-next-core';
import React from 'react';
import {useRenderer} from '../react-mapper/hooks';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor,
    stringConstraintConvertor
} from '../utils/SpectrumMappers';

const mapper = combineConvertors(baseConvertor,
    fieldConvertor,
    constraintConvertor,
    stringConstraintConvertor, (a, b) => {
        return {width: '300px'};
    });

const TextFieldComponent = function (props: FieldJson) {
    const renderedComponent = useRenderer(props, mapper, props.viewType === 'multiline-input' ? TextArea : TextField);
    return renderedComponent;
};

export default TextFieldComponent;