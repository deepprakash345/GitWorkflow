
export const getProperty = <P>(data: any, key: string, def: P): P => {
    if (key in data) {
        return data[key];
    } else if (':key' in data) {
        return data[':key'];
    }
    return def;
};