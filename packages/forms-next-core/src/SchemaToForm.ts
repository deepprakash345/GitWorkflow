import $RefParser from '@apidevtools/json-schema-ref-parser';
import {jsonString} from './utils/JsonUtils';

const primitives = ['string', 'boolean', 'number'];
const containers = ['object', 'array', 'number'];

const objToMap = (o: any) => new Map(Object.entries(o));

const stringViewTypes = objToMap({'date' : 'date-input'});
const typeToViewTypes = objToMap({
    'number' : 'number-input',
    'boolean' : 'checkbox',
    'object' : 'panel',
    'array' : 'panel'
});

const defaultViewTypes = (schema: any) => {
    if (schema.type === 'string') {
        return stringViewTypes.get(schema.format) || 'text-input';
    }  else  {
        return typeToViewTypes.get(schema.type) || 'text-input';
    }
};

const processEnum = (schema: any) => {
    if (schema.enum) {
        const enumNames = schema.enumNames || schema.enum;
        return {
            options : schema.enum.map((x : string, i: number) => {
                return {
                    value :x,
                    text: enumNames[i] || x
                };
            }),
            viewType: 'drop-down'
        };
    }
    return {};
};

const walker =  (schema: any): any => {
    if (primitives.indexOf(schema.type) > -1) {
        console.log('visitProperty');
        console.log(schema);
        const res = {
            viewType : defaultViewTypes(schema),
            ...processEnum(schema),
            ...schema
        };
        console.log(res);
        return res;
    } else if (schema.type === 'object') {
        const required = schema.required;
        const formJson = Object.entries(schema.properties).map(([key, prop]) => {
            let propField = {
                ...walker(prop),
                name: key
            };
            if (required.indexOf(key) > -1) {
                propField = {
                    ...propField,
                    required: true
                };
            }
            return [key, propField];
        });
        return {
            'items' : Object.fromEntries(formJson)
        };
    }
};

export const createFormFromSchema = async (schemaObj : any) => {
    let schema = await $RefParser.dereference(schemaObj);
    return walker(schema);
};