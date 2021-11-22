import {renderHook} from '@testing-library/react-hooks';
import React from 'react';
import {IntlProvider} from 'react-intl';
import {Convertor, useRenderer} from '../../src';
export const randomString = (length: number) => {
    let result           = '';
    let characters       = 'abcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
};

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

    let dictionaries : any = '';
    // @ts-ignore
    const wrapper = ({children})=> <IntlProvider locale='en-US' messages={dictionaries}>{children}</IntlProvider>;
    //@ts-ignore
    const {result} = renderHook(() => useRenderer({':name' : 'name'}, mapper, TestComp), {wrapper});
    expect(result.current.toString()).toStrictEqual((<TestComp {...retVal} />).toString());

});