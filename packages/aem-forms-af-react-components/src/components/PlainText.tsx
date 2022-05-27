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

import React from 'react';
import {
    baseConvertor,
    combineConvertors
} from '../utils/SpectrumMappers';
import {useRenderer} from '@adobe/aem-forms-af-super-component';
import {FieldJson, State} from '@adobe/aem-forms-af-core';

const PlainText = function (props: any) {
    const { value } = props;
    return (<p>{value}</p>);
};

const mapper = combineConvertors(baseConvertor, (a) => {
    return {value : a.value};
});

const FormPlainTextComponent = (field: State<FieldJson>) => useRenderer(field, PlainText, mapper);

export default FormPlainTextComponent;