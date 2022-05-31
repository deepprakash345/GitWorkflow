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

import { FieldsetJson } from '@adobe/aem-forms-af-core';
import React, { useCallback } from 'react';
import { useRuleEngine } from '@adobe/aem-forms-af-react-renderer';
import { State } from '@adobe/aem-forms-af-core';
import FlexWrapper from './Flex';

const HorizontalFlex = function (fieldset: State<FieldsetJson>) {
  const [props] = useRuleEngine(fieldset);
  const { items } = props;

  const getColumnsSize = useCallback(() => {
    const len = items.length;
    const colSize = (100 / len).toFixed(2);
    return Array(len).fill(`${colSize}%`);
  }, [items]);

  return <FlexWrapper {...props} columns={getColumnsSize()} />;
};

export default HorizontalFlex;