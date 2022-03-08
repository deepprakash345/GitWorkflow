/**
 * Defines generic utilities to validate form runtime model based on the constraints defined
 * as per `adaptive form specification`
 */

// issue with import
//import {FieldJson, isFileObject} from '../types';

import Field from '../Field';

const dateRegex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
const dataUrlRegex = /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/;

/** Validation result type **/
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
 * Checks whether inputVal is valid number value or not
 *
 * ```
 * const x = checkNumber('12')
 * ```
 * would return
 * ```
 * {
 *     value : 12,
 *     valid : true
 * }
 * ```
 * @param inputVal input value
 * @returns {@link ValidationResult | Validation result}
 */
const checkNumber = (inputVal: string) => {
    let value:any = parseFloat(inputVal);
    const valid = !isNaN(value);
    if (!valid) {
        value = inputVal;
    }
    return {
        value, valid
    };
};

/**
 * Wraps a non-null value and not an array value into an array
 * @param inputVal input value
 * @returns wraps the input value into an array
 */
const toArray = (inputVal: any) : Array<any> => {
    if (inputVal != null && !(inputVal instanceof Array)) {
        return [inputVal];
    }
    return inputVal;
};


/**
 * Checks whether inputVal is valid boolean value or not
 *
 * ```
 * const x = checkBool('false')
 * ```
 * would return
 * ```
 * {
 *     value : false,
 *     valid : true
 * }
 * ```
 * @param inputVal input value
 * @returns {@link ValidationResult | Validation result}
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

export const ValidConstraints = {
    date : ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'format'],
    string: ['minLength', 'maxLength', 'pattern'],
    number: ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum'],
    array: ['minItems', 'maxItems', 'uniqueItems'],
    file: ['accept', 'maxFileSize']
}

/**
 * Implementation of all constraints defined by `adaptive form specification`
 */
export const Constraints = {
    /**
     * Implementation of type constraint
     * @param constraint    `type` property of the form object
     * @param inputVal      value of the form object
     * @return {@link ValidationResult | validation result}
     */
    type : (constraint: string, inputVal: any): ValidationResult => {
        let value : any = inputVal;
        if (inputVal == undefined) {
            return {
                valid: true,
                value: inputVal
            };
        }
        let valid = true, res;
        switch(constraint) {
            case 'string':
                valid = true;
                value = inputVal.toString()
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
                    value = inputVal;
                }
                break;
            case 'file' || 'file[]':
                valid = true;
                //valid = isFileObject(value);
                if (!valid) {
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

    /**
     * Implementation of format constraint
     * @param constraint    `format` property of the form object
     * @param input         value of the form object
     * @return {@link ValidationResult | validation result}
     */
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
    /**
     * Implementation of minimum constraint
     * @param constraint    `minimum` property of the form object
     * @param value         value of the form object
     * @return {@link ValidationResult | validation result}
     */
    minimum : (constraint: number, value: number) => {
        return {valid :value >= constraint, value};
    },

    //todo : add support for date
    /**
     * Implementation of maximum constraint
     * @param constraint    `maximum` property of the form object
     * @param value         value of the form object
     * @return {@link ValidationResult | validation result}
     */
    maximum : (constraint: number, value: number) => {
        return {valid : value <= constraint, value};
    },

    /**
     * Implementation of exclusiveMinimum constraint
     * @param constraint    `minimum` property of the form object
     * @param value         value of the form object
     * @return {@link ValidationResult | validation result}
     */
    exclusiveMinimum : (constraint: number, value: number) => {
        return {valid :value > constraint, value};
    },

    //todo : add support for date
    /**
     * Implementation of exclusiveMaximum constraint
     * @param constraint    `maximum` property of the form object
     * @param value         value of the form object
     * @return {@link ValidationResult | validation result}
     */
    exclusiveMaximum : (constraint: number, value: number) => {
        return {valid : value < constraint, value};
    },

    /**
     * Implementation of the minItems constraint
     * @param constraint `minItems` constraint from object
     * @param value value of the form object
     */
    minItems: <T>(constraint: number, value: T[]) => {
        return {valid: (value instanceof Array) && value.length >= constraint, value}
    },

    /**
     * Implementation of the maxItems constraint
     * @param constraint `maxItems` constraint from object
     * @param value value of the form object
     */
    maxItems: <T>(constraint: number, value: T[]) => {
        return {valid : (value instanceof Array) && value.length <= constraint, value}
    },

    /**
     * Implementation of the uniqueItems constraint
     * @param constraint `uniqueItems` constraint from object
     * @param value value of the form object
     */
    uniqueItems: <T>(constraint: boolean, value: T[]) => {
        return {valid: !constraint || ((value instanceof Array) && value.length === new Set(value).size), value}
    },
    /**
     * Implementation of minLength constraint
     * @param constraint    `minLength` property of the form object
     * @param value         value of the form object
     * @return {@link ValidationResult | validation result}
     */
    minLength : (constraint: number, value: string) => {
        return {...Constraints.minimum(constraint, typeof value === 'string' ? value.length : 0), value};
    },

    /**
     * Implementation of maxLength constraint
     * @param constraint    `maxLength` property of the form object
     * @param value         value of the form object
     * @return {@link ValidationResult | validation result}
     */
    maxLength : (constraint: number, value: string) => {
        return {...Constraints.maximum(constraint, typeof value === 'string' ? value.length : 0), value};
    },

    /**
     * Implementation of pattern constraint
     * @param constraint    `pattern` property of the form object
     * @param value         value of the form object
     * @return {@link ValidationResult | validation result}
     */
    pattern : (constraint: RegExp | string, value: string) => {
        let regex: RegExp;
        if (typeof constraint === 'string') {
            regex = new RegExp(constraint);
        } else {
            regex = constraint;
        }
        return {valid: regex.test(value), value};
    },

    /**
     * Implementation of required constraint
     * @param constraint    `required` property of the form object
     * @param value         value of the form object
     * @return {@link ValidationResult | validation result}
     */
    required : (constraint: boolean, value: any) => {
        const valid = constraint ? value != null && value !== '' : true;
        return {valid, value};
    },

    /**
     * Implementation of enum constraint
     * @param constraint    `enum` property of the form object
     * @param value         value of the form object
     * @return {@link ValidationResult | validation result}
     */
    enum : (constraint: any[], value: any) => {
        return {
            valid: constraint.indexOf(value) > -1,
            value
        };
    }
};

