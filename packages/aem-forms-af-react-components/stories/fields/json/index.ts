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

import {form, formWithSubmit} from "../../template";

export const inputfieldTypes = [
    'text-input',
    'multiline-input',
    'date-input',
    'number-input',
    'file-input'
]

export const optionsfieldTypes = [
    'drop-down',
    'radio-group',
    'checkbox-group'
]

const basic = {
    'label' : {
        'value' : 'Field'
    },
    'name' : 'field'
};

const component = (fieldType, extras: any = {}, label = undefined, description= undefined) => {
    return {
        ...basic,
        label: {
            value : label ? label : basic.label.value
        },
        description,
        fieldType,
        ...extras
    }
}

//@ts-ignore
const data = Object.fromEntries(inputfieldTypes.concat(optionsfieldTypes).map(x => {
    const isInput = inputfieldTypes.indexOf(x) > -1
    const obj = isInput ? {} : {enum: ["1", "2", "3"]}
    return [x, formWithSubmit(component(x, obj))]
}))

const additional = {
    checkbox : formWithSubmit(component('checkbox', {enum: ['on', 'off']})),
    checkboxNoOff : formWithSubmit(component('checkbox', {enum: ['on']})),
    checkboxBoolean : formWithSubmit(component('checkbox', {type: 'boolean'})),
    'checkbox-group-single': formWithSubmit(component('checkbox-group', {type: 'number', enum: [1, 2, 3]})),
    button : form(component('button', {label: {value: 'click me'}})),
    "plain-text" : form(component('plain-text', {value: 'This is a plain text'})),
    "text-input-number" : formWithSubmit(component('text-input', {type: 'number'}, 'Text Field for Number', 'Enter only numbers')),
    "text-input-date" : formWithSubmit(component('text-input', {type: 'string', format: 'date'}, 'Text Field for Date', 'Enter date (yyyy-mm-dd)')),
    "drop-down-enumNames": formWithSubmit(component('drop-down', {enum: [1, 2, 3], enumNames: ['Apple', 'Orange', 'Guava']})),
    "password": formWithSubmit(component('password-input', { type: 'string' }, 'Password Field')),
    "horizontal-checkbox": formWithSubmit(component('checkbox-group', { enum: [1, 2, 3], properties: { 'afs:layout': { orientation: 'horizontal' } } })),
    "radio-group-horizontal": formWithSubmit(component('radio-group', { enum: [1, 2, 3], properties: { 'afs:layout': { orientation: 'horizontal' } } })),
    "text-input-custom" : formWithSubmit(component('text-input', {properties: { 'afs:layout': { isQuiet	: true } }}, 'Text Field for custom properties')),
}

export const examples = {
    ...data,
    ...additional
}


