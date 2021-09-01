
const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;

type ValidationResult = {
    valid: boolean,
    value: any
}

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
                value = parseInt(inputVal);
                valid = !isNaN(value);
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
                valid = res !== null && res.length === 4;
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
        return [Constraints.minimum(constraint, value.length).valid, value];
    },

    maxLength : (constraint: number, value: string) => {
        return [Constraints.maximum(constraint, value.length).valid, value];
    },

    pattern : (constraint: RegExp, value: string) => {
        return {valid: constraint.test(value), value};
    },

    required : (constraint: boolean, value: any) => {
        const valid = constraint ? value != null && value !== '' : true;
        return {valid, value};
    },

    options : (constraint: any, value: string) => {
        return {valid: true, value};
    }

};

