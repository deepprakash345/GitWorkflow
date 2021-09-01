import { Radio, RadioGroup } from '@adobe/react-spectrum';
import {FieldJson} from '@adobe/forms-next-core';
import React from 'react';
import { SpectrumRadioGroupProps } from '@react-types/radio';
import {useRuleEngine} from '../react-mapper/hooks';
import {renderIfVisible} from '../react-mapper/utils';
import {jsonString} from '@adobe/forms-next-core/lib/utils/JsonUtils';

const RadioGroupComponent = function (originalProps: FieldJson) {
    const [props, dispatchChange] = useRuleEngine(originalProps);
    console.log('rendering RadioButtonGroup ' + props[':id'] + ' ' + props[':value']);
    const options = props[':constraints']?.[':options'] || [];
    const label = props[':hideTitle'] === true ? '' :props[':title'];
    const name = props[':name'];
    const radio = (option : any) => {
        const value = option[':value'];
        const text = option[':text'] || '';
        return <Radio key={JSON.stringify(option)} value={value}>{text}</Radio>;
    };

    const radioGrpProps:SpectrumRadioGroupProps = {
        name,
        label,
        value : props[':value'] as string,
        ...(props[':constraints']?.[':required'] && {
            isRequired: true,
            necessityIndicator: 'icon'
        }),
        validationState : props[':valid'] === false ? 'invalid' : (props[':valid'] === undefined ? undefined : 'valid'),
        children : options.map(radio),
        onChange: dispatchChange
    };

    return renderIfVisible(props, <RadioGroup {...radioGrpProps} />);
};


export default RadioGroupComponent;