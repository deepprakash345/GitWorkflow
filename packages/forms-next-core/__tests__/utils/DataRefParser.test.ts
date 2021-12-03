import {bracket, global$, identifier, resolveData, Token, tokenize} from '../../src/utils/DataRefParser';
import {filterTestTable} from '../matchers';
import DataGroup from '../../src/data/DataGroup';
import DataValue from '../../src/data/DataValue';

const tests = [
    ['a.b.c', [identifier('a', 0), identifier('b', 2), identifier('c', 4)]],
    ['a.bcd.c', [identifier('a', 0), identifier('bcd', 2), identifier('c', 6)]],
    ['a[123].c', [identifier('a', 0), bracket(123, 1), identifier('c', 7)]],
    ['a[123].c', [identifier('a', 0), bracket(123, 1), identifier('c', 7)]],
    ['$.a[123].c', [global$(), identifier('a', 2), bracket(123, 3), identifier('c', 9)]],
    ['$."a\'b".c', [global$(), identifier('a\'b', 2), identifier('c', 8)]],
    ['$."a.b".c', [global$(), identifier('a.b', 2), identifier('c', 8)]],
    ['$."a\\"b".c', [global$(), identifier('a"b', 2), identifier('c', 9)]],
    ['$."a*b".c', [global$(), identifier('a*b', 2), identifier('c', 8)]]
];
//@ts-ignore
test.each(tests)('dataRef %s', (a: string, b: Token[]) => {
    const tokens = tokenize(a);
    expect(tokens).toEqual(b);
});

const exceptions = [
    ['a.$'],
    ['a..b'],
    ['a.$'],
    ['[]'],
    ['x[]'],
    ['[abbcd]'],
    [']['],
    ['[]]'],
    ['[[]'],
    ['[[]]'],
    ['a[1xyz'],
    ['a[']
];

test.each(exceptions)('dataRef %s', (a) => {
    function test() {
        tokenize(a);
    }
    expect(test).toThrow();
});

const fetchTests: any[] = [
    {
        name: 'undefined value in data',
        data: {},
        dataRef: 'a',
        output: undefined
    },
    {
        name: 'top level key in data',
        data : {a: 1, b: 2},
        dataRef: 'b',
        output: new DataValue('b', 2)
    },
    {
        name: 'nested key in data',
        data : {a: {b: {c: 2, d: 3}}},
        dataRef : 'a.b.c',
        output: new DataValue('c', 2)
    },
    {
        name: 'nested key with .',
        data: {a: {'b.c': {c: 2, d: 3}}},
        dataRef: 'a."b.c".c',
        output: new DataValue('c', 2)
    },
    {
        name: 'non existing nested key with create',
        data : {},
        dataRef : 'a."b.c".c',
        create : new DataValue('c', {}),
        output: new DataValue('c', {}),
        outputData: {
            a : {
                'b.c' : {
                    c : {}
                }
            }
        }
    },
    {
        name: 'non existing key with .',
        data: {a: {'b.c': {'c': {'d': 1}}}},
        dataRef:'a."b.c".c',
        create : new DataValue('c', {}),
        output: new DataGroup('c', {'d': 1}),
        outputData: {
            a : {
                'b.c' : {
                    c : {
                        d : 1
                    }
                }
            }
        }
    },
    {
        name: 'non existing key matches a prefix of existing key having . character',
        data:{a: {b: 2}},
        dataRef : 'a."b.c".c',
        create : new DataValue('c', {}),
        output: new DataValue('c', {}),
        outputData: {
            a : {
                b : 2,
                'b.c' : {
                    c : {}
                }
            }
        }
    },
    {
        name: 'non existing key matches a prefix of existing key without . character',
        data :{a: {b: 2}},
        dataRef : 'a.x',
        create : new DataValue('x', 'simple'),
        output : new DataValue('x', 'simple'),
        outputData: {
            a : {
                b : 2,
                x: 'simple'
            }
        }
    },
    {
        name: 'key inside an array',
        data :{a: {b: [1, 2, 3]}},
        dataRef : 'a.b[1]',
        output : new DataValue('1', 2)
    },
    {
        name: 'key inside an object inside array',
        data :{a: {b: [{c: 1}, {c: 2}, {c: 3}]}},
        dataRef : 'a.b[1].c',
        output: new DataValue('c', 2)
    },
    {
        name: 'non existing index inside an array',
        data :{a: {b: [{c: 1}, {c: 2}, {c: 3}]}},
        dataRef : 'a.b[3]',
        create : new DataGroup('3', {c: 4}),
        output: new DataGroup('3', {c: 4}),
        outputData: {
            a: {
                b : [{c: 1}, {c: 2}, {c: 3}, {c: 4}]
            }
        }
    },
    {
        name: 'non existing index inside an array',
        data :{a: {b: [{c: 1}, {c: 2}, {c: 3}]}},
        dataRef : 'a.b[3].c',
        create : new DataValue('c', 4),
        output: new DataValue('c', 4),
        outputData: {
            a: {
                b : [{c: 1}, {c: 2}, {c: 3}, {c: 4}]
            }
        }
    },
    {
        name: 'key inside nested array',
        data :{a: {b: [[1, 1],[2, 2],[3, 3]]}},
        dataRef : 'a.b[1][1]',
        output: new DataValue('1', 2)
    },
    {
        name: 'key inside nested array',
        data :{a: {b: [[1, 1],[2, 2],[3, 3]]}},
        dataRef : 'a.b[1][2]',
        create: new DataValue(2, 3),
        output: new DataValue(2, 3),
        outputData: {
            a: {
                b : [[1, 1],[2, 2, 3],[3, 3]]
            }
        }
    },
    {
        name: 'key inside nested array',
        data :{a: {b: [[1, 1],[2, 2],[3, 3]]}},
        dataRef : 'a.b[3][0]',
        create: new DataValue(0, 4),
        output: new DataValue(0, 4),
        outputData: {
            a: {
                b : [[1, 1],[2, 2],[3, 3], [4]]
            }
        }
    },
    {
        name: 'element exists',
        data :{a: {b: [[1, 1],[2, 2],[3, 3]]}},
        dataRef : 'a.b[1][0]',
        create: new DataValue(0, 4),
        output: new DataValue('0', 2),
        outputData: {
            a: {
                b : [[1, 1],[2, 2],[3, 3]]
            }
        }
    }
];

test.each(filterTestTable(fetchTests))('resolveData %#', ({name, data, dataRef, create, output, outputData}) => {
    const dataModel = new DataGroup('$', data);
    const actual = resolveData(dataModel, dataRef, create);
    expect(actual).toEqual(output);
    if (outputData) {
        expect(dataModel.$value).toEqual(outputData);
    }
});