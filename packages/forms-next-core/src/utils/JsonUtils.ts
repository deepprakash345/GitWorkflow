
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
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

export function resolve(obj: any, dataRef: string){
    let tmpData = obj;
    const tokens = splitTokens(dataRef);
    let token = tokens.next();
    while (!token.done && tmpData != null) {
        tmpData = tmpData[token.value];
        token = tokens.next();
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
const idRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g;

export const splitTokens = function *(id: string)  {
    if (id.length > 0) {
        let match = idRegex.exec(id);
        do {
            if (match == null || match.length < 2) {
                throw new Error(`Exception while parsing id ${id}`);
            }
            yield match[1];
            match = idRegex.exec(id);
        } while (match != null);
    }
};
