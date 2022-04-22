/**
 * Defines generic utilities to interact with form model definition which is represented as json
 */

import {FieldsetJson, FieldJson, constraintProps} from '../types';
import {defaultFieldTypes} from './SchemaUtils';

/**
 * Get the property value form the json
 * @param data      object as json
 * @param key       name of the key
 * @param def       default value
 * @typeParam P     type for the default value
 */
export const getProperty = <P>(data: any, key: string, def: P): P => {
    if (key in data) {
        return data[key];
    } else if (!key.startsWith(':')) {
        const prefixedKey = `:${key}`;
        if (prefixedKey in data) {
            return data[prefixedKey];
        }
    }
    return def;
};

/**
 * Checks if the input item provided is a form file attachment field
 * @param item  input item it could be {@link FieldsetJson | Fieldset} or {@link FieldJson | Field}
 * @returns `true` if `item` is a form file attachment, `false` otherwise
 */
export const isFile = function (item: FieldsetJson | FieldJson) {
    return (item?.type === 'file' || item?.type === 'file[]') ||
        ((item?.type === 'string' || item?.type === 'string[]') &&
            (item?.format === 'binary' || item?.format === 'data-url'));
};


/**
 * Utility to check if the given form field has any data constraints
 * @param item form field to check
 * @returns `true` if `item` has data constraints, `false` otherwise
 */
export const checkIfConstraintsArePresent = function (item: FieldsetJson | FieldJson) {
    // @ts-ignore
    return constraintProps.some(cp => item[cp] !== undefined);
};

/**
 * Checks if the input item provided is a form check box field
 * @param item  input item it could be {@link FieldsetJson | Fieldset} or {@link FieldJson | Field}
 * @returns `true` if `item` is a form check box, `false` otherwise
 */
export const isCheckbox = function (item: FieldsetJson | FieldJson) {
    const fieldType = item?.fieldType || defaultFieldTypes(item);
    return fieldType === 'checkbox';
};

/**
 * Checks if the input item provided is a form check box group field
 * @param item  input item it could be {@link FieldsetJson | Fieldset} or {@link FieldJson | Field}
 * @returns `true` if `item` is a form check box group, `false` otherwise
 */
export const isCheckboxGroup = function (item: FieldsetJson | FieldJson) {
    const fieldType = item?.fieldType || defaultFieldTypes(item);
    return fieldType === 'checkbox-group';
};

/**
 * Clones an object completely including any nested objects or arrays
 * @param obj
 * @private
 */
export function deepClone(obj : any) {
    let result:any;
    if (obj instanceof Array) {
        result = [];
        result = obj.map(x => deepClone(x));
    } else if (typeof obj === 'object' && obj !== null) {
        result = {};
        Object.entries(obj).forEach(([key, value]) => {
            result[key] = deepClone(value);
        });
    } else {
        result = obj;
    }
    return result;
}

/**
 * Checks if the key got added in current object
 * @param currentObj
 * @param prevObj
 * @param objKey
 */
export function checkIfKeyAdded(currentObj: any, prevObj: any, objKey: string){
    if (currentObj != null && prevObj != null) {
        // add the new key
        const newPrvObj = {...prevObj};
        newPrvObj[objKey] = currentObj[objKey];
        // do compare using json stringify
        const newJsonStr = jsonString(currentObj).replace(jsonString(newPrvObj), '');
        return newJsonStr === '';
    } else {
        return false;
    }
}

/**
 * Prettifies obj as json string
 * @param obj object to prettify
 * @return json string
 */
export const jsonString = (obj: any) => {
    return JSON.stringify(obj, null, 2);
};