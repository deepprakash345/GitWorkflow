import { FieldsetJson } from '@aemforms/crispr-core';
import React from 'react';
import { useRuleEngine } from '@aemforms/crispr-react-bindings';
import { State } from '@aemforms/crispr-core/lib';
import TabWrapper from './Tabs';

const VerticalTab = function (fieldset: State<FieldsetJson>) {
  const [props] = useRuleEngine(fieldset);

  return <TabWrapper {...props} orientation={'vertical'} />;
};

export default VerticalTab;