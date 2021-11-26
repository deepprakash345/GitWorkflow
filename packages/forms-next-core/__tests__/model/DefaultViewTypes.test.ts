import Field from '../../src/Field';
import RuleEngine from '../../src/rules/RuleEngine';
import {ContainerModel, FormModel} from '../../src/types';
import {MockForm} from '../../src/utils/JsonUtils';

let form: FormModel;
let options : {form: FormModel, parent: ContainerModel};
beforeEach(() => {
    form = MockForm();
    options = {form, parent: form};
});

test('date types should default to date-input', () => {
    const f = new Field({
        type: 'string',
        format: 'date'
    }, options);
    expect(f.viewType).toEqual('date-input');
});

test('fields with boolean type should default to checkbox', () => {
    const f = new Field({
        type: 'boolean'
    }, options);
    expect(f.viewType).toEqual('checkbox');
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
    expect(f.viewType).toEqual('checkbox');

    f = new Field({
        enum: ['a']
    }, options);
    expect(f.viewType).toEqual('checkbox');
});

test('fields with enum of length greater than 2 should default to drop-down', () => {
    let f = new Field({
        enum: Array(3 + Math.floor(Math.random() * 10)).fill('a')
    }, options);
    expect(f.viewType).toEqual('drop-down');
});