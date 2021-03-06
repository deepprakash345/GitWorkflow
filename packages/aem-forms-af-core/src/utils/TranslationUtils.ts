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

/**
 * Defines generic utilities to translated form model definition
 */
// todo: The API's defined in this file could move to a different package later on
import {FieldJson, FieldsetJson, FormJson, translationProps} from '../types';

/** Token used while creating translation specific properties from `adaptive form specification` */
export const TRANSLATION_TOKEN  = '##';
/** Name of the object which holds all translation specific properties */
export const TRANSLATION_ID = 'afs:translationIds';
export const CUSTOM_PROPS_KEY = 'properties';
type formElementJson = FieldJson | FieldsetJson | FormJson | any

const defaultBcp47LangTags = [
    'de-DE',
    'en-US',
    'es-ES',
    'fr-FR',
    'it-IT',
    'ja-JP',
    'ko-KR',
    'pt-BR',
    'zh-CN',
    'zh-TW'
];

/**
 * @private
 */
export const invalidateTranslation = (input: formElementJson, updates: any) => {
    translationProps.forEach((prop) => {
        if (prop in updates && input?.[CUSTOM_PROPS_KEY]?.[TRANSLATION_ID]?.[prop]) {
            delete input?.[CUSTOM_PROPS_KEY]?.[TRANSLATION_ID]?.[prop];
        }
    });
};

/**
 * @private
 */
export const addTranslationId = (input: formElementJson, additionalTranslationProps : string[] = []) : formElementJson =>  {
    // don't create a schema copy, add it to the existing
    const model = input;
    const transProps = [...translationProps, ...additionalTranslationProps];
    _createTranslationId(model, '', transProps);
    return model;
};

/**
 * @private
 */
const _createTranslationId = (input: formElementJson, path: string, transProps: string[]) : formElementJson => {
    Object.entries(input).forEach(([key, value]) => {
        if (typeof value == 'object') {
            _createTranslationId(value, ((key === 'items') ? path : `${path === '' ? path : path + TRANSLATION_TOKEN}${key}${TRANSLATION_TOKEN}${Math.floor(Math.random() * 10000) + 1}`), transProps);
        } else {
            // set it only if either of type or fieldType properties is present
            if ('type' in input ||
                'fieldType' in input) {
                for (const transProp of transProps) {
                    // if property exist add it
                    if (input[transProp] != null) {
                        // if translation id is not yet set, set it
                         if (!(CUSTOM_PROPS_KEY in input)) {
                            input[CUSTOM_PROPS_KEY] = {};
                          }
                          if (!(TRANSLATION_ID in input[CUSTOM_PROPS_KEY])) {
                            input[CUSTOM_PROPS_KEY][TRANSLATION_ID] = {};
                          }
                        // if transprop is not yet set, set it
                        // this is done to prevent overwrite
                        if (!(transProp in input[CUSTOM_PROPS_KEY][TRANSLATION_ID])) {
                            input[CUSTOM_PROPS_KEY][TRANSLATION_ID][transProp] = `${path}${TRANSLATION_TOKEN}${transProp}${TRANSLATION_TOKEN}${Math.floor(Math.random() * 10000) + 1}`;
                        }
                    }
                }
            }
        }
    });

};

/**
 * @param input
 * @param translationObj
 * @param translationProps
 * @private
 */
const _createTranslationObj = (input: formElementJson, translationObj : any, translationProps : string[]) : any => {
    Object.values(input).forEach((value) => {
        if (typeof value == 'object') {
            _createTranslationObj(value, translationObj, translationProps);
        } else {
            for (const translationProp of translationProps) {
                if (translationProp in input && input?.[CUSTOM_PROPS_KEY]?.[TRANSLATION_ID]?.[translationProp]) {
                    // todo: right now we create only for english
                    if (input[translationProp] instanceof Array) {
                        input[translationProp].forEach((item: any, index: number)=> {
                            if (typeof item === 'string') { // only if string, then convert, since values can also be boolean
                                // @ts-ignore
                                translationObj[`${input[CUSTOM_PROPS_KEY][TRANSLATION_ID][translationProp]}${TRANSLATION_TOKEN}${index}`] = item;
                            }
                        });
                    } else {
                        // @ts-ignore
                        translationObj[`${input[CUSTOM_PROPS_KEY][TRANSLATION_ID][translationProp]}`] = input[translationProp];
                    }
                }
            }
        }
    });
};

/**
 * @param input
 * @param additionalTranslationProps
 * @private
 */
export const createTranslationObj = (input: formElementJson, additionalTranslationProps : string[] = []) : any => {
    const obj = {};
    const transProps = [...translationProps, ...additionalTranslationProps];
    _createTranslationObj(input, obj, transProps as string[]);
    return obj;
};

/**
 * Creates translation object with [BCP 47](https://tools.ietf.org/search/bcp47) language tags as key and value is a translation object. Key of translation object is
 * generated based on the form hierarchy and it is separated by "##" token to signify that the id is machine generated (ie its not a human generated string)
 * @param input             form model definition
 * @param additionalTranslationProps    optional properties which needs to be translated, by default, only OOTB properties of form model definition is translated
 * @param bcp47LangTags     optional additional language tags
 * @returns translation object for each bcp 47 language tag
 */
export const createTranslationObject = (input: formElementJson,
                                        additionalTranslationProps : string[] = [],
                                        bcp47LangTags : string[] = []) : any => {
    const transProps = [...translationProps, ...additionalTranslationProps];
    // create a copy of the input
    const inputCopy = JSON.parse(JSON.stringify(input));
    const obj = createTranslationObj(addTranslationId(inputCopy), transProps as string[]);
    const langTags = [...defaultBcp47LangTags, ...bcp47LangTags];
    const allLangs : any = {};
    for (const langTag of langTags) {
        // todo: added temporarily to test
        // todo: need to fix this as per machine translation
        allLangs[langTag] = JSON.parse(JSON.stringify(obj));
    }
    return [inputCopy, allLangs];
};

