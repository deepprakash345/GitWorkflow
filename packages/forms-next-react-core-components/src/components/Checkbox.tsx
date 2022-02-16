import {Checkbox, ComboBox} from '@adobe/react-spectrum';
import {FieldJson} from '@aemforms/crispr-core';
import {useRenderer} from '@aemforms/crispr-react-bindings';
import React from 'react';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor, withErrorMessage
} from '../utils/SpectrumMappers';


const mapper = combineConvertors(baseConvertor, fieldConvertor, constraintConvertor, (a, b) => {
    const value = a.value;
    const selectedValue = a.enum?.[0];
    const unselectedValue = (a.enum?.length || 0) < 2 ? null : a.enum?.[1];
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

const Comp = withErrorMessage(SpectrumCheckboxWrapper);
/**
 * The checkbox component follows the convention that the first value of option is used as selected value
 * while the second option is used as deselected value. Any other option value is ignored.
 * @param originalProps
 * @constructor
 */
const CheckboxComponent = function (originalProps: FieldJson & {id: string}) {
    return useRenderer(originalProps, Comp, mapper);
};


export default CheckboxComponent;