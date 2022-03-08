import { TextField } from '@adobe/react-spectrum';
import {FieldJson, State} from '@aemforms/forms-core';
import React from 'react';
import { useRenderer } from '@aemforms/forms-super-component';
import {
  baseConvertor,
  combineConvertors,
  constraintConvertor,
  fieldConvertor,
  stringConstraintConvertor,
  inputTypeConvertor
} from '../utils/SpectrumMappers';

const mapper = combineConvertors(baseConvertor,
  fieldConvertor,
  constraintConvertor,
  inputTypeConvertor,
  stringConstraintConvertor, (a, b) => {
    return { width: '100%', type: 'date' };
  });

// Date component using TextField with input type date,
// to be replaced with react-spectrum datepicker after release    
const DateField = function (props: State<FieldJson>) {
  const renderedComponent = useRenderer(props, TextField, mapper, true);
  return renderedComponent;
};

export default DateField;