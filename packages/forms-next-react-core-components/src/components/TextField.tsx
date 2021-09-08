import { TextField } from '@adobe/react-spectrum';
import {FieldJson} from '@adobe/forms-next-core';
import React from 'react';
import {Handlers, useRenderer} from '../react-mapper/hooks';
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
    stringConstraintConvertor);

const TextFieldComponent = function (props: FieldJson) {
    const renderedComponent = useRenderer(props, mapper, TextField);
    return renderedComponent;
};

export default TextFieldComponent;