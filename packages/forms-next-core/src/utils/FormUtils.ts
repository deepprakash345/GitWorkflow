/**
 * Defines generic utilities to interact with form runtime model
 * @module FormUtils
 */

import {FileObject} from '../FileObject';
import {isFile} from './JsonUtils';
import {BaseModel, ContainerModel, FieldsetModel, FormModel} from '../types';
import FormMetaData from '../FormMetaData';

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'.split('');
const fileSizeRegex =  /^(\d*\.?\d+)(\\?(?=[KMGT])([KMGT])(?:i?B)?|B?)$/i;

/**
 * Utility to generate a random word from seed
 * @param l seed value
 * @returns random word
 */
export const randomWord = (l: number) => {
    const ret = [];
    for (let i = 0; i<=l; i++) {
        const randIndex = Math.floor(Math.random()*(chars.length));
        ret.push(chars[randIndex]);
    }
    return ret.join('');
};

/**
 *
 * @param input
 */
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
                    ret[item.id] = item.value.map((x) => {
                        return {...x, 'dataRef': dataRef};
                    });
                } else if (item.value != null) {
                    // @ts-ignore
                    ret[item.id] = {...item.value, 'dataRef': dataRef};
                }
            }
        }
        return Object.assign(acc, ret);
    }, {});
};

/**
 * Converts file size in string to bytes based on IEC specification
 * @param str   file size
 * @returns file size as bytes (in kb) based on IEC specification
 */
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

/**
 * Converts number to bytes based on the symbol as per IEC specification
 * @param size      size as number
 * @param symbol    symbol to use (for example, kb, mb, gb or tb)
 * @return number as bytes based on the symbol
 */
export const sizeToBytes = (size: number, symbol : string) => {
    let sizes = {'KB' : 1, 'MB' : 2, 'GB' : 3, 'TB' : 4};
    // @ts-ignore
    let i = Math.pow(1024, (sizes[symbol] as number));
    return Math.round(size * i);
};

/**
 * ID Generator
 * @param initial
 * @constructor
 * @private
 */
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

/**
 * Utility to convert data URI to a `blob` object
 * @param dataURI uri to convert to blob
 * @returns `Blob` object for the data URI
 */
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