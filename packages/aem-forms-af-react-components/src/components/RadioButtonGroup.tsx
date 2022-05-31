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

import {RadioGroup, Radio} from '@adobe/react-spectrum';
import {FieldJson, State} from '@adobe/aem-forms-af-core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {useRenderer} from '@adobe/aem-forms-af-react-renderer';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor,
    enumToChildConvertor, withErrorMessage
} from '../utils/SpectrumMappers';
const mapper = combineConvertors(baseConvertor, constraintConvertor, fieldConvertor, enumToChildConvertor(Radio));

const Comp = withErrorMessage(RadioGroup);

const RadioGroupComponent = function (props: State<FieldJson>) {
    return useRenderer(props, Comp, mapper, true);
};


export default RadioGroupComponent;