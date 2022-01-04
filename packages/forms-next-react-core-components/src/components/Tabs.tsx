import { Flex, Tabs, TabList, TabPanels, Item } from '@adobe/react-spectrum';
import { FieldsetJson } from '@aemforms/forms-next-core';
import React, { useContext, useCallback } from 'react';
import { useRuleEngine, FormContext } from '@aemforms/forms-next-react-bindings';
import { State } from '@aemforms/forms-next-core/lib';

const TabsWrapper = function (fieldset: State<FieldsetJson>) {
  const mappings = useContext(FormContext).mappings;
  const [props] = useRuleEngine(fieldset);
  const { items, visible, label, id } = props;

  const getTabPanels = useCallback(() => {
    return (
      items.map((child: any, index: any) => {
        const Comp = mappings?.[child.viewType];
        return Comp ? (
          <Item key={child?.label?.value}>
            <Comp key={`${child.id}_${index}`} {...child} />
          </Item>
        ) : (null);
      })
    );
  }, [items, mappings]);

  return visible && items.length ? (
    <Flex gap="size-150" wrap>
      <span id={id}>{label.value}</span>
      <Tabs
        orientation={props['props:orientation']}
        aria-labelledby={id}>
        <TabList>{items.map((item: any) => (<Item key={item?.label?.value}>{item?.label?.value}</Item>))}</TabList>
        <TabPanels>{getTabPanels()}</TabPanels>
      </Tabs>
    </Flex>
  ) : (null);
};

export default TabsWrapper;