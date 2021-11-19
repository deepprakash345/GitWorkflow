import { Button } from '@adobe/react-spectrum';
import React from 'react';
import {useRenderer} from '../react-mapper/hooks';
import {FieldJson} from '@aemforms/forms-next-core';
import {
    baseConvertor,
    combineConvertors,
    richTextString
} from '../utils/SpectrumMappers';

const mapper = combineConvertors(baseConvertor,
    (a: FieldJson, b, f) => {
        return {
            children : a.label?.visible === true ? '' : (a.label?.richText === true ? richTextString(a.label?.value) : a.label?.value),
            variant :'primary',
            onPress : b.dispatchClick
        };
    });


const ButtonFormComponent = (field: FieldJson & {id: string}) => useRenderer(field, mapper, Button);

export default ButtonFormComponent;