import {ComboBox, Item} from '@adobe/react-spectrum';
import {FieldJson} from '@adobe/forms-next-core';
import {useRenderer} from '../react-mapper/hooks';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor, enumToChildConvertor, enumConvertor
} from '../utils/SpectrumMappers';
import React from 'react';


const mapper = combineConvertors(baseConvertor,
    fieldConvertor,
    constraintConvertor,
    enumToChildConvertor(Item),
    // enumConvertor('items', (text, value) => {
    //     return {'id' : value, 'value' : text};
    // }),
    (a, b) => {
        return {
            onSelectionChange: b.dispatchChange,
            selectedKey: a.value
        };
    });


/**
 * @param originalProps
 * @constructor
 */
const ComboBoxComponent = function (originalProps: FieldJson) {
    return useRenderer(originalProps, mapper, ComboBox);
};


export default ComboBoxComponent;