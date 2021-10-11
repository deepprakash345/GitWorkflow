import { RadioGroup, Radio } from '@adobe/react-spectrum';
import {FieldJson} from '@adobe/forms-next-core';
import React from 'react';
import {useRenderer} from '../react-mapper/hooks';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor,
    enumToChildConvertor
} from '../utils/SpectrumMappers';

const mapper = combineConvertors(baseConvertor, constraintConvertor, fieldConvertor, enumToChildConvertor(Radio));

const RadioGroupComponent = function (props: FieldJson) {
    return useRenderer(props, mapper, RadioGroup);
};


export default RadioGroupComponent;