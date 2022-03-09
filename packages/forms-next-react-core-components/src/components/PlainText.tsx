import React from 'react';
import {
    baseConvertor,
    combineConvertors
} from '../utils/SpectrumMappers';
import {useRenderer} from '@aemforms/forms-super-component';
import {FieldJson, State} from '@aemforms/forms-core';

const PlainText = function (props: any) {
    const { value } = props;
    return (<p>{value}</p>);
};

const mapper = combineConvertors(baseConvertor, (a) => {
    return {value : a.value};
});

const FormPlainTextComponent = (field: State<FieldJson>) => useRenderer(field, PlainText, mapper);

export default FormPlainTextComponent;