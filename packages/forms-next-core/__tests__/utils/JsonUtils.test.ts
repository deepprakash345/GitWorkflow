import {getProperty, resolve} from '../../src/utils/JsonUtils';

test('getProperty returns exact name property', () => {
    const actual = getProperty({
        'prop1' : 'xyz'
    }, 'prop1', 'test');
    expect(actual).toEqual('xyz');
});

test('getProperty falls back to : prefixed property', () => {
    const actual = getProperty({
        ':prop1' : 'xyz'
    }, 'prop1', 'test');
    expect(actual).toEqual('xyz');
});

test('getProperty gives preference to exact name', () => {
    const actual = getProperty({
        ':prop1' : 'xyz',
        'prop1' : 'abc'
    }, 'prop1', 'test');
    expect(actual).toEqual('abc');
});

test('getProperty returns if property name does not exist', () => {
    const actual = getProperty({
        ':prop1' : 'xyz',
        'prop1' : 'abc'
    }, 'prop2', 'test');
    expect(actual).toEqual('test');
});

const resolveUtils : {input: any[], output: any}[] = [
    {
        input: [{}, 'a'],
        output : undefined
    },
    {
        input : [ {a: 1, b: 2}, 'b'],
        output: 2
    },
    {
        input : [ {a: { b : { c: 2, d : 3}}}, 'a.b.c'],
        output: 2
    },
    {
        input : [ {a: { 'b.c' : { c: 2, d : 3}}}, 'a."b.c".c'],
        output: 2
    },
    {
        input : [ {}, 'a."b.c".c', {}],
        output: {}
    },
    {
        input : [ {a : {'b.c' : {'c' : {'d' : 1}}}}, 'a."b.c".c', {}],
        output: {d : 1}
    },
    {
        input : [ {a : {'b.c' : {'c' : {'d' : 1}}}}, 'a."b.c".c', {'e' : 2}],
        output: {d : 1, e : 2}
    },
    {
        input : [ {a : {b: 2}}, 'a."b.c".c', {}],
        output: {}
    },
    {
        input : [ {a : {b: 2}}, 'a.x', 'simple'],
        output: 'simple'
    }
];

test.each(resolveUtils)('resolveUtils $#', ({input, output}) => {
    expect(resolve.apply(this, input as any)).toEqual(output);
});

test('resolveUtils with different data types', () => {
    const input = {a : {'b.c' : {'c' : '1234'}}};
    const output=  {d : 1};
    console.warn = jest.fn();
    const actual = resolve(input, 'a."b.c".c', {d : 1});
    expect(console.warn).toBeCalledWith('dataRef points to an element of type {string} that can\'t be merged with {object}: Overriding');
    expect(output).toEqual(actual);
});
