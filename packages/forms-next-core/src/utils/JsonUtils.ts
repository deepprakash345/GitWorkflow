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

export const undefinedValueFilter = ([key, value]: [string, any]) => value !== undefined;

export const filterProps = (data: any, filterFn: (x: [string, any]) => boolean) => {
    if (typeof filterFn !== 'function') {
        return data;
    }
    const newEntries = Object.entries(data).filter(filterFn);
    return Object.fromEntries(newEntries);
};

const isObject = function (item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
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
 * merges multiple source objects (not arrays) along with their properties into the target object
 * @param target
 * @param sources
 */
export function mergeDeep(target: any, ...sources: any[]): any {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (source[key] instanceof File || source[key] instanceof FileObject) {
                    Object.assign(target, {[key]: source[key]});
                } else {
                    if (!target[key]) Object.assign(target, {[key]: {}});
                    mergeDeep(target[key], source[key]);
                }
            } else {
                Object.assign(target, {[key]: source[key]});
            }
        }
    }

    return mergeDeep(target, ...sources);
}

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

/**
 * Gets the element whose reference is provided in the object. If merge is defined, then it merges the
 * value present at the reference with the merge value.
 * @param obj
 * @param dataRef
 * @param merge
 */
export function resolve(obj: any, dataRef: string, merge: any = undefined) {
    let tmpData = obj;
    const tokens = splitTokens(dataRef);
    let token = tokens.next();
    while (!token.done && (tmpData != null || merge !== undefined)) {
        let nextToken = tokens.next();
        if (!nextToken.done) {
            if (tmpData != null) {
                if (merge !== undefined) {
                    tmpData[token.value] = tmpData[token.value] || {};
                }
                tmpData = tmpData[token.value];
            }

        } else {
            if (tmpData != null) {
                if (merge !== undefined) {
                    const existing = tmpData[token.value];
                    if ((typeof existing === 'object') && existing != null && !(typeof existing === 'string')) {
                        if (merge instanceof Array && existing instanceof Array) {
                            const t = merge;
                            for (let i = merge.length; i < existing.length; i++) {
                                t[i] = merge[i];
                            }
                            tmpData[token.value] = t;
                        } else if (merge instanceof Array) {
                            tmpData[token.value] = merge;
                        } else {
                            tmpData[token.value] = {...existing, ...merge};
                        }
                    } else {
                        if (typeof(existing) !== typeof(merge)) {
                            console.warn(`dataRef points to an element of type {${typeof (existing)}} that can't be merged with {${typeof (merge)}}: Overriding`);
                        }
                        tmpData[token.value] = merge;
                    }
                }
                tmpData = tmpData[token.value];
            }
        }
        token = nextToken;
    }
    return tmpData;
}

export const jsonString = (obj: any) => {
    return JSON.stringify(obj, null, 2);
};

/*
anythingInsideDoubleQuotes = "[^"]+?";
anythingOtherThanDot = [^.]+?
followedByDotOrEndOfString=\.|$
idRegexString = (anythingInsideDoubleQuotes | anythingOtherThanDot)(?:followedByDotOrEndOfString)
 */
const idRegex = /(?:"([^"]+?)"|([^.]+?))(?:\.|$)/g;

export const splitTokens = function* (id: string) {
    if (id.length > 0) {
        let match = idRegex.exec(id);
        do {
            if (match == null || match.length < 3 || (match[1] === undefined && match[2] === undefined)) {
                throw new Error(`Exception while parsing id ${id}`);
            }
            if (match[1] !== undefined) {
                yield match[1];
            } else {
                yield match[2];
            }
            match = idRegex.exec(id);
        } while (match != null);
    }
};