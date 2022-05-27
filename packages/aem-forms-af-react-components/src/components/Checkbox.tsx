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

import {Checkbox} from '@adobe/react-spectrum';
import {FieldJson, State} from '@adobe/aem-forms-af-core';
import {useRenderer} from '@adobe/aem-forms-af-super-component';
import React from 'react';
import {
    baseConvertor,
    combineConvertors,
    constraintConvertor,
    fieldConvertor, withErrorMessage
} from '../utils/SpectrumMappers';


const mapper = combineConvertors(baseConvertor, fieldConvertor, constraintConvertor, (a) => {
    const value = a.value;
    const selectedValue = a.enum?.[0];
    const unselectedValue = (a.enum?.length || 0) < 2 ? null : a.enum?.[1];
    return {
        selectedValue,
        unselectedValue,
        isSelected: value !== undefined && value === selectedValue
    };
});

const SpectrumCheckboxWrapper = (props: any) => {
    const handleChange = (isSelected: boolean) => {
        const value = isSelected ? props.selectedValue : props.unselectedValue;
        props.onChange(value);
    };
    return <Checkbox {...props} onChange={handleChange}>{props.label}</Checkbox>;
};

const Comp = withErrorMessage(SpectrumCheckboxWrapper);
/**
 * The checkbox component follows the convention that the first value of option is used as selected value
 * while the second option is used as deselected value. Any other option value is ignored.
 * @param originalProps
 * @constructor
 */
const CheckboxComponent = function (originalProps: State<FieldJson>) {
    return useRenderer(originalProps, Comp, mapper);
};


export default CheckboxComponent;