import {OptionJson} from '../types';

const dateRegex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

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
    dataType : (constraint: string, inputVal: string): ValidationResult => {
        let value : any = inputVal;
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

    options : (constraint: OptionJson[], value: any) => {
        return {
            valid: constraint.map(x => x[':value']).indexOf(value) > -1,
            value
        };
    }

};

