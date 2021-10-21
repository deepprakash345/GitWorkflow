import {FieldJson} from '@adobe/forms-next-core/lib';
import {Handlers} from '../react-mapper/hooks';
import React, {JSXElementConstructor} from 'react';
import sanitizeHTML from 'sanitize-html';
import {TRANSLATION_ID, TRANSLATION_TOKEN} from '@adobe/forms-next-core/lib/utils/TranslationUtils';

export type Convertor<T> = (props: T, handlers: Handlers, localizedProperty: (propName: string) => string) => any

export type FieldJsonConvertor = Convertor<FieldJson>

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

export const combineConvertors = function <T>(...convertors: Convertor<T>[]) {
    const newConvertor : Convertor<T> = (a,b, f) => {
        return convertors.reduce<any>(function (newVal, curr) {
            return {
                ...newVal,
                ...curr(a, b, f)
            };
        }, {});
    };
    return newConvertor;
};


export const baseConvertor: Convertor<FieldJson> = (a, b, f) => {
    const richTextTitle = (title:string = '') => {
        const htmlProp = {__html : sanitizeHTML(title)};
        return (<div dangerouslySetInnerHTML={htmlProp} /> );
    };
    let localisedTitle =f('title'),
        localizedDescription = f('description');

    return {
        isHidden : a.visible === false,
        name: a.name,
        isDisabled : a.enabled === false,
        label: a.hideTitle === true ? '' : (a.richTextTitle === true ? richTextTitle(localisedTitle) : localisedTitle),
        description: (localizedDescription && localizedDescription.length > 0) ? richTextTitle(localizedDescription) : null
    };
};

export const constraintConvertor: Convertor<FieldJson> = (a, b) => {
    return {
        ...(a.required && {
            isRequired: true,
            necessityIndicator: 'icon'
        }),
        validationState: a.valid === false ? 'invalid' : (a.valid === undefined ? undefined : 'valid')
    };
};

export const fieldConvertor: Convertor<FieldJson> = (a, b, f) => {
    return {
        placeholder: f('placeholder'),
        value: a.value,
        validationState: a.valid === false ? 'invalid' : (a.valid === undefined ? undefined : 'valid'),
        onChange: b.dispatchChange,
        isReadOnly : a.readOnly === true
    };
};

export const stringConstraintConvertor: Convertor<FieldJson> = (a, b) => {
    return {
        minLength: a.minLength,
        maxLength: a.maxLength,
        pattern: a.pattern
    };
};

export const enumToChildConvertor = (Component: JSXElementConstructor<any>) =>  {
    return enumConvertor('children', (text, value) => {
        return <Component key={value} value={value}>{text}</Component>;
    });
};

type EnumConvertor = (x: string, y: (a: string, b: string) => any) => Convertor<FieldJson>
export const enumConvertor : EnumConvertor = (propertyName: string, callback: (text: string, value: string) => any) => (a, b, f) => {
    const options = a.enum || [];
    const optionsName = a.enumNames || options;
    const localizedOptions = f('enum');
    const localizedOptionsName = f('enumNames');
    const radio = (option : any, i : number) => {
        const value = option;
        const text = i < optionsName.length ? localizedOptionsName[i] : localizedOptions[i];
        return callback( text, value);
    };

    return {
        [propertyName] : options.map(radio)
    };
};
