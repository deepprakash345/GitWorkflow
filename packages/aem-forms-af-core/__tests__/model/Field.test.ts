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

import {Constraints} from '../../src/utils/ValidationUtils';
import {create} from '../collateral';
import RuleEngine from '../../src/rules/RuleEngine';
import customMatchers from '../collateral/actions';
import {createFormInstance, Change, FormModel, Form, Field} from "../../src";

let form: FormModel;
let options : {parent: FormModel, form: FormModel};
expect.extend(customMatchers);
beforeEach(async () => {
    form = new Form(create(['f']), new RuleEngine());
    options = {
        parent: form,
        form
    };
});

test('a field should add all the default values in its json', () => {
    const f = new Field({}, options);
    expect(f.getState()).toMatchObject({
        visible : true,
        readOnly : false,
        fieldType: 'text-input',
        type: 'string',
        enabled : true
    });

    expect(f.visible).toEqual(true);
    expect(f.ruleEngine).toEqual(form.ruleEngine);
    expect(f.readOnly).toEqual(false);
    expect(f.enabled).toEqual(true);
});

test("a field's type can be deduced from enum values", () => {
    const f = new Field({
        enum: [1, 2, 3],
        fieldType: 'text-input'
    }, options);
    expect(f.getState()).toMatchObject({
        visible : true,
        readOnly : false,
        enum: [1, 2, 3],
        fieldType: 'text-input',
        type: 'number',
        enabled : true
    });
});

test('a field should set the value correctly in its json from default value', () => {
    const f = new Field({default : 'test'}, options);
    expect(f.getState()).toMatchObject({
        visible : true,
        readOnly : false,
        enabled : true,
        default : 'test',
        value : 'test',
        fieldType : 'text-input',
        type: 'string'
    });
});

test('a field should return correct dataRef value', () => {
    const f = new Field({default : 'test'}, options);
    expect(f.dataRef).toEqual(undefined);

    const f1 = new Field({default : 'test', dataRef: '$abcd'}, options);
    expect(f1.dataRef).toEqual('$abcd');

    const f2 = new Field({default : 'test', dataRef : null}, options);
    expect(f2.dataRef).toEqual(null);
});

test('visibility of a field should trigger the subscription', () => {
    const f = new Field({default : 'test'}, options);
    const fn = jest.fn();
    f.subscribe(fn);
    f.visible = false;
    expect(fn).toBeCalled();
    const action = new Change({
        changes : [{
            propertyName: 'visible',
            currentValue: false,
            prevValue: true
        }]
    });
    expect(fn.mock.calls[0][0]).matchesAction({action, target: f});
});

test('a boolean field returns proper enum value', () => {
    const f = new Field({type : 'boolean'}, options);
    expect(f.enum).toEqual([true, false]);
});

test('string conversion of field returns  its value', () => {
    const f = new Field({default : 'boolean'}, options);
    expect(f.toString()).toEqual('boolean');
});

test('accessing field value directly works in rules', () => {
    const f = new Field({default : 'test'}, {form, parent: form});
    f._initialize();
    const globals = {
        '$field' : f.getRuleNode()
    };
    let rule = "$field & ' a'";
    let node = form.ruleEngine.compileRule(rule);
    let result = form.ruleEngine.execute(node, {}, globals);
    expect(result).toEqual('test a');

    rule = "$field";
    node = form.ruleEngine.compileRule(rule);
    result = form.ruleEngine.execute(node, {}, globals, true);
    expect(result).toEqual('test');
});


test('accessing field property via $ works', () => {
    const f = new Field({default : 'test'}, {form, parent: form});
    f._initialize();
    const globals = {
        '$field' : f.getRuleNode()
    };
    const rule = "$field.$value & ' a'";
    const node = form.ruleEngine.compileRule(rule);
    const result = form.ruleEngine.execute(node, {}, globals);
    expect(result).toEqual('test a');
});

