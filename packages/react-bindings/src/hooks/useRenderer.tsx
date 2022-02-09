import {FieldJson, TRANSLATION_ID, TRANSLATION_TOKEN} from '@aemforms/forms-next-core/lib';
import React, {JSXElementConstructor} from 'react';
import {useIntl} from 'react-intl';
import {Handlers, useRuleEngine} from './useRuleEngine';

export type Convertor<T> = (props: T, handlers: Handlers, localizedProperty: (propName: string) => string) => any

export const translateMessage = (obj: any, formatMessage: any) => (propName: string) => {
    // todo: need to handle enumNames in a special manner here
    let value = obj[propName];
    if (obj?.[TRANSLATION_ID]?.[propName]) {
        let identifier = obj?.[TRANSLATION_ID]?.[propName];
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
export const useRenderer = function(formFieldState:FieldJson & {id: string},
                                    Component: JSXElementConstructor<any>,
                                    propsMapper: Convertor<any> = (a, b, c) => a,
                                    wrap:boolean = false)  {
    const [state, handlers] = useRuleEngine(formFieldState);
    const i18n = useFormIntl();
    const res = propsMapper(state, handlers, translateMessage(state, i18n.formatMessage));
    return (wrap ? (<div className={'field'}><Component {...res} /></div>) : <Component {...res} />);
};