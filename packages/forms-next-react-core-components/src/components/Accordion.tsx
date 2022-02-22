import React, { useContext, useCallback } from 'react';
import { Accordion, AccordionItem } from '@react/react-spectrum/Accordion';
import { FieldsetJson } from '@aemforms/crispr-core';
import { useRuleEngine, FormContext } from '@aemforms/crispr-react-bindings';
import { State } from '@aemforms/crispr-core';

const AccordionWrapper = function (fieldset: State<FieldsetJson>) {
  const mappings = useContext(FormContext).mappings;
  const [props] = useRuleEngine(fieldset);
  const { items, visible } = props;

  const getItems = useCallback(() => {
    return (
      items.map((child: any, index: any) => {
        const Comp = mappings?.[child.viewType];
        return Comp ? (
          <AccordionItem key={child?.label?.value} header={child?.label?.value}>
            <Comp key={`${child.id}_${index}`} {...child} />
          </AccordionItem>
        ) : (null);
      })
    );
  }, [items, mappings]);

  return visible ? (
    <Accordion>{getItems()}</Accordion>
  ) : (null);
};

export default AccordionWrapper;