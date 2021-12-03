
export type Items<T> = { [key: string]: T }
export type Primitives = string | number | boolean | null;

export type Label = {
    value: string
    richText?: boolean
    visible?: boolean
}

type TranslationConstraintsJson = {
    'enumNames'?: string[];
    'enum'?: any[];
}

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
    'description'?: string
}


export type BaseJson = TranslationBaseJson & RulesJson & ConstraintsJson & {
    'dataRef'?: string;
    label?: Label
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
    'items': Array<FieldJson | ContainerJson>
    'initialItems'?: number;
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
}

export type FormJson = ContainerJson & {
    'metadata'?: MetaDataJson,
    'data'?: any
    title?: string
}

export type TranslationJson = TranslationBaseJson & TranslationFieldJson & TranslationConstraintsJson
//ts-reflection works on typescript 3 while we use 4. With latest npm package, this is causing issues
export const translationProps = ['description', 'placeholder', 'enum', 'enumNames'];
