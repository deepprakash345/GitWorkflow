import {bracket, global$, identifier, resolveData, Token, tokenize} from '../../src/utils/DataRefParser';
import {filterTestTable} from '../matchers';

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
        output: {result: undefined, parent: {}}
    },
    {
        name: 'top level key in data',
        data : {a: 1, b: 2},
        dataRef: 'b',
        output: {result: 2, parent: {a: 1, b: 2}}
    },
    {
        name: 'nested key in data',
        data : {a: {b: {c: 2, d: 3}}},
        dataRef : 'a.b.c',
        output: {result: 2, parent: {c: 2, d: 3}}
    },
    {
        name: 'nested key with .',
        data: {a: {'b.c': {c: 2, d: 3}}},
        dataRef: 'a."b.c".c',
        output: {result: 2, parent: {c: 2, d: 3}}
    },
    {
        name: 'non existing nested key with create',
        data : {},
        dataRef : 'a."b.c".c',
        create : {},
        output: {
            result: {},
            parent: {c : {}}
        }
    },
    {
        name: 'non existing key with .',
        data: {a: {'b.c': {'c': {'d': 1}}}},
        dataRef:'a."b.c".c',
        create : {},
        output: {
            result: {d: 1},
            parent: {'c': {'d': 1}}
        }
    },
    {
        name: 'non existing key matches a prefix of existing key having . character',
        data:{a: {b: 2}},
        dataRef : 'a."b.c".c',
        create : {},
        output: {
            result: {},
            parent: {c : {}}
        }
    },
    {
        name: 'non existing key matches a prefix of existing key without . character',
        data :{a: {b: 2}},
        dataRef : 'a.x',
        create : 'simple',
        output: {
            result :'simple',
            parent: {b : 2, x: 'simple'}
        }
    },
    {
        name: 'key inside an array',
        data :{a: {b: [1, 2, 3]}},
        dataRef : 'a.b[1]',
        output: {
            result :2,
            parent: [1, 2, 3]
        }
    },
    {
        name: 'key inside an object inside array',
        data :{a: {b: [{c: 1}, {c: 2}, {c: 3}]}},
        dataRef : 'a.b[1].c',
        output: {
            result: 2,
            parent: {c: 2}
        }
    },
    {
        name: 'non existing index inside an array',
        data :{a: {b: [{c: 1}, {c: 2}, {c: 3}]}},
        dataRef : 'a.b[3]',
        create : {c: 4},
        output: {
            result: {c: 4},
            parent: [{c: 1}, {c: 2}, {c: 3}, {c: 4}]
        }
    },
    {
        name: 'non existing index inside an array',
        data :{a: {b: [{c: 1}, {c: 2}, {c: 3}]}},
        dataRef : 'a.b[3].c',
        create : 4,
        output: {
            result: 4,
            parent: {c: 4}
        }
    },
    {
        name: 'key inside nested array',
        data :{a: {b: [[1, 1],[2, 2],[3, 3]]}},
        dataRef : 'a.b[1][1]',
        output: {
            result: 2,
            parent: [2, 2]
        }
    },
    {
        name: 'key inside nested array',
        data :{a: {b: [[1, 1],[2, 2],[3, 3]]}},
        dataRef : 'a.b[1][2]',
        create: 3,
        output: {
            result: 3,
            parent: [2, 2, 3]
        }
    },
    {
        name: 'key inside nested array',
        data :{a: {b: [[1, 1],[2, 2],[3, 3]]}},
        dataRef : 'a.b[3][0]',
        create: 4,
        output: {
            result: 4,
            parent: [4]
        }
    },
    {
        name: 'element exists',
        data :{a: {b: [[1, 1],[2, 2],[3, 3]]}},
        dataRef : 'a.b[1][0]',
        create: 4,
        output: {
            result: 2,
            parent: [2, 2]
        }
    }
];

test.each(filterTestTable(fetchTests))('resolveData %#', ({name, data, dataRef, create, output, outputData}) => {
    expect(resolveData(data, dataRef, create)).toEqual(output);
    if (outputData) {
        expect(data).toEqual(outputData);
    }
});