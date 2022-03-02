import {NumberField} from '@adobe/react-spectrum';
import React from 'react';
import {FieldJson, State} from '@aemforms/crispr-core';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor
} from '../utils/SpectrumMappers';
import {useRenderer} from '@aemforms/crispr-react-bindings';

const mapper = combineConvertors(baseConvertor,
    fieldConvertor,
    constraintConvertor, (a) => {
        return {
            minValue: a.minimum,
            maxValue: a.maximum,
            step: a.step
        }
    });

const NumberComp = function (props: State<FieldJson>) {
    return useRenderer(props, NumberField, mapper, true);
};

export default NumberComp;