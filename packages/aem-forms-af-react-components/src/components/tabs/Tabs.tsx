/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

import { Flex, Tabs, TabList, TabPanels, Item } from '@adobe/react-spectrum';
import React, { useContext, useCallback } from 'react';
import { FormContext } from '@adobe/aem-forms-af-super-component';
import {ContainerJson, State} from "@adobe/aem-forms-af-core";

const TabWrapper = function (props: State<ContainerJson> & {orientation? : string}) {
  const mappings = useContext(FormContext).mappings;
  const { items, label, id, visible, orientation } = props;

  const getTabPanels = useCallback(() => {
    return (
      items.map((child: any, index: any) => {
        const Comp = mappings?.[child[":type"]];
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