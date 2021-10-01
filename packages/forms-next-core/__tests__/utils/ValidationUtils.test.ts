import {Constraints} from '../../src/utils/ValidationUtils';
import {OptionJson} from '../../src/types';

type TestCase = {
    name?: string
    value: string,
    valid: boolean,
    cval: any
}

const dataTypeValidations: { [key: string]: TestCase[] } = {
    'string': [
        {
            'name': 'a valid string should pass validation',
            'value': '123',
            valid: true,
            cval: '123'
        },
        {
            'name': 'an empty string should pass validation',
            'value': '',
            valid: true, cval: ''
        }],
    'number': [
        {
            'value': '123',
            valid: true,
            cval: 123
        },
        {
            'value': '123.01',
            valid: true,
            cval: 123.01
        },
        {
            'value': '12e10',
            valid: true,
            cval: 12e10
        },
        {
            'value': '12e-10',
            valid: true,
            cval: 12e-10
        },
        {
            'value': '-',
            valid: false,
            cval: '-'
        },
        {
            'value': '-10',
            valid: true,
            cval: -10
        },
        {
            'value': '-10e10',
            valid: true,
            cval: -10e10
        },
        {
            'value': '-10e-10',
            valid: true,
            cval: -10e-10
        },
        {
            'value': 'true',
            valid: false,
            cval: 'true'
        },
        {
            'value': '',
            valid: false,
            cval: ''
        }],
    'boolean': [
        {
            'value': 'true',
            valid: true,
            cval: true
        },
        {
            'value': 'false',
            valid: true,
            cval: false
        },
        {
            'value': '',
            valid: false,
            cval: ''
        },
        {
            'value': '10',
            valid: false,
            cval: '10'
        },
        {
            'value': 'string',
            valid: false,
            cval: 'string'
        }
    ],
    integer: [
        {
            'value': '123',
            valid: true,
            cval: 123
        },
        {
            'value': '123.01',
            valid: false,
            cval: '123.01'
        },
        {
            'value': '12e10',
            valid: true,
            cval: 12e10
        },
        {
            'value': '12e-10',
            valid: false,
            cval: '12e-10'
        },
        {
            'value': '-',
            valid: false,
            cval: '-'
        },
        {
            'value': '-10',
            valid: true,
            cval: -10
        },
        {
            'value': '-10e10',
            valid: true,
            cval: -10e10
        },
        {
            'value': '-10e-10',
            valid: false,
            cval: '-10e-10'
        },
        {
            'value': 'true',
            valid: false,
            cval: 'true'
        },
        {
            'value': '',
            valid: false,
            cval: ''
        }
    ]
};

const testConstraint = (type: string) => ({value, valid, cval}: TestCase) => {
    const res = Constraints.dataType(type, value);
    expect(res.valid).toEqual(valid);
    expect(res.value).toEqual(cval);
};
test.each(dataTypeValidations.string)('string: $value should return $valid', testConstraint('string'));
test.each(dataTypeValidations.number)('number: $value should return $valid', testConstraint('number'));
test.each(dataTypeValidations.boolean)('boolean: $value should return $valid', testConstraint('boolean'));
test.each(dataTypeValidations.integer)('integer: $value should return $valid', testConstraint('integer'));

describe('formatTest - valid dates', () => {
     const tests = ['2010-10-10',
         '2010-01-01',
         '2010-1-1',
         '2010-1-10',
         '2010-1-31',
         '2010-2-28',
         '2020-2-29',
         '2010-3-31',
         '2010-4-30',
         '2010-5-31',
         '2010-6-30',
         '2010-7-31',
         '2010-8-31',
         '2010-9-30',
         '2010-10-31',
         '2010-11-30',
         '2010-12-31'
     ];
     test.each(tests)('%s', (value) => {
        const res = Constraints.format('date', value);
        expect(res.value).toEqual(value);
        expect(res.valid).toEqual(true);
    });
});

describe('format test - invalid dates', () => {
    const tests = ['20100-10-10',
        '10-10-20',
        '2010-111-1',
        '2010-10-101',
        '2020-00-00',
        '2020-13-14',
        '2020-13-32',
        '2020-01-32',
        '2100-02-29',
        '2019-02-29',
        '2020-03-32',
        '2020-04-31',
        '2020-05-32',
        '2020-06-31',
        '2020-07-32',
        '2020-08-32',
        '2020-09-31',
        '2020-10-32',
        '2020-11-31',
        '2020-12-32'
    ];
    test.each(tests)('%s', (value) => {
        const res = Constraints.format('date', value);
        expect(res.value).toEqual(value);
        expect(res.valid).toEqual(false);
    });
});

test('minimum test should fail if value is less than or equal to minimum', () => {
    let res = Constraints.minimum(2, 0);
    expect(res.valid).toEqual(false);
    expect(res.value).toEqual(0);

    res = Constraints.minimum(2, -2);
    expect(res.valid).toEqual(false);
    expect(res.value).toEqual(-2);

    res = Constraints.minimum(2, 2);
    expect(res.valid).toEqual(false);
    expect(res.value).toEqual(2);

});

