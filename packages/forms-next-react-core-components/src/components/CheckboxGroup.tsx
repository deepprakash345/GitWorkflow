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
    enumToChildConvertor(Checkbox), (a, b) => {
      const isArray = (a.type || '[]').indexOf('[]') >  -1;
      return {
        onChange: (val: any) => {
            let finalVal;
            if (val === null) finalVal = null
            if (isArray) {
                finalVal = val;
            } else if (val.length > 0) {
                finalVal = val.filter((x:any) => a.value !== x)[0] //val[0]
            } else {
                finalVal = null
            }
            b.dispatchChange(finalVal)
        },
        value: a.value == null ? [] : a.value instanceof Array ? a.value : [a.value]
      };
});

const Comp = withErrorMessage(CheckboxGroup);

const CheckboxGroupComponent = function (props: FieldJson & { id: string }) {
  return useRenderer(props, Comp, mapper);
};


export default CheckboxGroupComponent;