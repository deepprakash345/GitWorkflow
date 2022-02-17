import { Button } from '@adobe/react-spectrum';
import React from 'react';
import {FieldJson} from '@aemforms/crispr-core';
import {
    baseConvertor,
    combineConvertors,
    richTextString
} from '../utils/SpectrumMappers';
import {useRenderer} from '@aemforms/crispr-react-bindings';

const mapper = combineConvertors(baseConvertor,
    (a: FieldJson, b, f) => {
        return {
            children : a.label?.visible === false ? '' : (a.label?.richText === true ? richTextString(a.label?.value) : a.label?.value),
            variant :'primary',
            onPress : b.dispatchClick
        };
    });


const ButtonFormComponent = (field: FieldJson & {id: string}) => useRenderer(field, Button, mapper);

export default ButtonFormComponent;