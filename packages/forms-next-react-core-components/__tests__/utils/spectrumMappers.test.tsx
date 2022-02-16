import {baseConvertor, combineConvertors, fieldConvertor} from '../../src/utils/SpectrumMappers';
import {randomString} from './index';
import mock = jest.mock;
import {FieldJson} from '@aemforms/crispr-core/lib';
import React from 'react';
import { Convertor } from '@aemforms/crispr-react-bindings';
export const mockHandler = {
    dispatchClick: () => {},
    dispatchChange: (val?: string) => {},
    dispatchAddItem: (id?: number) => {},
    dispatchRemoveItem: (id?: number) => {}
};
const formatMessage = (input: any) => (value: string) => {return input[value];};

test('combineConvertor should invoke all the convertors', () => {
    const mocks = Array(3).fill(jest.fn());
    const res = combineConvertors(...mocks);
    const input = {
        ['x' + randomString(2)] : randomString(4)
    };
    res(input, mockHandler, formatMessage(input));
    mocks.forEach((m) => {
        // third argument is an anonymous function
        expect(m).toHaveBeenCalledWith(input, mockHandler, expect.any(Function));
    });
});

test('combineConvertor should return the value after combining all the individual response', () => {
    const returnValues = [0,0,0].map(x => {
        return {
            [x + randomString(4)] : randomString(4)
        };
    });
    const mocks = returnValues.map(x => jest.fn().mockReturnValue(x));
    const combined = combineConvertors(...mocks);
    const input = {
        ['x' + randomString(2)] : randomString(4)
    };
    const res = combined(input, mockHandler, formatMessage(input));
    expect(Object.keys(res)).toEqual(returnValues.map(x => Object.keys(x)[0]));
    expect(Object.values(res)).toEqual(returnValues.map(x => Object.values(x)[0]));
});
const base = {};

type Suite = {
    [key: string]: {
        [key: string] : {
            func: Convertor<FieldJson>,
            outProp : string,
            inProps?: any,
            tests: any[]
        }
    }
}

const set = (obj: any, propName: string, value: any) => {
    if (propName.indexOf('.') > -1) {
        const props = propName.split('.');
        props.reduce((acc, str, index) => {
            if (index === props.length - 1) {
                acc[str] = value;
                return acc;
            } else {
                const tmp = acc[str] || {};
                acc[str] = tmp;
                return tmp;
            }
        }, obj);
        return obj;
    } else {
        return {
            ...obj,
            [propName] : value
        };
    }
};

const suites: Suite = {
    'baseConvertor' : {
        'visible' : {
            func: baseConvertor,
            outProp: 'isHidden',
            tests : [[[true,undefined, 'string, null', 1], false], [false, true]]
        },
        'name' : {
            func: baseConvertor,
            outProp: 'name',
            tests : [[randomString(4), (inp: any) => inp]]
        },
        'enabled' : {
            func: baseConvertor,
            outProp: 'isDisabled',
            tests : [[[true,undefined, 'string, null', 1], false], [false, true]]
        },
        'label.value' : {
            func: baseConvertor,
            outProp: 'label',
            tests : [[randomString(4), (inp: any) => inp]]
        },
        'label.visible' : {
            func: baseConvertor,
            inProps : {'label' : {value: 'some title'}},
            outProp: 'label',
            tests : [[false, ''], [[true,undefined, 'string', null, 1], 'some title']]
        },
        'label.richText' : {
            func: baseConvertor,
            inProps : {'label' : {value : '<script>some-title<script>'}},
            outProp: 'label',
            tests : [[[false, undefined, 'string', null, 1], '<script>some-title<script>']]
        }
    },
    'fieldConvertor' : {
        'readOnly' : {
            func: fieldConvertor,
            outProp: 'isReadOnly',
            tests : [[[false, undefined, 'string, null', 1], false], [true, true]]
        }
    }
};

