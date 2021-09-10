import {FieldJson} from '@adobe/forms-next-core/lib';
import {Handlers} from '../react-mapper/hooks';
import {Radio} from '@adobe/react-spectrum';
import React from 'react';
import sanitizeHTML from 'sanitize-html';

export type Convertor<T> = (props: T, handlers: Handlers) => any

export type FieldJsonConvertor = Convertor<FieldJson>

export const combineConvertors = function combineConvertors<T>(...convertors: Convertor<T>[]) {
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
        isHidden : a[':visible'] === false,
        name: a[':name'],
        isDisabled : a[':enabled'] === false,
        label: a[':hideTitle'] === true ? '' : (a[':richTextTitle'] === true ? richTextTitle(a[':title']) : a[':title'])
    };
};

export const constraintConvertor: Convertor<FieldJson> = (a, b) => {
    return {
        ...(a[':constraints'] && a[':constraints'][':required'] && {
            isRequired: true,
            necessityIndicator: 'icon'
        }),
        validationState: a[':valid'] === false ? 'invalid' : (a[':valid'] === undefined ? undefined : 'valid')
    };
};

export const fieldConvertor: Convertor<FieldJson> = (a, b) => {
    return {
        placeholder: a[':placeholder'],
        value: a[':value'],
        validationState: a[':valid'] === false ? 'invalid' : (a[':valid'] === undefined ? undefined : 'valid'),
        onChange: b.dispatchChange
    };
};

export const stringConstraintConvertor: Convertor<FieldJson> = (a, b) => {
    return {
        minLength: a[':constraints']?.[':minLength'],
        maxLength: a[':constraints']?.[':maxLength'],
        pattern: a[':constraints']?.[':pattern']
    };
};

export const optionsToChildConvertor: Convertor<FieldJson> = (a, b) => {
    const options = a[':constraints']?.[':options'] || [];
    const radio = (option : any) => {
        const value = option[':value'];
        const text = option[':text'] || '';
        return <Radio key={JSON.stringify(option)} value={value}>{text}</Radio>;
    };

    return {
        children : options.map(radio)
    };
};