import {baseConvertor, combineConvertors, Convertor} from '../../src/utils/SpectrumMappers';
import {randomString} from './index';
import mock = jest.mock;
import {FieldJson} from '@adobe/forms-next-core/lib';

const mockHandler = {dispatchClick: () => {}, dispatchChange: (val: string) => {}};

test('combineConvertor should invoke all the convertors', () => {
    const mocks = Array(3).fill(jest.fn());
    const res = combineConvertors(...mocks);
    const input = {
        ['x' + randomString(2)] : randomString(4)
    };
    res(input, mockHandler);
    mocks.forEach((m) => {
        expect(m).toHaveBeenCalledWith(input, mockHandler);
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
    const res = combined(input, mockHandler);
    expect(Object.keys(res)).toEqual(returnValues.map(x => Object.keys(x)[0]));
    expect(Object.values(res)).toEqual(returnValues.map(x => Object.values(x)[0]));
});
const base = {
    ':id' : 'id'
};

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

const suites: Suite = {
    'baseConvertor' : {
        ':visible' : {
            func: baseConvertor,
            outProp: 'isHidden',
            tests : [[true, false], [undefined, false], ['string', false], [null, false], [1, false], [false, true]]
        },
        ':name' : {
            func: baseConvertor,
            outProp: 'name',
            tests : [[randomString(4), (inp: any) => inp]]
        },
        ':enabled' : {
            func: baseConvertor,
            outProp: 'isDisabled',
            tests : [[true, false], [undefined, false], ['string', false], [null, false], [1, false] ,[false, true]]
        },
        ':title' : {
            func: baseConvertor,
            outProp: 'label',
            tests : [[randomString(4), (inp: any) => inp]]
        },
        ':hideTitle' : {
            func: baseConvertor,
            inProps : {':title' : 'some title'},
            outProp: 'label',
            tests : [[true, ''], [false, 'some title'], [undefined, 'some title'], ['string', 'some title'],
                [null, 'some title'], [1, 'some title']]
        }
    }
};

Object.keys(suites).forEach((funcName) => {
    Object.keys(suites[funcName]).forEach(propName => {
        const obj = suites[funcName][propName];
        const otherProps = obj.inProps || {};
        test.each(obj.tests)(`${funcName} should handle ${propName} %s`, (inp, out) => {
            const input = {
                ...base,
                ...otherProps,
                [propName] : inp
            };
            const output = {
                [obj.outProp] : (typeof out === 'function') ? out(inp) : out
            };
            expect(obj.func(input, mockHandler)).toMatchObject(output);
        });
    });
});