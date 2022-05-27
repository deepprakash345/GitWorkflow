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

import Form from '../../src/Form';
import {create} from '../collateral';
import RuleEngine from '../../src/rules/RuleEngine';

test('A required checkbox with explicit off value should be invalid', () => {
    const formJson = {
        items: [{
            name: 'f1',
            fieldType: 'checkbox',
            type: 'number',
            enum: [1, 0],
            required: true
        }]
    };
    const form = new Form(formJson, new RuleEngine());
    form.items[0].value = 0;
    expect(form.items[0].valid).toEqual(false);
    form.items[0].value = 1;
    expect(form.items[0].valid).toEqual(true);
});

test("A required checkbox with type boolean value should be invalid when it's value is false", () => {
    const formJson = {
        items: [{
            name: 'f1',
            fieldType: 'checkbox',
            type: 'boolean',
            required: true
        }]
    };
    const form = new Form(formJson, new RuleEngine());
    form.items[0].value = false;
    expect(form.items[0].valid).toEqual(false);
    form.items[0].value = true;
    expect(form.items[0].valid).toEqual(true);
});

test('A checkbox without enum property should return an empty array', () => {
    const formJson = {
        items: [{
            name: 'f1',
            fieldType: 'checkbox',
            type: 'number',
            required: true
        }]
    };
    const form = new Form(formJson, new RuleEngine());
    expect(form.items[0].enum).toEqual([]);
});

test('A checkbox without enum property should remain invalid', () => {
    const formJson = {
        items: [{
            name: 'f1',
            fieldType: 'checkbox',
            type: 'number',
            required: true
        }]
    };
    const form = new Form(formJson, new RuleEngine());
    form.items[0].value = 1;
    expect(form.items[0].valid).toEqual(false);
});

test('An optional checkbox should be valid if it is not selected', () => {
    const formJson = {
        items: [{
            name: 'f1',
            fieldType: 'checkbox',
            type: 'boolean'
        }]
    };
    const form = new Form(formJson, new RuleEngine());
    form.items[0].value = null;
    expect(form.items[0].valid).toEqual(true);
});

test('An optional checkbox with no off value should be valid if it is not selected', () => {
    const formJson = {
        items: [{
            name: 'f1',
            fieldType: 'checkbox',
            enum: [1]
        }]
    };
    const form = new Form(formJson, new RuleEngine());
    form.items[0].value = null;
    expect(form.items[0].valid).toEqual(true);
});
