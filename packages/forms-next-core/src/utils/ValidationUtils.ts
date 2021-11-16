// issue with import
//import {FieldJson, isFileObject} from '../types';

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

export const Constraints = {
    type : (constraint: string, inputVal: any): ValidationResult => {
        let value : any = inputVal;
        if (inputVal == undefined) {
            return {
                valid: true,
                value: undefined
            };
        }
        let valid = true;
        switch(constraint) {
            case 'string':
                valid = true;
                break;
            case 'number':
                value = parseFloat(inputVal);
                valid = !isNaN(value);
                if (!valid) {
                    console.log('dataType constraint evaluation failed. Expected Integer. Received ' + inputVal);
                    value = inputVal;
                }
                break;
            case 'boolean':
                valid = ['true', true, 'false', false].indexOf(inputVal) > -1;
                value = valid ? (inputVal === 'true') : inputVal;
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
        return {...Constraints.minimum(constraint, value.length), value};
    },

    maxLength : (constraint: number, value: string) => {
        return {...Constraints.maximum(constraint, value.length), value};
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

