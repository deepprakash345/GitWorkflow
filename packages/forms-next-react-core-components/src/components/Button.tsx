import { Button } from '@adobe/react-spectrum';
import React from 'react';
import {FieldJson, State} from '@aemforms/crispr-core';
import {
    baseConvertor,
    combineConvertors,
    richTextString
} from '../utils/SpectrumMappers';
import {useRenderer} from '@aemforms/crispr-react-bindings';

const mapper = combineConvertors((a: FieldJson, b, f) => {
        return {
            variant :'primary',
            children : a.label?.visible === false ? '' : (a.label?.richText === true ? richTextString(a.label?.value) : a.label?.value),
            onPress : b.dispatchClick
        };
    }, baseConvertor);


const ButtonFormComponent = (field: State<FieldJson>) => useRenderer(field, Button, mapper);

export default ButtonFormComponent;