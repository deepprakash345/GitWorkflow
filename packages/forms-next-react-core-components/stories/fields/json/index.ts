import {form, formWithSubmit} from "../../template";

export const inputfieldTypes = [
    'text-input',
    'multiline-input',
    'date-input',
    'number-input',
    'file-input'
]

export const optionsfieldTypes = [
    'drop-down',
    'radio-group',
    'checkbox-group'
]

const basic = {
    'label' : {
        'value' : 'Field'
    },
    'name' : 'field'
};

const component = (fieldType, extras: any = {}, label = undefined, description= undefined) => {
    return {
        ...basic,
        label: {
            value : label ? label : basic.label.value
        },
        description,
        fieldType,
        ...extras
    }
}

//@ts-ignore
const data = Object.fromEntries(inputfieldTypes.concat(optionsfieldTypes).map(x => {
    const isInput = inputfieldTypes.indexOf(x) > -1
    const obj = isInput ? {} : {enum: ["1", "2", "3"]}
    return [x, formWithSubmit(component(x, obj))]
}))

const additional = {
    checkbox : formWithSubmit(component('checkbox', {enum: ['on', 'off']})),
    checkboxNoOff : formWithSubmit(component('checkbox', {enum: ['on']})),
    checkboxBoolean : formWithSubmit(component('checkbox', {type: 'boolean'})),
    'checkbox-group-single': formWithSubmit(component('checkbox-group', {type: 'number', enum: [1, 2, 3]})),
    button : form(component('button', {label: {value: 'click me'}})),
    "plain-text" : form(component('plain-text', {value: 'This is a plain text'})),
    "text-input-number" : formWithSubmit(component('text-input', {type: 'number'}, 'Text Field for Number', 'Enter only numbers')),
    "text-input-date" : formWithSubmit(component('text-input', {type: 'string', format: 'date'}, 'Text Field for Date', 'Enter date (yyyy-mm-dd)')),
    "drop-down-enumNames": formWithSubmit(component('drop-down', {enum: [1, 2, 3], enumNames: ['Apple', 'Orange', 'Guava']}))
}

export const examples = {
    ...data,
    ...additional
}


