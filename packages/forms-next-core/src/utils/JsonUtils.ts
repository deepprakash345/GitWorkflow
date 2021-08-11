
export const getProperty = <P>(data: any, key: string, def: P): P => {
    const prefixedKey = `:${key}`;
    if (key in data) {
        return data[key];
    } else if (prefixedKey in data) {
        return data[prefixedKey];
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