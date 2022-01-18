import { TextField, TextArea } from '@adobe/react-spectrum';
import {FieldJson} from '@aemforms/forms-next-core';
import React from 'react';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor,
    stringConstraintConvertor
} from '../utils/SpectrumMappers';
import {useRenderer} from '@aemforms/forms-next-react-bindings';

const mapper = combineConvertors(baseConvertor,
    fieldConvertor,
    constraintConvertor,
    stringConstraintConvertor, (a, b) => {
        return {width: '300px'};
    });

const TextFieldComponent = function (props: FieldJson & {id: string}) {
    const renderedComponent = useRenderer(props, props.viewType === 'multiline-input' ? TextArea : TextField, mapper);
    return renderedComponent;
};

export default TextFieldComponent;