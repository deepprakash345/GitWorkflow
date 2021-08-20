import {Checkbox} from '@adobe/react-spectrum';
import {FieldJson} from '@adobe/forms-next-core';
import {useRuleEngine} from '../react-mapper/hooks';
import {SpectrumCheckboxProps} from '@react-types/checkbox';
import React from 'react';

const CheckboxComponent = function (originalProps: FieldJson) {
    const [props, dispatchChange] = useRuleEngine<FieldJson, string>(originalProps);
    console.log('rendering TextField ' + props[':id'] + ' ' + props[':value']);
    const title = props[':hideTitle'] === true ? '' :props[':title'];
    const value = props[':value'];
    const selectedValue = props[':constraints']?.[':options']?.[0]?.[':value'];
    const isRequired = props[':constraints']?.[':required'];
    const spectrumProps: SpectrumCheckboxProps = {
        name: props[':name'],
        value: props[':value'] as string,
        isSelected: value === selectedValue,
        isRequired,
        validationState: props[':valid'] === false ? 'invalid' : (props[':valid'] === undefined ? undefined : 'valid')
    };

    const handleChange = (isSelected: boolean) => {
        const value = isSelected ? props[':constraints']?.[':options']?.[0]?.[':value'] : undefined;
        dispatchChange(value);
    };

    return (
        <Checkbox {...spectrumProps} onChange={handleChange}>{title}</Checkbox>
    );
};


export default CheckboxComponent;