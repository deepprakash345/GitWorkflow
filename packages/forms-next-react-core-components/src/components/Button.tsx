import { Button } from '@adobe/react-spectrum';
import React from 'react';
import {useRenderer} from '../react-mapper/hooks';
import {FieldJson} from '@adobe/forms-next-core';
import {
    baseConvertor,
    combineConvertors,
    richTextString
} from '../utils/SpectrumMappers';

const mapper = combineConvertors(baseConvertor,
    (a: FieldJson, b, f) => {
        let localisedTitle =f('title');
        return {
            children : a.hideTitle === true ? '' : (a.richTextTitle === true ? richTextString(localisedTitle) : localisedTitle),
            variant :'primary',
            onPress : b.dispatchClick
        };
    });


const ButtonFormComponent = (field: FieldJson) => useRenderer(field, mapper, Button);

export default ButtonFormComponent;