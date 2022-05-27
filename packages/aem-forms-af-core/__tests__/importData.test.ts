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

// @ts-nocheck
import {create} from './collateral';
import {createFormInstance} from '../src';
import {deepClone} from '../src/utils/JsonUtils';
const formJson = create(['f', 'f', ['f', 'f', 'f']]);

test('form with simple hiearchy', async () => {
    const data = {
        f1: 'a',
        f2: 'b',
        p1 : {
            f3: 'c',
            f4: 'd',
            f5: 'e'
        }
    };
    const form = await createFormInstance({data, ...formJson});
    expect(form.items[0].value).toEqual('a');
    expect(form.items[1].value).toEqual('b');
    expect(form.items[2].items[0].value).toEqual('c');
    expect(form.items[2].items[1].value).toEqual('d');
    expect(form.items[2].items[2].value).toEqual('e');
});

test('Hierarchical structure should be honored in the data model', async () => {
    let json = create(['f', ['f', 'f', ['f']], 'f']);
    json.data = {
        'f1' : 'x',
        'p1' : {
            'f2' : 'y',
            'f3' : 'z',
            'p2' : {
                'f4' : 'a'
            }
        },
        'f2' : 'b'
    };
    const form = await createFormInstance(json);
    expect(form.items[0].value).toEqual(json.data.f1);
    expect(form.items[1].items[0].value).toEqual(json.data.p1.f2);
    expect(form.items[1].items[1].value).toEqual(json.data.p1.f3);
    expect(form.items[1].items[2].items[0].value).toEqual(json.data.p1.p2.f4);
    expect(form.items[2].value).toEqual(json.data.f2);
});

