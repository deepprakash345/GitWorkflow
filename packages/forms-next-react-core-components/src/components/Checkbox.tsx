import {Checkbox} from '@adobe/react-spectrum';
import {FieldJson} from '@adobe/forms-next-core';
import {useRenderer} from '../react-mapper/hooks';
import React from 'react';
import {baseConvertor, combineConvertors, constraintConvertor, fieldConvertor} from '../utils/SpectrumMappers';


const mapper = combineConvertors(baseConvertor, fieldConvertor, constraintConvertor, (a, b) => {
    const value = a.value;
    const selectedValue = a.constraints?.options?.[0]?.value;
    const unselectedValue = a.constraints?.options?.[1]?.value;
    return {
        selectedValue,
        unselectedValue,
        isSelected: value !== undefined && value === selectedValue
    };
});

const SpectrumCheckboxWrapper = (props: any) => {
    const handleChange = (isSelected: boolean) => {
        const value = isSelected ? props.selectedValue : props.unselectedValue;
        props.onChange(value);
    };
    return <Checkbox {...props} onChange={handleChange}>{props.label}</Checkbox>;
};


/**
 * The checkbox component follows the convention that the first value of option is used as selected value
 * while the second option is used as deselected value. Any other option value is ignored.
 * @param originalProps
 * @constructor
 */
const CheckboxComponent = function (originalProps: FieldJson) {
    return useRenderer(originalProps, mapper, SpectrumCheckboxWrapper);
};


export default CheckboxComponent;