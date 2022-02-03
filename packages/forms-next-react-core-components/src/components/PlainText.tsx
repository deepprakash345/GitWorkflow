import React from 'react';
import {
    baseConvertor,
    combineConvertors
} from '../utils/SpectrumMappers';
import {useRenderer} from '@aemforms/forms-next-react-bindings';
import {FieldJson} from '@aemforms/forms-next-core/lib';

const PlainText = function (props: any) {
    const { value } = props;
    return (<p>{value}</p>);
};

const mapper = combineConvertors(baseConvertor, (a) => {
    return {value : a.value};
});

const FormPlainTextComponent = (field: FieldJson & {id: string}) => useRenderer(field, PlainText, mapper);

export default FormPlainTextComponent;