test('panel with explicit dataRef', async () => {
    let json = create(['f', ['f', 'f', ['f']], 'f']);
    json.items[1].dataRef = 'a.b.c';
    json.data = {
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
    const state= form.getState();
    expect(state.data).toEqual(json.data);
    expect(form.items[0].value).toEqual(json.data.f1);
    expect(form.items[1].items[0].value).toEqual(json.data.a.b.c.f2);
    expect(form.items[1].items[1].value).toEqual(json.data.a.b.c.f3);
    expect(form.items[1].items[2].items[0].value).toEqual(json.data.a.b.c.p2.f4);
    expect(form.items[2].value).toEqual(json.data.f2);
});

test.skip('form with transparent nodes', async () => {
    const data = {
        f1: 'a',
        f2: 'b',
        p1 : {
            f3: 'c',
            f4: 'd',
            f5: 'e'
        }
    };
    const form = await createFormInstance({data, ...formJson});
    const state = form.getState();
    expect(form.items[0].value).toEqual('a');
    expect(form.items[1].value).toEqual('b');
    expect(form.items[2].items[0].value).toEqual('c');
    expect(form.items[2].items[1].value).toEqual('d');
    expect(form.items[2].items[2].value).toEqual('e');
});

test('panel with dataRef null ensures its fields also do not bound to data', async () => {
    const formJson = create(['f', 'f', ['f', 'f', 'f']]);
    formJson.items[2].dataRef = null;
    const data = {
        f1: 'a',
        f2: 'b',
        p1 : {
            f3: 'c',
            f4: 'd',
            f5: 'e'
        }
    };
    let form = await createFormInstance({data, ...formJson});
    const state = form.getState();
    expect(form.items[0].value).toEqual('a');
    expect(form.items[1].value).toEqual('b');
    expect(form.items[2].items[0].value).toEqual(null);
    expect(form.items[2].items[1].value).toEqual(null);
    expect(form.items[2].items[2].value).toEqual(null);

    const data2 = {
        f1: 'a',
        f2: 'b',
        f3: 'c',
        f4: 'd',
        f5: 'e'
    };
    form = await createFormInstance({data: data2, ...formJson});
    expect(form.items[0].value).toEqual('a');
    expect(form.items[1].value).toEqual('b');
    expect(form.items[2].items[0].value).toEqual(null);
    expect(form.items[2].items[1].value).toEqual(null);
    expect(form.items[2].items[2].value).toEqual(null);
});

test('children of unbound panel can specify explicit bindings', async () => {
    const formJson = create(['f', 'f', ['f', 'f', 'f']]);
    formJson.items[2].dataRef = null;
    formJson.items[2].items[0].dataRef = '$.p1.f3';
    formJson.items[2].items[1].dataRef = '$.p1.f4';
    formJson.items[2].items[2].dataRef = '$.p1.f5';
    const data = {
        f1: 'a',
        f2: 'b',
        p1 : {
            f3: 'c',
            f4: 'd',
            f5: 'e'
        }
    };
    let form = await createFormInstance({data, ...formJson});
    const state = form.getState();
    expect(form.items[0].value).toEqual('a');
    expect(form.items[1].value).toEqual('b');
    expect(form.items[2].items[0].value).toEqual('c');
    expect(form.items[2].items[1].value).toEqual('d');
    expect(form.items[2].items[2].value).toEqual('e');
});

test('Panel with array data model', async () => {
    const formJson = create(['f', 'f', ['f', 'f', 'f']]);
    formJson.items[2].type = 'array';
    const data = {
        f1: 'a',
        f2: 'b',
        p1 : ['c', 'd', 'e']
    };
    let form = await createFormInstance({data, ...formJson});
    const state = form.getState();
    expect(form.items[0].value).toEqual('a');
    expect(form.items[1].value).toEqual('b');
    expect(form.items[2].items[0].value).toEqual('c');
    expect(form.items[2].items[1].value).toEqual('d');
    expect(form.items[2].items[2].value).toEqual('e');
});

test('Panel with array data model can also have null dataRef', async () => {
    const formJson = create(['f', 'f', ['f', 'f', 'f']]);
    formJson.items[2].type = 'array';
    formJson.items[2].items[0].dataRef = null;
    const data = {
        f1: 'a',
        f2: 'b',
        p1 : ['c', 'd', 'e']
    };
    let form = await createFormInstance({data, ...formJson});
    const state = form.getState();
    expect(form.items[0].value).toEqual('a');
    expect(form.items[1].value).toEqual('b');
    expect(form.items[2].items[0].value).toEqual(null);
    expect(form.items[2].items[1].value).toEqual('d');
    expect(form.items[2].items[2].value).toEqual('e');
});

test('Panel with array data model can also explicit dataRef', async () => {
    const formJson = create(['f', 'f', ['f', 'f', 'f']]);
    formJson.items[2].type = 'array';
    formJson.items[2].items[0].dataRef = null;
    formJson.items[2].items[1].dataRef = '$.p1[0]';
    formJson.items[2].items[2].dataRef = '$.p1[1]';
    const data = {
        f1: 'a',
        f2: 'b',
        p1 : ['c', 'd', 'e']
    };
    let form = await createFormInstance({data, ...formJson});
    const state = form.getState();
    expect(form.items[0].value).toEqual('a');
    expect(form.items[1].value).toEqual('b');
    expect(form.items[2].items[0].value).toEqual(null);
    expect(form.items[2].items[1].value).toEqual('c');
    expect(form.items[2].items[2].value).toEqual('d');
});

test('Panel with dynamic items should add items depending upon the data', async () => {
    const formJson = create(['f', 'f', ['f']]);
    formJson.items[2].type = 'array';
    formJson.items[2].minItems = 1;
    formJson.items[2].maxItems = 5;
    const data = {
        f1: 'a',
        f2: 'b',
        p1 : ['c', 'd', 'e']
    };
    let form = await createFormInstance({data, ...formJson});
    const state = form.getState();
    expect(form.items[2].items.length).toEqual(3);
});

test('Panel with dynamic items should remove items depending upon the data', async () => {
    const formJson = create(['f', 'f', ['f']]);
    formJson.items[2].type = 'array';
    formJson.items[2].minItems = 1;
    formJson.items[2].initialItems = 5;
    formJson.items[2].maxItems = 5;
    const data = {
        f1: 'a',
        f2: 'b',
        p1 : ['c', 'd', 'e']
    };
    let form = await createFormInstance({data, ...formJson});
    const state = form.getState();
    expect(form.items[2].items.length).toEqual(3);
});
