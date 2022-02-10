import {FieldsetJson, FieldJson} from '../types';
import {FileObject} from '../FileObject';
import {defaultViewTypes} from './SchemaUtils';

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

export const isFile = function (item: FieldsetJson | FieldJson) {
    return (item?.type === 'file' || item?.type === 'file[]') ||
        ((item?.type === 'string' || item?.type === 'string[]') &&
            (item?.format === 'binary' || item?.format === 'data-url'));
};

export const isCheckbox = function (item: FieldsetJson | FieldJson) {
    const viewType = item?.viewType || defaultViewTypes(item);
    return viewType === 'checkbox';
};

export const isCheckboxGroup = function (item: FieldsetJson | FieldJson) {
    const viewType = item?.viewType || defaultViewTypes(item);
    return viewType === 'checkbox-group';
};

/**
 * Clones an object completely including any nested objects or arrays
 * @param obj
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

export const jsonString = (obj: any) => {
    return JSON.stringify(obj, null, 2);
};