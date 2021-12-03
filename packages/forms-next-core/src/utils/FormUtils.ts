import {FileObject} from '../FileObject';
import {isFile} from './JsonUtils';
import {BaseModel, ContainerModel, FieldsetModel, FormModel} from '../types';
import FormMetaData from '../FormMetaData';

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'.split('');
const fileSizeRegex =  /^(\d*\.?\d+)(\\?(?=[KMGT])([KMGT])(?:i?B)?|B?)$/i;

export const randomWord = (l: number) => {
    const ret = [];
    for (let i = 0; i<=l; i++) {
        const randIndex = Math.floor(Math.random()*(chars.length));
        ret.push(chars[randIndex]);
    }
    return ret.join('');
};

export const getAttachments = (input : ContainerModel) : any=> {
    const items = input.items || [];
    return items?.reduce((acc, item) => {
        let ret = null;
        if (item.isContainer) {
            ret = getAttachments(item as ContainerModel);
        } else {
            if (isFile(item.getState())) {
                ret = {}; // @ts-ignore
                const name = item.name || '';
                let dataRef = (item.dataRef != null)
                    ? item.dataRef
                    : (name.length > 0 ? item.name : undefined);
                //@ts-ignore
                if (item.value instanceof Array) {
                    // @ts-ignore
                    ret[input.id] = input.value.map((x) => {
                        return {...x, 'dataRef': dataRef};
                    });
                } else {
                    // @ts-ignore
                    ret[input.id] = {...input.value, 'dataRef': dataRef};
                }
            }
        }
        return Object.assign(acc, ret);
    }, {});
};

// this works as per IEC specification
export const getFileSizeInBytes = (str: any) => {
    let retVal = 0;
    if (typeof str === 'string') {
        let matches = fileSizeRegex.exec(str.trim());
        if (matches != null) {
            retVal = sizeToBytes(parseFloat(matches[1]), (matches[2] || 'kb').toUpperCase());
        }
    }
    return retVal;
};

export const sizeToBytes = (size: number, symbol : string) => {
    let sizes = {'KB' : 1, 'MB' : 2, 'GB' : 3, 'TB' : 4};
    // @ts-ignore
    let i = Math.pow(1024, (sizes[symbol] as number));
    return Math.round(size * i);
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


export const dataURItoBlob = (dataURI : string) => {
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
};