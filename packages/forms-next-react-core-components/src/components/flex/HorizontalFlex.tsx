import { FieldsetJson } from '@aemforms/forms-next-core';
import React, { useCallback } from 'react';
import { useRuleEngine } from '@aemforms/forms-next-react-bindings';
import { State } from '@aemforms/forms-next-core/lib';
import FlexWrapper from './Flex';

const HorizontalFlex = function (fieldset: State<FieldsetJson>) {
  const [props] = useRuleEngine(fieldset);
  const { items } = props;

  const getColumnsSize = useCallback(() => {
    const len = items.length;
    const colSize = (100 / len).toFixed(2);
    return Array(len).fill(`${colSize}%`);
  }, [items]);

  return <FlexWrapper {...props} columns={getColumnsSize()} />;
};

export default HorizontalFlex;