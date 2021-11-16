const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'.split('');

export const randomWord = (l: number) => {
    const ret = [];
    for (let i = 0; i<=l; i++) {
        const randIndex = Math.floor(Math.random()*(chars.length));
        ret.push(chars[randIndex]);
    }
    return ret.join('');
};

export const IdGenerator = function *(initial = 50): Generator<string, void, string> {
    const initialize = function () {
        const arr = [];
        for (let i =0; i < initial; i++) {
            arr.push(randomWord(10));
        }
        return arr;
    };
    const passedIds:any = {};
    let ids = initialize();
    do {
        let x = ids.pop() as string;
        while (x in passedIds) {
            if (ids.length === 0) {
                ids = initialize();
            }
            x = ids.pop() as string;
        }
        passedIds[x] = true;
        yield ids.pop() as string;
        if (ids.length === 0) {
            ids = initialize();
        }
    } while(ids.length > 0);
};


export function dataURItoBlob(dataURI : string) {
    // Split metadata from data
    const splitted = dataURI.split(',');
    // Split params
    const params = splitted[0].split(';');
    // Get mime-type from params
    const type = params[0].replace('data:', '');
    // Filter the name property from params
    const properties = params.filter(param => {
        return param.split('=')[0] === 'name';
    });
    // Look for the name and use unknown if no name property.
    let name;
    if (properties.length !== 1) {
        name = 'unknown';
    } else {
        // Because we filtered out the other property,
        // we only have the name case here.
        name = properties[0].split('=')[1];
    }

    // Built the Uint8Array Blob parameter from the base64 string.
    const binary = atob(splitted[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    // Create the blob object
    const blob = new window.Blob([new Uint8Array(array)], { type });

    return { blob, name };
}