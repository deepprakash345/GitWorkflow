import React, { useContext, useCallback } from 'react';
import { Accordion, AccordionItem } from '@react/react-spectrum/Accordion';
import { FieldsetJson } from '@aemforms/forms-core';
import { useRuleEngine, FormContext } from '@aemforms/forms-super-component';
import { State } from '@aemforms/forms-core';

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