test('Updating description will trigger a change event', () => {
    const field = new Field({
        type: 'string',
        fieldType : 'text-input',
        required: true
    }, options);
    const fn = jest.fn();
    field.subscribe(fn);
    field.description = "some new description"
    expect(fn).toBeCalled()
    expect(fn.mock.calls[0][0].payload).toEqual({
        changes: [
            {
                propertyName : 'description',
                currentValue : "some new description",
                prevValue : undefined
            }
        ]
    })
})


test('Updating properties will trigger a change event', () => {
    const field = new Field({
        type: 'string',
        fieldType : 'text-input',
        required: true
    }, options);
    const fn = jest.fn();
    field.subscribe(fn);
    field.properties = {'x' : 1}
    expect(fn).toBeCalled()
    expect(fn.mock.calls[0][0].payload).toEqual({
        changes: [
            {
                propertyName : 'properties',
                currentValue : {x : 1},
                prevValue : undefined
            }
        ]
    })
})

test('Properties is accessible via rule', () => {
    const form = createFormInstance({
        items : [{
            name : 'field1',
            type : 'string',
            fieldType : 'text-input',
            properties : {
                'test' : 1
            }
        }, {
            name : 'field2',
            type : 'string',
            fieldType: 'text-input',
            properties : {
                y : 1
            },
            rules : {
                properties : "merge($field.$properties, field1.$properties)"
            }
        }]
    })

    const field2 = form.items[1]
    expect(field2.properties).toEqual({
        'test' : 1,
        y : 1
    })

    // const field = form.items[0]
    // field.properties = {'x' : 1}
    // field.subscribe((x) => {
    //     expect(x.target.properties.x).toEqual(1)
    // })
})

describe('Field Validation', () => {
    beforeEach(() => {
        form = new Form(create(['f']), new RuleEngine());
        options = {form, parent: form};
    });

    test('enum constraint without enforceEnum', () => {
        const mockValidity = [true, false][Math.floor(Math.random() * 2)];
        Constraints.enum = jest.fn().mockImplementation((c, v) => {
            return {
                value: v,
                valid: mockValidity
            };
        });
        const field = new Field({
            type: 'number',
            enum: [1, 2, 3]
        }, options);
        field.value = 4;
        expect(Constraints.enum).not.toBeCalled();
        expect(field.valid).toEqual(true);
    });

    test('enum constraint with enforceEnum', () => {
        const mockValidity = [true, false][Math.floor(Math.random() * 2)];
        Constraints.enum = jest.fn().mockImplementation((c, v) => {
            return {
                value: v,
                valid: mockValidity
            };
        });
        const field = new Field({
            type: 'number',
            enforceEnum : true,
            enum: [1, 2, 3]
        }, options);
        field.value = '4';
        expect(Constraints.enum).toBeCalledWith([1, 2, 3], 4);
        expect(field.valid).toEqual(mockValidity);
    });

    test('A required field should be invalid if value is not empty', () => {
        const types = ['number', 'string', 'boolean', 'number[]', 'string[]', 'boolean[]'];
        const values = [1, '2', true, [1], ['2'], [true]];
        const randomIndex = Math.floor(Math.random() * 6);
        const field =  new Field({
            type: types[randomIndex],
            required: true
        }, options);
        field.value = values[randomIndex];
        expect(field.valid).toEqual(true);

        field.value = null;
        expect(field.valid).toEqual(false);

        field.value = values[randomIndex];
        expect(field.valid).toEqual(true);

        //field.value = '';
        //expect(field.valid).toEqual(false);

    });

    test('A required field of array type should be invalid if value is not empty Array', () => {
        const types = ['number[]', 'string[]', 'boolean[]'];
        const values = [[1], ['2'], [true]];
        const randomIndex = Math.floor(Math.random() * 3);
        const field =  new Field({
            type: types[randomIndex],
            required: true
        }, options);
        field.value = values[randomIndex];
        expect(field.valid).toEqual(true);

        field.value = [];
        expect(field.valid).toEqual(false);
    });

    test.todo('type constraint');
    test.todo('minimum constraint');
    test.todo('maximum constraint');
    test.todo('minLength constraint');
    test.todo('maxLength constraint');
    test.todo('pattern constraint');
    test.todo('format constraint');


});
