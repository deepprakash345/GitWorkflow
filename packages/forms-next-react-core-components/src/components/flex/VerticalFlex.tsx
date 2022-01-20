import { FieldsetJson } from '@aemforms/forms-next-core';
import React from 'react';
import { useRuleEngine } from '@aemforms/forms-next-react-bindings';
import { State } from '@aemforms/forms-next-core/lib';
import FlexWrapper from './Flex';

const VerticalFlex = function (fieldset: State<FieldsetJson>) {
  const [props] = useRuleEngine(fieldset);

  return <FlexWrapper {...props} columns={['100%']} />;
};

export default VerticalFlex;