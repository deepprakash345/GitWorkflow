import {FieldJson} from '@adobe/forms-next-core/lib';
import {Handlers} from '../react-mapper/hooks';
import React, {JSXElementConstructor} from 'react';
import sanitizeHTML from 'sanitize-html';

export type Convertor<T> = (props: T, handlers: Handlers) => any

export type FieldJsonConvertor = Convertor<FieldJson>

export const combineConvertors = function <T>(...convertors: Convertor<T>[]) {
    const newConvertor : Convertor<T> = (a,b) => {
        return convertors.reduce<any>(function (newVal, curr) {
            return {
                ...newVal,
                ...curr(a, b)
            };
        }, {});
    };
    return newConvertor;
};


export const baseConvertor: Convertor<FieldJson> = (a, b) => {

    const richTextTitle = (title:string = '') => {
        const htmlProp = {__html : sanitizeHTML(title)};
        return (<div dangerouslySetInnerHTML={htmlProp} /> );
    };

    return {
        isHidden : a.visible === false,
        name: a.name,
        isDisabled : a.enabled === false,
        label: a.hideTitle === true ? '' : (a.richTextTitle === true ? richTextTitle(a.title) : a.title),
        description: (a.description && a.description.length > 0) ? richTextTitle(a.description) : null
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

export const fieldConvertor: Convertor<FieldJson> = (a, b) => {
    return {
        placeholder: a.placeholder,
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
export const enumConvertor : EnumConvertor = (propertyName: string, callback: (text: string, value: string) => any) => (a, b) => {
    const options = a.enum || [];
    const optionsName = a.enumNames || options;
    const radio = (option : any, i : number) => {
        const value = option;
        const text = i < optionsName.length ? optionsName[i] : option;
        return callback(text, value);
    };

    return {
        [propertyName] : options.map(radio)
    };
};
