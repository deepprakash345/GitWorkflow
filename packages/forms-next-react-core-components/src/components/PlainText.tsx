import React from 'react';
import {baseConvertor} from '../utils/SpectrumMappers';
import {useRenderer} from '../react-mapper/hooks';
import {FieldJson} from '@aemforms/forms-next-core/lib';

const PlainText = function (props: any) {
    const { label } = props;
    return (<p>{label}</p>);
};

const FormPlainTextComponent = (field: FieldJson) => useRenderer(field, baseConvertor, PlainText);

export default FormPlainTextComponent;