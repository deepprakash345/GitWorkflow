import {deepClone, getProperty, isCheckbox, isCheckboxGroup} from '../../src/utils/JsonUtils';
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

test('isCheckbox should return true for fields whose fieldType map to checkbox', () => {
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
       fieldType: 'checkbox'
    })).toEqual(true);
});

test('isCheckbox should not return true for non checkbox fieldTypes', () => {
    const x = randomWord(1, 'c') + randomWord(Math.random()*10);
    expect(isCheckbox({
        fieldType: x
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
        fieldType: 'checkbox-group'
    })).toEqual(true);
});

test('isCheckboxGroup should not return true non checkbox-group fieldTypes', () => {
    const x = randomWord(1, 'c') + randomWord(Math.random()*10);
    expect(isCheckboxGroup({
        fieldType: x
    })).toEqual(false);

    expect(isCheckboxGroup({
        fieldType: 'checkbox'
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
