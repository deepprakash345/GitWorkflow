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

import {FieldJson, State, TRANSLATION_ID, TRANSLATION_TOKEN, CUSTOM_PROPS_KEY} from '@adobe/aem-forms-af-core';
import React, {JSXElementConstructor} from 'react';
import {useIntl} from 'react-intl';
import {Handlers, useFocus, useRuleEngine} from './useRuleEngine';

export type Convertor<T> = (props: T, handlers: Handlers, localizedProperty: (propName: string) => string) => any

export const translateMessage = (obj: any, formatMessage: any) => (propName: string) => {
    // todo: need to handle enumNames in a special manner here
    let value = obj[propName];
    if (obj?.[CUSTOM_PROPS_KEY]?.[TRANSLATION_ID]?.[propName]) {
        let identifier = obj?.[CUSTOM_PROPS_KEY]?.[TRANSLATION_ID]?.[propName];
        if (value instanceof Array) {
            value = value.map((x, index) => {
                let tempId = `${identifier}${TRANSLATION_TOKEN}${index}`;
                let temp = formatMessage({'id': tempId});
                return temp === tempId ? x : temp;
            });
        } else {
            value = obj[propName] ? formatMessage({'id': identifier}) : '';
            // if id is the value, fall back to the original value
            if (value === identifier) {
                value = obj[propName];
            }
        }
    }
    return value;
};

export const useFormIntl = function () {
    let obj: any;
    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        obj = useIntl();
    } catch (e) {
        console.warn('Use Intl Failed. Localization would not work');
        obj = {
            formatMessage:  (a:any) => { return a;}
        };
    }
    return obj;
};

/**
 * Binds the component to the Form element whose state is being provided
 * @param formFieldState  The state of the Field received from Adaptive Form Component
 * @param propsMapper Mapping Field State to Props of the component
 * @param Component The component to render.
 * @param wrap
 */
export const useRenderer = function(formFieldState: State<FieldJson>,
                                    Component: JSXElementConstructor<any>,
                                    propsMapper: Convertor<any> = (a) => a,
                                    wrap:boolean = false)  {
    const [state, handlers] = useRuleEngine(formFieldState);
    const i18n = useFormIntl();
    const [ref] = useFocus(formFieldState);
    const res = propsMapper(state, handlers, translateMessage(state, i18n.formatMessage));
    return (wrap ? (<div className={'field'}><Component {...res} ref={ref} /></div>) : <Component {...res} ref={ref} />);
};
