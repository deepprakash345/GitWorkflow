import {getProperty} from '../../utils/JsonUtils';

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