import { FieldsetJson } from '@aemforms/forms-core';
import React from 'react';
import { useRuleEngine } from '@aemforms/forms-super-component';
import { State } from '@aemforms/forms-core';
import TabWrapper from './Tabs';

const VerticalTab = function (fieldset: State<FieldsetJson>) {
  const [props] = useRuleEngine(fieldset);

  return <TabWrapper {...props} orientation={'vertical'} />;
};

export default VerticalTab;