import {Convertor} from '../../src/utils/SpectrumMappers';
import {useRenderer} from '../../src/react-mapper/hooks';
import {renderHook} from '@testing-library/react-hooks';
import React from 'react';
import {randomString} from '../utils';
it('useRenderer should be able to render any component', () => {
    const TestComp = (props: any) => {
        return <div>{props.someKey}</div>;
    };

    const retVal = {
        [randomString(2)] : randomString(5),
        [randomString(2)] : randomString(5),
        [randomString(2)] : randomString(5)
    };

    const mapper: Convertor<any> = (a, b) => {
        return retVal;
    };

    const {result} = renderHook(() => useRenderer({':name' : 'name'}, mapper, TestComp));
    expect(result.current.toString()).toStrictEqual((<TestComp {...retVal} />).toString());

});