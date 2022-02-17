import { FieldsetJson } from '@aemforms/crispr-core';
import React from 'react';
import { useRuleEngine } from '@aemforms/crispr-react-bindings';
import { State } from '@aemforms/crispr-core/lib';
import FlexWrapper from './Flex';

const VerticalFlex = function (fieldset: State<FieldsetJson>) {
  const [props] = useRuleEngine(fieldset);

  return <FlexWrapper {...props} columns={['100%']} />;
};

export default VerticalFlex;