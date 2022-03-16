import {NumberField} from '@adobe/react-spectrum';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {FieldJson, State} from '@aemforms/forms-core';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor
} from '../utils/SpectrumMappers';
import {useRenderer} from '@aemforms/forms-super-component';

const mapper = combineConvertors(baseConvertor,
    fieldConvertor,
    constraintConvertor, (a) => {
        return {
            minValue: a.minimum,
            maxValue: a.maximum,
            step: a.step
        };
    });

const NumberComp = function (props: State<FieldJson>) {
    return useRenderer(props, NumberField, mapper, true);
};

export default NumberComp;