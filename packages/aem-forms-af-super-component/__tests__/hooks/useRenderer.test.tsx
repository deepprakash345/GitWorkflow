/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

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