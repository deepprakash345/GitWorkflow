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

import Field from '../../src/Field';
import RuleEngine from '../../src/rules/RuleEngine';
import {ContainerModel, FormModel} from '../../src/types';
import {create} from '../collateral';
import Form from '../../src/Form';

let form: FormModel;
let options : {form: FormModel, parent: ContainerModel};
beforeEach(() => {
    form = new Form(create(['f1']), new RuleEngine());
    options = {form, parent: form};
});

test('date types should default to date-input', () => {
    const f = new Field({
        type: 'string',
        format: 'date'
    }, options);
    expect(f.fieldType).toEqual('date-input');
});

test('fields with boolean type should default to checkbox', () => {
    const f = new Field({
        type: 'boolean'
    }, options);
    expect(f.fieldType).toEqual('checkbox');
});

test('fields with boolean type should have enum set to true, false', () => {
    const f = new Field({
        type: 'boolean'
    }, options);
    expect(f.enum).toEqual([true, false]);
});

test('fields with enum of length less than 3 should default to checkbox', () => {
    let f = new Field({
        enum: ['a', 'b']
    }, options);
    expect(f.fieldType).toEqual('checkbox');

    f = new Field({
        enum: ['a']
    }, options);
    expect(f.fieldType).toEqual('checkbox');
});

test('fields with enum of length greater than 2 should default to drop-down', () => {
    let f = new Field({
        enum: Array(3 + Math.floor(Math.random() * 10)).fill('a')
    }, options);
    expect(f.fieldType).toEqual('drop-down');
});