Object.keys(suites).forEach((funcName) => {
    Object.keys(suites[funcName]).forEach(propName => {
        const obj = suites[funcName][propName];
        const otherProps = obj.inProps || {};
        const tests: any[] = obj.tests.reduce((acc, test) => {
            if (test[0] instanceof Array) {
                return  acc.concat(test[0].map(x => [x, test[1]]));
            } else {
                return acc.concat([test]);
            }
        }, []);
        test.each(tests)(`${funcName} should handle ${propName} %s`, (inputValue, expectedValue) => {
            const fieldObject = set({...base, ...otherProps}, propName, inputValue);
            const output = {
                [obj.outProp] : (typeof expectedValue === 'function') ? expectedValue(inputValue) : expectedValue
            };
            expect(obj.func(fieldObject, mockHandler, formatMessage(fieldObject))).toMatchObject(output);
        });
    });
});

test('richTextTitle should strip script tags', () => {
    let html = '<script>text</script><b>text</b>';
    let state = {
        ...base,
        'label' : {
            value: html,
            richText: true
        }
    };
    let res = baseConvertor(state, mockHandler, formatMessage(state));
    expect(res).toMatchObject({
        label: <div dangerouslySetInnerHTML={{'__html': '<b>text</b>'}} />
    });
});

test('richTextTitle should strip onerror attribute in img,video', () => {
    let html = '<img onerror="somejavascript" /><b>text</b>';
    let state = {
        ...base,
        'label' : {
            value: html,
            richText: true
        }
    };
    let res = baseConvertor(state, mockHandler, formatMessage(state));
    expect(res).toMatchObject({
        label: <div dangerouslySetInnerHTML={{'__html': '<b>text</b>'}} />
    });
    state = {
        ...base,
        'label' : {
            value: html,
            richText: true
        }
    };
    html = '<video onerror="somejavascript" /><b>text</b>';
    res = baseConvertor(state, mockHandler, formatMessage(state));
    expect(res).toMatchObject({
        label: <div dangerouslySetInnerHTML={{'__html': '<b>text</b>'}} />
    });
});

test.todo('richTextTitle should allow src attribute in img,video');/*, () => {
    let html = '<img src="someurl" /><b>text</b>';
    let res = baseConvertor({...base, 'richTextTitle' : true, 'title': html}, mockHandler);
    expect(res).toMatchObject({
        label: <div dangerouslySetInnerHTML={{'__html': '<img src="someurl"/><b>text</b>'}} />
    });

    html = '<video src="someurl" /><b>text</b>';
    res = baseConvertor({...base, 'richTextTitle' : true, 'title': html}, mockHandler);
    expect(res).toMatchObject({
        label: <div dangerouslySetInnerHTML={{'__html': '<video src="someurl" /><b>text</b>'}} />
    });
});*/

test('description should strip script tags', () => {
    let html = '<script>text</script><b>text</b>';
    let state = {...base, 'description': html};
    let res = baseConvertor(state, mockHandler, formatMessage(state));
    expect(res).toMatchObject({
        description: <div dangerouslySetInnerHTML={{'__html': '<b>text</b>'}} />
    });
});

test('description should strip onerror attribute in img,video', () => {
    let html = '<img onerror="somejavascript" /><b>text</b>';
    let state: any= {...base,'description': html};
    let res = baseConvertor(state, mockHandler, formatMessage(state));
    expect(res).toMatchObject({
        description: <div dangerouslySetInnerHTML={{'__html': '<b>text</b>'}} />
    });

    html = '<video onerror="somejavascript" /><b>text</b>';
    state = {
        ...base,
        'label' : {
            value: html,
            richText: true
        }
    };
    res = baseConvertor(state, mockHandler, formatMessage(state));
    expect(res).toMatchObject({
        label: <div dangerouslySetInnerHTML={{'__html': '<b>text</b>'}} />
    });
});

test.todo('description should allow src attribute in img,video');/*, () => {
    let html = '<img src="someurl" /><b>text</b>';
    let res = baseConvertor({...base, 'description': html}, mockHandler);
    expect(res).toMatchObject({
        description: <div dangerouslySetInnerHTML={{'__html': '<img src="someurl"/><b>text</b>'}} />
    });

    html = '<video src="someurl" /><b>text</b>';
    res = baseConvertor({...base, 'description': html}, mockHandler);
    expect(res).toMatchObject({
        description: <div dangerouslySetInnerHTML={{'__html': '<video src="someurl" /><b>text</b>'}} />
    });
});*/