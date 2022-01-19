import {FieldJson} from '@aemforms/forms-next-core/lib';
import React, {JSXElementConstructor} from 'react';
import sanitizeHTML from 'sanitize-html';
import {Convertor} from '@aemforms/forms-next-react-bindings/lib/hooks';

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


export const richTextString = (stringMsg = '') => {
    const htmlProp = {__html : sanitizeHTML(stringMsg)};
    return (<div dangerouslySetInnerHTML={htmlProp} /> );
};

export const baseConvertor: Convertor<FieldJson> = (a, b, f) => {
    let localizedDescription = f('description');

    return {
        isHidden : a.visible === false,
        name: a.name,
        isDisabled : a.enabled === false,
        label: a.label?.visible === false ? '' : (a.label?.richText === true ? richTextString(a.label?.value) : a.label?.value),
        description: (localizedDescription && localizedDescription.length > 0) ? richTextString(localizedDescription) : null
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
        isReadOnly : a.readOnly === true,
        errorMessage: a.errorMessage
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
    const localizedOptions = f('enum');
    const localizedOptionsName = f('enumNames');
    const radio = (option : any, i : number) => {
        const value = option;
        const text = (localizedOptionsName && i < localizedOptionsName.length) ? localizedOptionsName[i] : localizedOptions[i];
        return callback( text, value);
    };

    return {
        [propertyName] : options.map(radio)
    };
};

export const inputTypeConvertor: Convertor<FieldJson> = (a, b) => {
  return {
    ...(a.type && {
      type: a.type
    })
  };
};

export const withErrorMessage = (Component: JSXElementConstructor<any>) => (props: any) => {
    return (<div className={'field'}>
        <Component {...props} />
        {(props.errorMessage || '').length > 0 ? <div className={'field-errorMessage'}>{props.errorMessage}</div> : null}
    </div>);
};