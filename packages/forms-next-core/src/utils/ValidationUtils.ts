// issue with import
//import {FieldJson, isFileObject} from '../types';

import Field from '../Field';

const dateRegex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
const dataUrlRegex = /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/;

type ValidationResult = {
    valid: boolean,
    value: any
}
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysInMonth = (leapYear: boolean, month: number) => {
    if (leapYear && month == 2) return 29;
    return days[month - 1];
};

const isLeapYear = (year: number) => {
    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
};

export const isDataUrl = (str : string) => {
    return dataUrlRegex.exec(str.trim()) != null;
};

/**
 *
 * checks whether inputVal is valid number value or not
 * @param inputVal
 */
const checkNumber = (inputVal: string) => {
    let value:any = parseFloat(inputVal);
    const valid = !isNaN(value);
    if (!valid) {
        console.log('dataType constraint evaluation failed. Expected Integer. Received ' + inputVal);
        value = inputVal;
    }
    return {
        value, valid
    };
};

/**
 * wraps a non-null value and not an array value into an array
 * @param inputVal
 */
const toArray = (inputVal: any) => {
    if (inputVal != null && !(inputVal instanceof Array)) {
        return [inputVal];
    }
    return inputVal;
};

/**
 * checks whether inputVal is valid boolean value or not
 * @param inputVal
 */
const checkBool = (inputVal: any) => {
    const valid = typeof inputVal === 'boolean' || inputVal === 'true' || inputVal === 'false';
    const value = typeof inputVal === 'boolean' ? inputVal : (valid ? inputVal === 'true': inputVal);
    return {valid, value};
};



/**
 * Validates an array of values using a validator function.
 * @param inputVal
 * @param validatorFn
 * @return an array containing two arrays, the first one with all the valid values and the second one with one invalid
 * value (if there is).
 */
const partitionArray = (inputVal: any[], validatorFn: (x: any) => ValidationResult) => {
    const value = toArray(inputVal);
    if (value == null) {
        return [[], [value]];
    }
    return value.reduce((acc: [any, any], x: any) => {
        if (acc[1].length == 0) {
            const r = validatorFn(x);
            const index = r.valid ? 0: 1;
            acc[index].push(r.value);
        }
        return acc;
    },[[],[]]);
};

export const Constraints = {
    type : (constraint: string, inputVal: any): ValidationResult => {
        let value : any = inputVal;
        if (inputVal == undefined) {
            return {
                valid: true,
                value: undefined
            };
        }
        let valid = true, res;
        switch(constraint) {
            case 'string':
                valid = true;
                break;
            case 'string[]':
                value = toArray(inputVal);
                break;
            case 'number':
                res = checkNumber(inputVal);
                value = res.value;
                valid = res.valid;
                break;
            case 'boolean':
                res = checkBool(inputVal);
                valid = res.valid;
                value = res.value;
                break;
            case 'integer':
                value = parseFloat(inputVal);
                valid = !isNaN(value) && Math.round(value) === value;
                if (!valid) {
                    console.log('dataType constraint evaluation failed. Expected Integer. Received ' + inputVal);
                    value = inputVal;
                }
                break;
            case 'file' || 'file[]':
                valid = true;
                //valid = isFileObject(value);
                if (!valid) {
                    console.log('dataType constraint evaluation failed. Expected File Object. Received ' + inputVal);
                    value = inputVal;
                }
                break;
            case 'number[]':
                res = partitionArray(inputVal, checkNumber);
                valid = res[1].length === 0;
                value = valid ? res[0] : inputVal;
                break;
            case 'boolean[]':
                res = partitionArray(inputVal, checkBool);
                valid = res[1].length === 0;
                value = valid ? res[0] : inputVal;
                break;
        }
        return {
            valid,
            value
        };
    },

    format : (constraint: string, input: string) => {
        let valid = true;
        let value = input;
        let res;
        switch(constraint) {
            case 'date':
                res = dateRegex.exec(input.trim());
                if (res != null) {
                    const [match, year, month, date] = res;
                    const [nMonth, nDate] = [+month, +date];
                    let leapYear = isLeapYear(+year);
                    valid = (nMonth >= 1 && nMonth <= 12) &&
                        (nDate >= 1 && nDate <= daysInMonth(leapYear, nMonth));
                } else {
                    valid = false;
                }
                break;
            case 'data-url':
                // todo: input is of type file, do we need this format ? since value is always of type file object
                //res = dataUrlRegex.exec(input.trim());
                //valid = res != null;
                valid = true;
                break;
        }
        return {valid, value};
    },

    //todo : add support for date
    minimum : (constraint: number, value: number) => {
        return {valid :value > constraint, value};
    },

    //todo : add support for date
    maximum : (constraint: number, value: number) => {
        return {valid : value < constraint, value};
    },

    minLength : (constraint: number, value: string) => {
        return {...Constraints.minimum(constraint, typeof value === 'string' ? value.length : 0), value};
    },

    maxLength : (constraint: number, value: string) => {
        return {...Constraints.maximum(constraint, typeof value === 'string' ? value.length : 0), value};
    },

    pattern : (constraint: RegExp | string, value: string) => {
        let regex: RegExp;
        if (typeof constraint === 'string') {
            regex = new RegExp(constraint);
        } else {
            regex = constraint;
        }
        return {valid: regex.test(value), value};
    },

    required : (constraint: boolean, value: any) => {
        const valid = constraint ? value != null && value !== '' : true;
        return {valid, value};
    },

    enum : (constraint: any[], value: any) => {
        return {
            valid: constraint.indexOf(value) > -1,
            value
        };
    }

};

