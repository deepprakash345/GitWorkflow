import {deepClone, getProperty, isCheckbox, isCheckboxGroup, resolve} from '../../src/utils/JsonUtils';
import {randomWord} from '../collateral';

test('getProperty returns exact name property', () => {
    const actual = getProperty({
        'prop1': 'xyz'
    }, 'prop1', 'test');
    expect(actual).toEqual('xyz');
});

test('getProperty falls back to : prefixed property', () => {
    const actual = getProperty({
        ':prop1': 'xyz'
    }, 'prop1', 'test');
    expect(actual).toEqual('xyz');
});

test('getProperty gives preference to exact name', () => {
    const actual = getProperty({
        ':prop1': 'xyz',
        'prop1': 'abc'
    }, 'prop1', 'test');
    expect(actual).toEqual('abc');
});

test('getProperty returns if property name does not exist', () => {
    const actual = getProperty({
        ':prop1': 'xyz',
        'prop1': 'abc'
    }, 'prop2', 'test');
    expect(actual).toEqual('test');
});

const resolveUtils: { input: any[], output: any }[] = [
    {
        input: [{}, 'a'],
        output: undefined
    },
    {
        input: [{a: 1, b: 2}, 'b'],
        output: 2
    },
    {
        input: [{a: {b: {c: 2, d: 3}}}, 'a.b.c'],
        output: 2
    },
    {
        input: [{a: {'b.c': {c: 2, d: 3}}}, 'a."b.c".c'],
        output: 2
    },
    {
        input: [{}, 'a."b.c".c', {}],
        output: {}
    },
    {
        input: [{a: {'b.c': {'c': {'d': 1}}}}, 'a."b.c".c', {}],
        output: {d: 1}
    },
    {
        input: [{a: {'b.c': {'c': {'d': 1}}}}, 'a."b.c".c', {'e': 2}],
        output: {d: 1, e: 2}
    },
    {
        input: [{a: {b: 2}}, 'a."b.c".c', {}],
        output: {}
    },
    {
        input: [{a: {b: 2}}, 'a.x', 'simple'],
        output: 'simple'
    }
];

test.each(resolveUtils)('resolveUtils $#', ({input, output}) => {
    expect(resolve.apply(this, input as any)).toEqual(output);
});

test('resolveUtils with different data types', () => {
    const input = {a: {'b.c': {'c': '1234'}}};
    const output = {d: 1};
    console.warn = jest.fn();
    const actual = resolve(input, 'a."b.c".c', {d: 1});
    expect(console.warn).toBeCalledWith('dataRef points to an element of type {string} that can\'t be merged with {object}: Overriding');
    expect(output).toEqual(actual);
});

test('deepClone an array', () => {
    const input = [1, 2, 3];
    const output = deepClone(input);
    input[0] = 3;
    expect(output[0]).toEqual(1);
});

test('deepClone an object', () => {
    const input = {
        a: 1,
        b: 2
    };
    const output = deepClone(input);
    input.a = 3;
    expect(output.a).toEqual(1);
});

test('deepClone an object with subarray', () => {
    const input = {
        a: 1,
        b: [1, 2, 3]
    };
    const output = deepClone(input);
    input.b[0] = 3;
    expect(output.b).toEqual([1, 2, 3]);
});


test('deepClone an object with nested object', () => {
    const input = {
        a: 1,
        b: {
            x : {
                a : 1
            }
        }
    };
    const output = deepClone(input);
    input.b.x.a = 3;
    expect(output.b.x.a).toEqual(1);
});


test('deepClone an object with null value', () => {
    const input = {
        a: 1,
        b: {
            x : {
                a : null
            }
        }
    };
    const output = deepClone(input);
    //@ts-ignore
    input.b.x.a = 3;
    expect(output.b.x.a).toEqual(null);
});

test('isCheckbox should return true for fields whose viewType map to checkbox', () => {
    expect(isCheckbox({
        type: 'boolean'
    })).toEqual(true);

    expect(isCheckbox({
        enum: ['0', '1']
    })).toEqual(true);

    expect(isCheckbox({
        enum: ['0']
    })).toEqual(true);
});

test('isCheckbox should return true for checkbox', () => {
    expect(isCheckbox({
       viewType: 'checkbox'
    })).toEqual(true);
});

test('isCheckbox should not return true for non checkbox viewTypes', () => {
    const x = randomWord(1, 'c') + randomWord(Math.random()*10);
    expect(isCheckbox({
        viewType: x
    })).toEqual(false);

    expect(isCheckbox({
        type: 'string'
    })).toEqual(false);

    expect(isCheckbox({
        type: 'number'
    })).toEqual(false);

    expect(isCheckbox({
        enum: ['0', '1', '2']
    })).toEqual(false);
});

test('isCheckboxGroup should return true for checkbox-group', () => {
    expect(isCheckboxGroup({
        viewType: 'checkbox-group'
    })).toEqual(true);
});

test('isCheckboxGroup should not return true non checkbox-group viewTypes', () => {
    const x = randomWord(1, 'c') + randomWord(Math.random()*10);
    expect(isCheckboxGroup({
        viewType: x
    })).toEqual(false);

    expect(isCheckboxGroup({
        viewType: 'checkbox'
    })).toEqual(false);

    expect(isCheckboxGroup({
        type: 'string'
    })).toEqual(false);

    expect(isCheckboxGroup({
        type: 'number'
    })).toEqual(false);

    expect(isCheckboxGroup({
        enum: ['0', '1', '2']
    })).toEqual(false);
});
