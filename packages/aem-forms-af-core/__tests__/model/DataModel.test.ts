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

//@ts-nocheck
import {create} from '../collateral';
import {createFormInstance} from '../../src';

test('data model should be created on value change', async () => {
    let json = create(['f', ['f', 'f', ['f']], 'f']);
    json.items[1].dataRef = 'a.b.c';
    const expectedData = {
        'f1' : 'x',
        'a' : {
            'b' : {
                'c' : {
                    'f2' : 'y',
                    'f3' : 'z',
                    'p2' : {
                        'f4' : 'a'
                    }
                }
            }
        },
        'f2' : 'b'
    };
    const form = await createFormInstance(json);
    form.items[0].value = 'x';
    form.items[2].value = 'b';
    form.items[1].items[0].value = 'y';
    form.items[1].items[1].value = 'z';
    form.items[1].items[2].items[0].value = 'a';
    const state= form.exportData();
    expect(state).toEqual(expectedData);
    expect(form.items[0].value).toEqual(expectedData.f1);
    expect(form.items[1].items[0].value).toEqual(expectedData.a.b.c.f2);
    expect(form.items[1].items[1].value).toEqual(expectedData.a.b.c.f3);
    expect(form.items[1].items[2].items[0].value).toEqual(expectedData.a.b.c.p2.f4);
    expect(form.items[2].value).toEqual(expectedData.f2);

    expect(form.items[0].value).toEqual(expectedData.f1);
    expect(form.items[1].items[0].value).toEqual(expectedData.a.b.c.f2);
    expect(form.items[1].items[1].value).toEqual(expectedData.a.b.c.f3);
    expect(form.items[1].items[2].items[0].value).toEqual(expectedData.a.b.c.p2.f4);
    expect(form.items[2].value).toEqual(expectedData.f2);
});