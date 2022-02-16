/**
 * Defines generic types based on `crispr form specification`
 * @module FormJsonTypes
 */

/** Type for `items property` based on `crispr form specification` */
export type Items<T> = { [key: string]: T }

/** Type alias for primitive types */
export type Primitives = string | number | boolean | null;

/** Type for `label` based on `crispr form specification` */
export type Label = {
    value: string
    richText?: boolean
    visible?: boolean
}

/** Type for `constraint properties` which can be translated based on `crispr form specification` */
type TranslationConstraintsJson = {
    'enumNames'?: string[];
    'enum'?: any[];
}

/** Type for `constraint properties` based on `crispr form specification` */
export type ConstraintsJson = TranslationConstraintsJson & {
    'type'?: string
    'required'?: boolean;
    'pattern'?: string,
    'format'?: string
    'expression'?: string;
    'minLength'?: number;
    'maxLength'?: number;
    'minimum'?: number;
    'maximum'?: number;
    'maxFileSize'?:number;
    'accept'?:string[];
    'fracDigits'?: number;
    'leadDigits'?: number;
    'enforceEnum'?: boolean
    'minItems'?: number;
    'maxItems'?: number;
}

const a: FieldJson  = {
    type : 'string'
};

/** Type for `constraint messages` based on `crispr form specification` */
export type ConstraintsMessages = {
    'required'?: string;
    'expression'?: string;
    'minLength'?: string;
    'maxLength'?: string;
    'minimum'?: string;
    'maximum'?: string;
    'fracDigits'?: string;
    'leadDigits'?: string;
    'enforceEnum'?: string;
    'type'?: string;
}

/** Type for `constraint messages` based on `crispr form specification` */
export type RulesJson = {
    'rules' ?: Items<string>
    'events' ?: Items<string[]|string>
}

/** Type for `generic form properties` which can be translated based on `crispr form specification` */
type TranslationBaseJson = {
    'description'?: string
}


/** Type for `generic form properties` based on `crispr form specification` */
export type BaseJson = TranslationBaseJson & RulesJson & ConstraintsJson & {
    dataRef?: string | null;
    label?: Label
    'enabled'?: boolean;
    'visible'?: boolean;
    'name'?: string;
    'constraintMessages'?: ConstraintsMessages;
    'viewType'?: string
    'errorMessage'?: string
}

/** Type for `form field properties`which can be translated based on `crispr form specification` */
type TranslationFieldJson = {
    'placeholder'?: string
}


/** Type for `form field properties` based on `crispr form specification` */
export type FieldJson = BaseJson & TranslationFieldJson & {
    'readOnly'?: boolean;
    'valid'?: boolean
    'default'?: any
    'value'?: any
    'multiline'?: boolean;
    'props'?: {
        [key: string]: any;
    }
}

/** Type for `form container properties` based on `crispr form specification` */
export type ContainerJson = BaseJson & {
    'items': Array<FieldJson | ContainerJson>
    'initialItems'?: number;
}

/** Type for `form metadata` based on `crispr form specification` */
export type MetaDataJson = {
    'version'?: string
    'grammarVersion'?: string
    'locale'?: string
}

/** Type for `form fieldset` based on `crispr form specification` */
export type FieldsetJson = ContainerJson & {
    'type'?: 'array' | 'object'
}

/** Type for `form model` based on `crispr form specification` */
export type FormJson = ContainerJson & {
    'metadata'?: MetaDataJson,
    'data'?: any
    title?: string
    action ?: string
}

/** Type for all properties which can be translated based on `crispr form specification` */
export type TranslationJson = TranslationBaseJson & TranslationFieldJson & TranslationConstraintsJson

/** Constant for all properties which can be translated based on `crispr form specification` */
export const translationProps = ['description', 'placeholder', 'enum', 'enumNames'];
