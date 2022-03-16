import { Button } from '@adobe/react-spectrum';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {FieldJson, State} from '@aemforms/forms-core';
import {
    baseConvertor,
    combineConvertors,
    richTextString
} from '../utils/SpectrumMappers';
import {useRenderer} from '@aemforms/forms-super-component';

const mapper = combineConvertors((a: FieldJson, b) => {
        return {
            variant :'primary',
            children : a.label?.visible === false ? '' : (a.label?.richText === true ? richTextString(a.label?.value) : a.label?.value),
            onPress : b.dispatchClick
        };
    }, baseConvertor);


const ButtonFormComponent = (field: State<FieldJson>) => useRenderer(field, Button, mapper);

export default ButtonFormComponent;