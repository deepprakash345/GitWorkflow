import { TextField } from '@adobe/react-spectrum';
import { FieldJson, State } from '@aemforms/forms-core';
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
  stringConstraintConvertor, () => {
    return { width: '100%', type: 'password' };
  });

// Password component using TextField with input type password,
const PasswordField = function (props: State<FieldJson>) {
  const renderedComponent = useRenderer(props, TextField, mapper, true);
  return renderedComponent;
};

export default PasswordField;