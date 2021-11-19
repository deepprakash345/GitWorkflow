import React from 'react';
import {baseConvertor} from '../utils/SpectrumMappers';
import {useRenderer} from '@aemforms/forms-next-react-bindings';
import {FieldJson} from '@aemforms/forms-next-core/lib';

const PlainText = function (props: any) {
    const { label } = props;
    return (<p>{label}</p>);
};

const FormPlainTextComponent = (field: FieldJson & {id: string}) => useRenderer(field, baseConvertor, PlainText);

export default FormPlainTextComponent;