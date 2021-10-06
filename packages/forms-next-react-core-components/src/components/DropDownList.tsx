import {ComboBox, Item} from '@adobe/react-spectrum';
import {FieldJson} from '@adobe/forms-next-core';
import {useRenderer} from '../react-mapper/hooks';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor
} from '../utils/SpectrumMappers';
import React from 'react';


const mapper = combineConvertors(baseConvertor, fieldConvertor, constraintConvertor, (a, b) => {
    const options = a.constraints?.options || [];
    const item = (option : any) => {
        const text = option.text || '';
        const value = option.value || '';
        return <Item key={value}>{text}</Item>;
    };
    // spectrum expects options to be in this format
    const spectrumOptions = options.map((x) =>  {
        return {'id' : x.value, 'value' : x.text}; // value in spectrum is shown on UI
    });


    return {
        onSelectionChange : b.dispatchChange,
        items : spectrumOptions,
        inputValue: a.value,
        children : options.map(item)
    };
});


/**
 * @param originalProps
 * @constructor
 */
const ComboBoxComponent = function (originalProps: FieldJson) {
    // eslint-disable-next-line no-debugger
    debugger;
    return useRenderer(originalProps, mapper, ComboBox);
};


export default ComboBoxComponent;