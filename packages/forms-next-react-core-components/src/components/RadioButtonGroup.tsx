import {RadioGroup, Radio, TextArea, TextField} from '@adobe/react-spectrum';
import {FieldJson} from '@aemforms/forms-next-core';
import React from 'react';
import {useRenderer} from '@aemforms/forms-next-react-bindings';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor,
    enumToChildConvertor, withErrorMessage
} from '../utils/SpectrumMappers';
const mapper = combineConvertors(baseConvertor, constraintConvertor, fieldConvertor, enumToChildConvertor(Radio));

const RadioGroupComponent = function (props: FieldJson & {id: string}) {
    return useRenderer(props, RadioGroup, mapper);
};


export default RadioGroupComponent;