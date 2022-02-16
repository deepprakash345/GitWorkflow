/**
 * Defines generic utilities to interact with form model definition which is represented as json
 * @module FormJsonUtils
 */

import {FieldsetJson, FieldJson} from '../types';
import {FileObject} from '../FileObject';
import {defaultViewTypes} from './SchemaUtils';

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
 * Checks if the input item provided is a form check box field
 * @param item  input item it could be {@link FieldsetJson | Fieldset} or {@link FieldJson | Field}
 * @returns `true` if `item` is a form check box, `false` otherwise
 */
export const isCheckbox = function (item: FieldsetJson | FieldJson) {
    const viewType = item?.viewType || defaultViewTypes(item);
    return viewType === 'checkbox';
};

/**
 * Checks if the input item provided is a form check box group field
 * @param item  input item it could be {@link FieldsetJson | Fieldset} or {@link FieldJson | Field}
 * @returns `true` if `item` is a form check box group, `false` otherwise
 */
export const isCheckboxGroup = function (item: FieldsetJson | FieldJson) {
    const viewType = item?.viewType || defaultViewTypes(item);
    return viewType === 'checkbox-group';
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
 * Prettifies obj as json string
 * @param obj object to prettify
 * @return json string
 */
export const jsonString = (obj: any) => {
    return JSON.stringify(obj, null, 2);
};