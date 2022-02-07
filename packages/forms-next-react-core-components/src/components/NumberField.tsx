import { NumberField } from '@adobe/react-spectrum';
import React from 'react';
import { FieldJson } from '@aemforms/forms-next-core';
import {
  baseConvertor,
  combineConvertors,
  constraintConvertor,
  fieldConvertor, withErrorMessage
} from '../utils/SpectrumMappers';
import { useRenderer } from '@aemforms/forms-next-react-bindings';

const mapper = combineConvertors(baseConvertor,
  fieldConvertor,
  constraintConvertor);

const NumberComp = function (props: FieldJson & { id: string }) {
  return useRenderer(props, NumberField, mapper);
};

export default NumberComp;