test('minimum test should pass if value is greater than minimum', () => {
    let res = Constraints.minimum(2, 4);
    expect(res.valid).toEqual(true);
    expect(res.value).toEqual(4);
});

test('maximum test should fail if value is greater than or equal to maximum', () => {
    let res = Constraints.maximum(2, 4);
    expect(res.valid).toEqual(false);
    expect(res.value).toEqual(4);

    res = Constraints.maximum(-2, 2);
    expect(res.valid).toEqual(false);
    expect(res.value).toEqual(2);

    res = Constraints.maximum(2, 2);
    expect(res.valid).toEqual(false);
    expect(res.value).toEqual(2);

});

test('maximum test should pass if value is less than maximum', () => {
    let res = Constraints.maximum(3, 2);
    expect(res.valid).toEqual(true);
    expect(res.value).toEqual(2);

    res = Constraints.maximum(2, -4);
    expect(res.valid).toEqual(true);
    expect(res.value).toEqual(-4);
});


test('minLength test should fail if length of string is less than or equal to minLength', () => {
    let res = Constraints.minLength(2, '');
    expect(res.valid).toEqual(false);
    expect(res.value).toEqual('');

    res = Constraints.minLength(4, 'abc');
    expect(res.valid).toEqual(false);
    expect(res.value).toEqual('abc');

    res = Constraints.minLength(4, 'abcd');
    expect(res.valid).toEqual(false);
    expect(res.value).toEqual('abcd');

});

test('minLength test should pass if length of string is greater than minLength', () => {
    let res = Constraints.minLength(2, 'abc');
    expect(res.valid).toEqual(true);
    expect(res.value).toEqual('abc');
});

test('maxLength test should fail if length of string is greater than or equal to maximum', () => {
    let res = Constraints.maxLength(2, 'abc');
    expect(res.valid).toEqual(false);
    expect(res.value).toEqual('abc');

    res = Constraints.maxLength(1, 'ab');
    expect(res.valid).toEqual(false);
    expect(res.value).toEqual('ab');

    res = Constraints.maxLength(2, 'ab');
    expect(res.valid).toEqual(false);
    expect(res.value).toEqual('ab');

});

test('maxLength test should pass if length of string is less than maximum', () => {
    let res = Constraints.maxLength(3, 'ab');
    expect(res.valid).toEqual(true);
    expect(res.value).toEqual('ab');

    res = Constraints.maxLength(3, '');
    expect(res.valid).toEqual(true);
    expect(res.value).toEqual('');
});

const randomString = (length: number) => {
    let result           = '';
    let characters       = 'abcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
};

test('pattern test should validate against the regex', () => {
   const regex = /[a-z]{4,6}/;
   const l = Math.floor(Math.random() * 10);
   const string = randomString(l);
   const res = Constraints.pattern(regex, string);
   expect(res.valid).toEqual(regex.test(string));
   expect(res.value).toEqual(string);
});

test('pattern test should validate against the string regex', () => {
    const regex = '[a-z]{4,6}';
    const l = Math.floor(Math.random() * 10);
    const string = randomString(l);
    const res = Constraints.pattern(regex, string);
    expect(res.valid).toEqual(new RegExp(regex).test(string));
    expect(res.value).toEqual(string);
});


test('required test should pass if value is not empty', () => {
    expect(Constraints.required(true, 'varun').valid).toEqual(true);
});

test('required test should pass if the constraint is false', () => {
    const l = Math.floor(Math.random() * 10);
    const string = randomString(l);
    expect(Constraints.required(false, string).valid).toEqual(true);
    expect(Constraints.required(false, null).valid).toEqual(true);
});


test('required test should fail if the value is null or empty', () => {
    expect(Constraints.required(true, null).valid).toEqual(false);
    expect(Constraints.required(true, '').valid).toEqual(false);
});

test('options constraint should pass if value exists inside options', () => {
    let options: OptionJson[] = [{
        ':value' : 0
    }, {
        ':value' :  1
    }];
    expect(Constraints.options(options, 0).valid).toEqual(true);

    options = [{
        ':value' : 'a'
    }, {
        ':value' :  'b'
    }];
    expect(Constraints.options(options, 'a').valid).toEqual(true);
});

test("options constraint should fail if value doesn't exists inside options", () => {
    let options: OptionJson[] = [{
        ':value' : 0
    }, {
        ':value' :  1
    }];
    expect(Constraints.options(options, -1).valid).toEqual(false);
    expect(Constraints.options(options, 2).valid).toEqual(false);

    options = [{
        ':value' : 'a'
    }, {
        ':value' :  'b'
    }];
    expect(Constraints.options(options, 'c').valid).toEqual(false);
});
