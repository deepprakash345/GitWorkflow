import { Flex, Tabs, TabList, TabPanels, Item } from '@adobe/react-spectrum';
import React, { useContext, useCallback } from 'react';
import { FormContext } from '@aemforms/crispr-react-bindings';

const TabWrapper = function (props: any) {
  const mappings = useContext(FormContext).mappings;
  const { items, label, id, visible, orientation } = props;

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
        {label && label.value && label.visible !== false ? <span id={id}>{label.value }</span> : ''}
      <Tabs
        aria-labelledby={id}
        orientation={orientation}
      >
        <TabList>{items.map((item: any) => (<Item key={item?.label?.value}>{item?.label?.value}</Item>))}</TabList>
        <TabPanels>{getTabPanels()}</TabPanels>
      </Tabs>
    </Flex>
  ) : (null);
};


export default TabWrapper;