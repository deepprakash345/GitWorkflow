import {propertiesOf} from 'ts-reflection';

export type Items<T> = { [key: string]: T }
export type Primitives = string | number | boolean | null;

type TranslationConstraintsJson = {
    'enumNames'?: string[];
    'enum'?: any[];
}

type ConstraintsJson = TranslationConstraintsJson & {
    'type'?: string
    'required'?: boolean;
    'pattern'?: string,
    'format'?: string
    'expression'?: string;
    'minLength'?: number;
    'maxLength'?: number;
    'minimum'?: number;
    'maximum'?: number;
    'fracDigits'?: number;
    'leadDigits'?: number;
    'enforceEnum'?: boolean
}

const a: FieldJson  = {
    type : 'string'
};

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

export type RulesJson = {
    'rules' ?: Items<string>
    'events' ?: Items<string>
}

type TranslationBaseJson = {
    'title'?: string,
    'description'?: string
}


type BaseJson = TranslationBaseJson & RulesJson & ConstraintsJson & {
    'id'?: string;
    'dataRef'?: string;
    'richTextTitle' ?: boolean
    'hideTitle'?: boolean
    'enabled'?: boolean;
    'visible'?: boolean;
    'name'?: string;
    'constraintMessages'?: ConstraintsMessages;
    'viewType'?: string
    'errorMessage'?: string
}

type TranslationFieldJson = {
    'placeholder'?: string
}

export type FieldJson = BaseJson & TranslationFieldJson & {
    'readOnly'?: boolean;
    'valid'?: boolean
    'default'?: Primitives
    'value'?: Primitives
    'multiline'?: boolean;
    'props'?: {
        [key: string]: any;
    }
}

export type ContainerJson = BaseJson & {
    'items': Items<FieldJson | ContainerJson>
}

export type MetaDataJson = {
    'version'?: string
    'grammarVersion'?: string
    'locale'?: string,
    'action'?: string,
    'dataUrl'?: string
}

export type FieldsetJson = ContainerJson & {
    'type'?: 'array' | 'object'
    'count'?: number
    'initialCount'?: number;
    'minItems'?: number;
    'maxItems'?: number;
}

export type FormJson = ContainerJson & {
    'metadata'?: MetaDataJson,
    'data'?: any
}

export type TranslationJson = TranslationBaseJson & TranslationFieldJson & TranslationConstraintsJson
// derive props from the translation type defined, used ttsc for such reflection use-cases
export const translationProps = propertiesOf<TranslationJson>();
