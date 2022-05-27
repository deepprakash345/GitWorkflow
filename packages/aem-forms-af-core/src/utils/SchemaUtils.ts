/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

/**
 * Defines generic utilities to convert form model definition to json schema
 */
import {FieldJson, FieldsetJson, FormJson} from '../types';

// const primitives = ['string', 'boolean', 'number'];
// const containers = ['object', 'array', 'number'];

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

/**
 * Returns the default view type for a given form field object based on `adaptive form specification`
 * @param schema    schema item for which default view type is to found
 * @returns default view type
 */
export const defaultFieldTypes = (schema: any): string => {
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

const fieldSchema = (input: FieldJson | FieldsetJson | FormJson) : any => {
    if ('items' in input) {
        const fieldset = input as FieldsetJson;
        const items = fieldset.items;
        if (fieldset.type === 'array') {
            return {
                type: 'array',
                items : fieldSchema(items[0]),
                minItems: fieldset?.minItems,
                maxItems: fieldset?.maxItems
            };
        } else {
            const iter = items.filter(x => x.name != null);
            return {
                type: 'object',
                properties: Object.fromEntries(iter.map(item => [item.name, fieldSchema(item)])),
                required: iter.filter(x => x.required).map(x => x.name)
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
            title: field.label?.value,
            description: field.description,
            ...schema
        };
    }
};

/**
 * Creates a json schema from form model definition
 * @param form {@link FormJson | form model definition}
 * @returns json schema of form model definition
 */
export const exportDataSchema = (form : FormJson) => {
   return fieldSchema(form);
};