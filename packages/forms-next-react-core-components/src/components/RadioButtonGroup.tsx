import { Radio, RadioGroup } from '@adobe/react-spectrum';
import {FieldJson} from '@adobe/forms-next-core';
import React from 'react';
import { SpectrumRadioGroupProps } from '@react-types/radio';
import {useRuleEngine} from '../react-mapper/hooks';

const RadioGroupComponent = function (originalProps: FieldJson) {
    const [props, dispatchChange] = useRuleEngine(originalProps);
    console.log('rendering RadioButtonGroup ' + props[':id'] + ' ' + props[':value']);
    const options = props[':constraints']?.[':options'] || [];
    const label = props[':hideTitle'] === true ? '' :props[':title'];
    const name = props[':name'];
    const radio = (option : any) => {
        const value = option[':value'];
        const text = option[':text'] || '';
        return <Radio value={value}>{text}</Radio>;
    };

    const radioGrpProps:SpectrumRadioGroupProps = {
        name,
        label,
        ...(props[':constraints']?.[':required'] && {
            isRequired: true,
            necessityIndicator: 'icon'
        }),
        validationState : props[':valid'] === false ? 'invalid' : (props[':valid'] === undefined ? undefined : 'valid'),
        children : options.map(radio)
    };

    const handleChange = (val: string) => {
        dispatchChange(val);
    };

    return (
        <RadioGroup {...radioGrpProps} onChange={handleChange}/>
    );
};


export default RadioGroupComponent;