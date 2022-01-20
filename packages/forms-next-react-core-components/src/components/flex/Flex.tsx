import { Grid } from '@adobe/react-spectrum';
import React, { useContext, useCallback } from 'react';
import { FormContext } from '@aemforms/forms-next-react-bindings';

const FlexWrapper = function (props: any) {
  const mappings = useContext(FormContext).mappings;
  const { items, visible, columns } = props;

  const getItem = useCallback((child: any, index: any) => {
    const Comp = mappings?.[child.viewType];
    return Comp ? <Comp key={`${child.id}_${index}`} {...child} /> : (null);
  }, [mappings]);

  return visible && items.length ? (
    <Grid
      columns={columns}
      gap='size-10'
    >
      {items.map((child: any, index: Number) => getItem(child, index))}
    </Grid>
  ) : (null);
};

export default FlexWrapper;