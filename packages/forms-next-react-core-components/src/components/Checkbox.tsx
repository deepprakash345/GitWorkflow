import {Checkbox} from '@adobe/react-spectrum';
import {FieldJson} from '@adobe/forms-next-core';
import {useRuleEngine} from '../react-mapper/hooks';
import {SpectrumCheckboxProps} from '@react-types/checkbox';
import React from 'react';
import {renderIfVisible} from '../react-mapper/utils';

/**
 * The checkbox component follows the convention that the first value of option is used as selected value
 * while the second option is used as deselected value. Any other option value is ignored.
 * @param originalProps
 * @constructor
 */
const CheckboxComponent = function (originalProps: FieldJson) {
    const [props, dispatchChange] = useRuleEngine<FieldJson, string>(originalProps);
    console.log('rendering TextField ' + props[':id'] + ' ' + props[':value']);
    const title = props[':hideTitle'] === true ? '' :props[':title'];
    const value = props[':value'];
    const selectedValue = props[':constraints']?.[':options']?.[0]?.[':value'];
    const unselectedValue = props[':constraints']?.[':options']?.[1]?.[':value'];
    const isRequired = props[':constraints']?.[':required'];
    const spectrumProps: SpectrumCheckboxProps = {
        name: props[':name'],
        value: props[':value'] as string,
        isSelected: value !== undefined && value === selectedValue,
        isRequired,
        validationState: props[':valid'] === false ? 'invalid' : (props[':valid'] === undefined ? undefined : 'valid')
    };

    const handleChange = (isSelected: boolean) => {
        const value = isSelected ? selectedValue : unselectedValue;
        dispatchChange(value);
    };

    return (
        renderIfVisible(props, <Checkbox {...spectrumProps} onChange={handleChange}>{title}</Checkbox>)
    );
};


export default CheckboxComponent;