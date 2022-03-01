/**
 * Defines generic types based on `crispr form specification`
 */

/** Type for `items property` based on `crispr form specification` */
export type Items<T> = { [key: string]: T }

/** Type alias for primitive types */
export type Primitives = string | number | boolean | null | undefined;

/** Type for `label` based on `crispr form specification` */
export type Label = {
    value: string
    richText?: boolean
    visible?: boolean
}

/** Type for `constraint properties` which can be translated based on `crispr form specification` */
type TranslationConstraintsJson = {
    enumNames?: string[];
    enum?: any[];
}

/** Type for `constraint properties` based on `crispr form specification` */
export type ConstraintsJson = TranslationConstraintsJson & {
    accept?:string[];
    enforceEnum?: boolean
    exclusiveMinimum?:number
    exclusiveMaximum?:number
    format?: string
    maxFileSize?:number|string;
    maxLength?: number;
    maximum?: number;
    maxItems?: number
    minLength?: number;
    minimum?: number;
    minItems?: number;
    pattern?: string,
    required?: boolean;
    step?: number;
    type?: string
    validationExpression?: string;
}

const a: FieldJson  = {
    type : 'string'
};

/** Type for `constraint messages` based on `crispr form specification` */
export type ConstraintsMessages = {
    accept?:string
    enum?: string;
    exclusiveMinimum?:string
    exclusiveMaximum?:string
    format?: string
    maxFileSize?: string,
    maxLength?: string;
    maximum?: string;
    maxItems?: string
    minLength?: string;
    minimum?: string;
    minItems?: string
    pattern?: string,
    required?: string;
    step?: string;
    type?: string;
    validationExpression?: string;
}

/** Type for `constraint messages` based on `crispr form specification` */
export type RulesJson = {
    rules ?: Items<string>
    events ?: Items<string[]|string|undefined>
}

/** Type for `generic form properties` which can be translated based on `crispr form specification` */
type TranslationBaseJson = {
    description ?: string
}


/** Type for `generic form properties` based on `crispr form specification` */
export type BaseJson = TranslationBaseJson & RulesJson & ConstraintsJson & {
    dataRef?: string | null;
    ':type'?:string
    label?: Label
    enabled?: boolean;
    visible?: boolean;
    name?: string;
    constraintMessages?: ConstraintsMessages;
    fieldType?: string
    errorMessage?: string
    properties?: {
        [key: string] : any
    }
}

/** Type for `form field properties`which can be translated based on `crispr form specification` */
type TranslationFieldJson = {
    placeholder?: string
}


/** Type for `form field properties` based on `crispr form specification` */
export type FieldJson = BaseJson & TranslationFieldJson & {
    readOnly?: boolean;
    valid?: boolean
    default?: any
    value?: any
    multiline?: boolean;
    emptyValue?: 'null'|'undefined'|''
}

/** Type for `form container properties` based on `crispr form specification` */
export type ContainerJson = BaseJson & {
    items: Array<FieldJson | ContainerJson>
    initialItems?: number;
}

/** Type for `form metadata` based on `crispr form specification` */
export type MetaDataJson = {
    version?: string
    grammar?: string
    locale?: string
}

/** Type for `form fieldset` based on `crispr form specification` */
export type FieldsetJson = ContainerJson & {
    'type'?: 'array' | 'object'
}

/** Type for `form model` based on `crispr form specification` */
export type FormJson = ContainerJson & {
    metadata?: MetaDataJson,
    data?: any
    title?: string
    action ?: string,
    adaptiveForm?: string
}

/** Type for all properties which can be translated based on `crispr form specification` */
export type TranslationJson = TranslationBaseJson & TranslationFieldJson & TranslationConstraintsJson

/** Constant for all properties which can be translated based on `crispr form specification` */
export const translationProps = ['description', 'placeholder', 'enum', 'enumNames'];
