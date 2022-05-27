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

import React, { useContext, useCallback } from 'react';
import { Accordion, AccordionItem } from '@react-spectrum/Accordion';
import { FieldsetJson } from '@adobe/aem-forms-af-core';
import { useRuleEngine, FormContext } from '@adobe/aem-forms-af-super-component';
import { State } from '@adobe/aem-forms-af-core';

const AccordionWrapper = function (fieldset: State<FieldsetJson>) {
  const mappings = useContext(FormContext).mappings;
  const [props] = useRuleEngine(fieldset);
  const { items, visible } = props;
  const layout = props?.properties?.['afs:layout'] || {};

  const getItems = useCallback(() => {
    return (
      items.map((child: any, index: any) => {
        const Comp = mappings?.[child[':type']];
        return Comp ? (
          <AccordionItem key={child?.label?.value} header={child?.label?.value}>
            <Comp key={`${child.id}_${index}`} {...child} />
          </AccordionItem>
        ) : (null);
      })
    );
  }, [items, mappings]);

  return visible ? (
    <Accordion {...layout}>{getItems()}</Accordion>
  ) : (null);
};

export default AccordionWrapper;