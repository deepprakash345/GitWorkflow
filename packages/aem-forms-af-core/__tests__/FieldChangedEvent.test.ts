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

import {create} from './collateral';
import Form from '../src/Form';
import RuleEngine from '../src/rules/RuleEngine';
import customMatchers from './collateral/actions';
import {ActionImpl} from '../src/controller/Controller';

expect.extend(customMatchers);
test('changes to a field\'s value triggers a FieldChanged Event', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = new Form(formJson, new RuleEngine());
    const callback = jest.fn();
    form.subscribe(callback, 'fieldChanged');
    const f1 = form.items[0];
    f1.value = 'something';
    const action = new ActionImpl({
        field: form.items[0].getState(),
        changes : [{
            propertyName: 'value',
            currentValue: 'something'
        },
        {
            propertyName: 'valid',
            currentValue: true
        },
        {
            propertyName: 'errorMessage',
            currentValue: ''
        }]
    }, 'fieldChanged');
    expect(callback).toBeCalled();
    expect(callback.mock.calls[0][0]).matchesAction({action, target: form});
});

test('changes to a field\'s property triggers a FieldChanged Event', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = new Form(formJson, new RuleEngine());
    const callback = jest.fn();
    form.subscribe(callback, 'fieldChanged');
    const f1 = form.items[0];
    f1.enum = ['something'];
    const action = new ActionImpl({
        field: form.items[0].getState(),
        changes : [{
            propertyName: 'enum',
            currentValue: ['something']
        }]
    }, 'fieldChanged');
    expect(callback).toBeCalled();
    expect(callback.mock.calls[0][0]).matchesAction({action, target: form});
});