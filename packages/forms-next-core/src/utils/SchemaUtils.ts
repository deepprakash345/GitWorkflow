import $RefParser from '@apidevtools/json-schema-ref-parser';
import {jsonString} from './JsonUtils';
import {FieldJson, FieldsetJson, FormJson} from '../types';

const primitives = ['string', 'boolean', 'number'];
const containers = ['object', 'array', 'number'];

const objToMap = (o: any) => new Map(Object.entries(o));

const stringViewTypes = objToMap({'date' : 'date-input',  'data-url' : 'file-input', 'binary' : 'file-input'}) as Map<string, string>;
const typeToViewTypes = objToMap({
    'number' : 'number-input',
    'boolean' : 'checkbox',
    'object' : 'panel',
    'array' : 'panel',
    'file' : 'file-input',
    'file[]' : 'file-input'
})  as Map<string, string>;

const arrayTypes = ['string[]', 'boolean[]', 'number[]', 'array'];

export const defaultViewTypes = (schema: any): string => {
    const type = schema.type || 'string';
    if ('enum' in schema) {
        const enums = schema.enum;
        if (enums.length > 2 || arrayTypes.indexOf(type) > -1) {
            return 'drop-down';
        } else {
            return 'checkbox';
        }
    }
    if (type === 'string' ||  type === 'string[]') {
        return stringViewTypes.get(schema.format) || 'text-input';
    }
    return typeToViewTypes.get(type) || 'text-input';
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

const fieldSchema = (input: FieldJson | FieldsetJson | FormJson) : any => {
    if ('items' in input) {
        const fieldset = input as FieldsetJson;
        const items = fieldset.items;
        if (items instanceof Array) {
            return {
                type: 'array',
                items : fieldSchema(items[0]),
                minItems: fieldset?.minItems,
                maxItems: fieldset?.maxItems
            };
        } else {
            const iter = Object.entries(items);
            return {
                type: 'object',
                properties: Object.fromEntries(iter.map(([key, obj]) => [key, fieldSchema(obj)])),
                required: Object.entries(items).filter(x => x[1].required).map(x => x[0])
            };
        }
    } else {
        const field = input as FieldJson;
        const schemaProps = ['type', 'maxLength', 'minLength', 'minimum', 'maximum', 'format', 'pattern', 'step', 'enum'];
        const schema = schemaProps.reduce<any>((acc, prop) => {
            const p = prop as keyof FieldJson;
            if (prop in field && field[p] != undefined) {
                acc[prop] = field[p];
            }
            return acc;
        }, {});
        if (field.dataRef === 'none' || Object.keys(schema).length == 0) {
            return undefined;
        }
        return {
            title: field.title,
            description: field.description,
            ...schema
        };
    }
};

export const exportDataSchema = (form : FormJson) => {
   return fieldSchema(form);
};