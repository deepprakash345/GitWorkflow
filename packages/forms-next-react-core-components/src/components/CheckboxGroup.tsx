import { CheckboxGroup, Checkbox } from '@adobe/react-spectrum';
import { FieldJson } from '@aemforms/crispr-core';
import React from 'react';
import { useRenderer } from '@aemforms/crispr-react-bindings';
import {
  baseConvertor,
  combineConvertors,
  constraintConvertor,
  fieldConvertor,
  enumToChildConvertor, withErrorMessage
} from '../utils/SpectrumMappers';

const mapper = combineConvertors(baseConvertor, constraintConvertor, fieldConvertor,
    enumToChildConvertor(Checkbox), (a) => {
      const isArray = (a.type || '[]').indexOf('[]') >  -1;
      return {
        value: a.value == null ? isArray ? [] : '' : a.value
      };
});

const Comp = withErrorMessage(CheckboxGroup);

const CheckboxGroupComponent = function (props: FieldJson & { id: string }) {
  return useRenderer(props, Comp, mapper);
};


export default CheckboxGroupComponent;