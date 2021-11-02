import {FormModel} from '../types';
import {EmptyController} from '../controller/Controller';
import RuleEngine from '../rules/RuleEngine';

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

export function mergeDeep(target: any, ...sources: any[]): any {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, {[key]: {}});
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, {[key]: source[key]});
            }
        }
    }

    return mergeDeep(target, ...sources);
}

export function resolve(obj: any, dataRef: string, create: any = undefined) {
    let tmpData = obj;
    const tokens = splitTokens(dataRef);
    let token = tokens.next();
    while (!token.done && (tmpData != null || create !== undefined)) {
        let nextToken = tokens.next();
        if (!nextToken.done) {
            if (tmpData != null) {
                if (create) {
                    tmpData[token.value] = tmpData[token.value] || {};
                }
                tmpData = tmpData[token.value];
            }
        } else {
            if (tmpData != null) {
                if (create) {
                    tmpData[token.value] = create;
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

const ruleEngine = new RuleEngine();

export const MockForm = () => {
    return {
        controller: new EmptyController(),
        createController: jest.fn(),
        executeAction: jest.fn(),
        exportData: jest.fn(),
        getElement: jest.fn(),
        isContainer: true,
        items: {},
        json: jest.fn(),
        syncDataAndFormModel: jest.fn(),
        getUniqueId: jest.fn(),
        ruleEngine,
        importData: jest.fn()
    };
};