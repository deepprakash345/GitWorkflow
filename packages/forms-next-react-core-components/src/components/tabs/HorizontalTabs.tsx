import { FieldsetJson } from '@aemforms/forms-next-core';
import React from 'react';
import { useRuleEngine } from '@aemforms/forms-next-react-bindings';
import { State } from '@aemforms/forms-next-core/lib';
import TabWrapper from './Tabs';

const HorizontalTab = function (fieldset: State<FieldsetJson>) {
  const [props] = useRuleEngine(fieldset);

  return <TabWrapper {...props} orientation={'horizontal'} />;
};

export default HorizontalTab;