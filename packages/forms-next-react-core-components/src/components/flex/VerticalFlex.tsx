import { FieldsetJson } from '@aemforms/forms-core';
import React from 'react';
import { useRuleEngine } from '@aemforms/forms-super-component';
import { State } from '@aemforms/forms-core';
import FlexWrapper from './Flex';

const VerticalFlex = function (fieldset: State<FieldsetJson>) {
  const [props] = useRuleEngine(fieldset);

  return <FlexWrapper {...props} columns={['100%']} />;
};

export default VerticalFlex;