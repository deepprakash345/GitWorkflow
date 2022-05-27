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

import {ComboBox, Item} from '@adobe/react-spectrum';
import {FieldJson, State} from '@adobe/aem-forms-af-core';
import {useRenderer} from '@adobe/aem-forms-af-super-component';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor, enumToChildConvertor
} from '../utils/SpectrumMappers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';


const mapper = combineConvertors(baseConvertor,
    fieldConvertor,
    constraintConvertor,
    enumToChildConvertor(Item),
    // enumConvertor('items', (text, value) => {
    //     return {'id' : value, 'value' : text};
    // }),
    (a, b) => {
        return {
            onSelectionChange: b.dispatchChange,
            selectedKey: a.value != null ? a.value + '': a.value
        };
    });


/**
 * @param originalProps
 * @constructor
 */
const ComboBoxComponent = function (originalProps: State<FieldJson>) {
    return useRenderer(originalProps, ComboBox, mapper, true);
};


export default ComboBoxComponent;