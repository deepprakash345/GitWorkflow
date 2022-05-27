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

import { Grid } from '@adobe/react-spectrum';
import React, { useContext, useCallback } from 'react';
import { FormContext } from '@adobe/aem-forms-af-super-component';

const FlexWrapper = function (props: any) {
  const mappings = useContext(FormContext).mappings;
  const { items, visible, columns } = props;

  const getItem = useCallback((child: any, index: any) => {
    const Comp = mappings?.[child[':type']];
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