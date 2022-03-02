/**
 * Defines generic utilities to translated form model definition
 */
// todo: The API's defined in this file could move to a different package later on
import {FieldJson, FieldsetJson, FormJson, TranslationJson, translationProps} from '../types';

/** Token used while creating translation specific properties from `crispr form specification` */
export const TRANSLATION_TOKEN : string = '##';
/** Name of the object which holds all translation specific properties */
export const TRANSLATION_ID = 'props:translationIds';
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
        if (prop in updates && input?.[TRANSLATION_ID]?.[prop]) {
            delete input?.[TRANSLATION_ID]?.[prop];
        }
    });
};

/**
 * @private
 */
export const addTranslationId = (input: formElementJson, additionalTranslationProps : string[] = []) : formElementJson =>  {
    // don't create a schema copy, add it to the existing
    let model = input;
    let transProps = [...translationProps, ...additionalTranslationProps];
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
                        if (!(TRANSLATION_ID in input)) {
                            input[TRANSLATION_ID] = {};
                        }
                        // if transprop is not yet set, set it
                        // this is done to prevent overwrite
                        if (!(transProp in input[TRANSLATION_ID])) {
                            input[TRANSLATION_ID][transProp] = `${path}${TRANSLATION_TOKEN}${transProp}${TRANSLATION_TOKEN}${Math.floor(Math.random() * 10000) + 1}`;
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
const _createTranslationObj = (input: formElementJson, translationObj : object, translationProps : string[]) : any => {
    Object.entries(input).forEach(([key, value]) => {
        if (typeof value == 'object') {
            _createTranslationObj(value, translationObj, translationProps);
        } else {
            for (const translationProp of translationProps) {
                if (translationProp in input && input?.[TRANSLATION_ID]?.[translationProp]) {
                    // todo: right now we create only for english
                    if (input[translationProp] instanceof Array) {
                        input[translationProp].forEach((item: any, index: number)=> {
                            if (typeof item === 'string') { // only if string, then convert, since values can also be boolean
                                // @ts-ignore
                                translationObj[`${input[TRANSLATION_ID][translationProp]}${TRANSLATION_TOKEN}${index}`] = item;
                            }
                        });
                    } else {
                        // @ts-ignore
                        translationObj[`${input[TRANSLATION_ID][translationProp]}`] = input[translationProp];
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
    let obj = {};
    let transProps = [...translationProps, ...additionalTranslationProps];
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
    let transProps = [...translationProps, ...additionalTranslationProps];
    // create a copy of the input
    let inputCopy = JSON.parse(JSON.stringify(input));
    let obj = createTranslationObj(addTranslationId(inputCopy), transProps as string[]);
    let langTags = [...defaultBcp47LangTags, ...bcp47LangTags];
    let allLangs : any = {};
    for (const langTag of langTags) {
        // todo: added temporarily to test
        // todo: need to fix this as per machine translation
        allLangs[langTag] = JSON.parse(JSON.stringify(obj));
    }
    return [inputCopy, allLangs];
};

