import {ComboBox, Item} from '@adobe/react-spectrum';
import {FieldJson} from '@aemforms/forms-next-core';
import {useRenderer} from '@aemforms/forms-next-react-bindings';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor, enumToChildConvertor
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
const ComboBoxComponent = function (originalProps: FieldJson & {id: string}) {
    return useRenderer(originalProps, ComboBox, mapper, true);
};


export default ComboBoxComponent;