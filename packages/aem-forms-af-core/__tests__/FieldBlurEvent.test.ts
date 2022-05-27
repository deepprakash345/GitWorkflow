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
import { createFormInstance} from '../src';
import {Blur} from '../src';
// @ts-ignore


test('blur event should execute as expected', async () => {
    const formJson = create(['f',
        {
            'f': {
                'type' : 'string',
                'view-type' : 'text-input',
                'required': true,
                'constraintMessages': {
                    'required': 'mandatory field'
                },
                'events' : {
                    'blur' : ['{value : upper($field.$value)}', 'validate($event.target)']
                }
            }
        }]);
    let form = await createFormInstance(formJson);
    // @ts-ignore
    form.items[1].dispatch(new Blur());
    expect(form.items[1].valid).toEqual(false);
    // set a value
    form.items[1].value= 'a';
    // @ts-ignore
    form.items[1].dispatch(new Blur());
    expect(form.items[1].valid).toEqual(true);
    expect(form.items[1].value).toEqual('A');
});