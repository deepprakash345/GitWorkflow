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

import {createFormInstance} from "../src";


const undefinedEmptyValue = {
    fieldType: 'text-input',
    emptyValue : "undefined",
    type: "string",
    "name" : "field",
    label: {
        value : "Label of the field"
    },
    description: "When empty value is undefined, data will not be submitted for the field"
}

const nullEmptyValue = {
    ...undefinedEmptyValue,
    emptyValue: "null",
    description: "When empty value is undefined, data will not be submitted for the field"
}

const emptyStringEmptyValue = {
    ...undefinedEmptyValue,
    emptyValue: '',
    description: "When empty value is '', '' (empty string) will be submitted for the field when empty"
}

test("When empty value is undefined, data will not be submitted for the field when empty", () => {
    const form = createFormInstance({
        items: [undefinedEmptyValue]
    });
    expect(form.exportData()).toEqual({})
    form.items[0].value = ''
    expect(form.exportData()).toEqual({})

    form.items[0].value = undefined
    expect(form.exportData()).toEqual({})

    form.items[0].value = null
    expect(form.exportData()).toEqual({})
})

test("When empty value is null, null value will be submitted for the field when empty", () => {
    const form = createFormInstance({
        items: [nullEmptyValue]
    });
    expect(form.exportData()).toEqual({field: null})
    form.items[0].value = ''
    expect(form.exportData()).toEqual({field: null})

    form.items[0].value = undefined
    expect(form.exportData()).toEqual({field: null})

    form.items[0].value = null
    expect(form.exportData()).toEqual({field: null})
})

test("When empty value is '', '' (empty string) will be submitted for the field when empty", () => {
    const form = createFormInstance({
        items: [emptyStringEmptyValue]
    });
    expect(form.exportData()).toEqual({field: ''})

    form.items[0].value = ''
    expect(form.exportData()).toEqual({field: ''})

    form.items[0].value = undefined
    expect(form.exportData()).toEqual({field: ''})

    form.items[0].value = null
    expect(form.exportData()).toEqual({field: ''})
})

test("get Value should return correct value irrespective of the emptyValue", () => {

    const opts = [nullEmptyValue, undefinedEmptyValue, emptyStringEmptyValue]
    const selected = opts[Math.floor(Math.random()* 3)]

    const form = createFormInstance({
        items: [selected]
    });

    form.items[0].value = ''
    expect(form.items[0].value).toEqual('')

    form.items[0].value = null
    expect(form.items[0].value).toEqual(null)

    form.items[0].value = undefined
    expect(form.items[0].value).toEqual(null)
})