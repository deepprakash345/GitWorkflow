import {RadioGroup, Radio} from '@adobe/react-spectrum';
import {FieldJson, State} from '@aemforms/forms-core';
import React from 'react';
import {useRenderer} from '@aemforms/forms-super-component';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor,
    enumToChildConvertor, withErrorMessage
} from '../utils/SpectrumMappers';
const mapper = combineConvertors(baseConvertor, constraintConvertor, fieldConvertor, enumToChildConvertor(Radio));

const Comp = withErrorMessage(RadioGroup);

const RadioGroupComponent = function (props: State<FieldJson>) {
    return useRenderer(props, Comp, mapper, true);
};


export default RadioGroupComponent;