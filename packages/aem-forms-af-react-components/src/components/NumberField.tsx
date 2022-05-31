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

import {NumberField} from '@adobe/react-spectrum';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {FieldJson, State} from '@adobe/aem-forms-af-core';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor
} from '../utils/SpectrumMappers';
import {useRenderer} from '@adobe/aem-forms-af-react-renderer';

const mapper = combineConvertors(baseConvertor,
    fieldConvertor,
    constraintConvertor, (a) => {
        return {
            minValue: a.minimum,
            maxValue: a.maximum,
            step: a.step
        };
    });

const NumberComp = function (props: State<FieldJson>) {
    return useRenderer(props, NumberField, mapper, true);
};

export default NumberComp;