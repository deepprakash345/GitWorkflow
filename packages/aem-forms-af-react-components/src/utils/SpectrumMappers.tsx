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

import {checkIfConstraintsArePresent, FieldJson} from '@adobe/aem-forms-af-core';
import React, {JSXElementConstructor} from 'react';
import sanitizeHTML from 'sanitize-html';
import {Convertor, useFormIntl} from '@adobe/aem-forms-af-react-renderer';
import '../styles.css';
import clsx from 'clsx';
import {isEmpty} from '@adobe/aem-forms-af-core/lib/utils/FormUtils';

const DEFAULT_ERROR_MESSAGE = 'There is an error in the field';

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
    const layout = a?.properties?.['afs:layout'] || {};

    return {
        ...layout,
        isHidden : a.visible === false,
        name: a.name,
        isDisabled : a.enabled === false,
        label: a.label?.visible === false ? '' : (a.label?.richText === true ? richTextString(a.label?.value) : a.label?.value),
        description: (localizedDescription && localizedDescription.length > 0) ? richTextString(localizedDescription) : null,
        'aria-label' : a.label?.visible === false ? a.label?.value : undefined
    };
};

export const constraintConvertor: Convertor<FieldJson> = (a) => {
    // if there are no constraints and type is string, valid would anyways always be true, hence validationState would be optional
    const optionalValidation = !checkIfConstraintsArePresent(a) && a.type === 'string';
    return {
        ...(a.required && {
            isRequired: true,
            necessityIndicator: 'icon'
        }),
        validationState: a.valid === false ? 'invalid' : ((a.valid === undefined  || isEmpty(a.value) || optionalValidation) ? undefined : 'valid')
    };
};

export const fieldConvertor: Convertor<FieldJson> = (a, b, f) => {
  const i18n = useFormIntl();
  const formatedMessage = i18n.formatMessage({ id: 'defaultErrorMessage', defaultMessage: DEFAULT_ERROR_MESSAGE });
  const errorMessage = a.errorMessage === '' && a.valid === false ? formatedMessage : a.errorMessage;
    // if there are no constraints and type is string, valid would anyways always be true, hence validationState would be optional
  const optionalValidation = !checkIfConstraintsArePresent(a) && a.type === 'string';
  return {
        placeholder: f('placeholder'),
        value: a.value == null ? '' : a.value,
        validationState: a.valid === false ? 'invalid' : ((a.valid === undefined  || isEmpty(a.value) || optionalValidation) ? undefined : 'valid'),
        onChange: b.dispatchChange, // Handler that is called when the value changes.
        onBlur : b.dispatchBlur, //Handler that is called when the element loses focus.
        isReadOnly : a.readOnly === true,
        errorMessage
  };
};

export const stringConstraintConvertor: Convertor<FieldJson> = (a) => {
    return {
        minLength: a.minLength,
        maxLength: a.maxLength,
        pattern: a.pattern
    };
};

export const enumToChildConvertor = (Component: JSXElementConstructor<any>) =>  {
    return enumConvertor('children', (text, value) => {
        return <Component key={value} value={value}>{text + ''}</Component>;
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

export const inputTypeConvertor: Convertor<FieldJson> = (a) => {
  return {
    ...(a.type && {
      type: a.type
    })
  };
};

export const withErrorMessage = (Component: JSXElementConstructor<any>) => (props: any) => {
    const invalid = props.validationState === 'invalid';
    const helpText = invalid ? props.errorMessage || '' : props.description;
    const hasHelpText = (typeof helpText === 'string' && helpText.length > 0) || helpText != null;
    return (<div className={clsx('formField', invalid && 'formField--invalid')}>
        <Component {...props} />
        { hasHelpText ? <div className={'formField__helpText'}>{helpText}</div> : null}
    </div>);
};