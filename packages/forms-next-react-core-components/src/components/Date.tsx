import { TextField } from '@adobe/react-spectrum';
import { FieldJson } from '@aemforms/forms-next-core';
import React from 'react';
import { useRenderer } from '@aemforms/forms-next-react-bindings';
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
    return { width: '300px' };
  });

// Date component using TextField with input type date,
// to be replaced with react-spectrum datepicker after release    
const DateField = function (props: FieldJson & { id: string }) {
  const renderedComponent = useRenderer(props, mapper, TextField);
  return renderedComponent;
};

export default DateField;