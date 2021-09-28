export type Items<T> = { [key: string]: T }
export type Primitives = string | number | boolean | null;


type ConstraintsJson = {
    ':dataType'?: 'string' | 'boolean' | 'number'
    ':required'?: boolean;
    ':pattern'?: string,
    ':format'?: string
    ':expression'?: string;
    ':minLength'?: number;
    ':maxLength'?: number;
    ':minimum'?: number;
    ':maximum'?: number;
    ':fracDigits'?: number;
    ':leadDigits'?: number;
    ':options'?: OptionJson[];
    ':enforceOptions'?: boolean
}

export type ConstraintsMessages = {
    ':required'?: string;
    ':expression'?: string;
    ':minLength'?: string;
    ':maxLength'?: string;
    ':minimum'?: string;
    ':maximum'?: string;
    ':fracDigits'?: string;
    ':leadDigits'?: string;
    ':options'?: string;
}

export type RulesJson = {
    ':rules' ?: Items<string>
    ':events' ?: Items<string>
}


type BaseJson = RulesJson & {
    ':id'?: string;
    ':type'?: string;
    ':dataRef'?: string;
    ':title'?: string
    ':richTextTitle' ?: boolean
    ':hideTitle'?: boolean
    ':description'?: string
    ':enabled'?: boolean;
    ':visible'?: boolean;
    ':name'?: string;
    ':constraints'?: ConstraintsJson;
    ':constraintMessages'?: ConstraintsMessages;
    ':viewType'?: string
    ':errorMessage'?: string
}

export type FieldJson = BaseJson & {
    ':readOnly'?: boolean;
    ':placeholder'?: string;
    ':valid'?: boolean
    ':default'?: Primitives
    ':value'?: Primitives
    ':multiline'?: boolean;
    ':props'?: {
        [key: string]: any;
    }
}

export type ContainerJson = BaseJson & {
    ':items': Items<FieldJson | ContainerJson>
}

export type MetaDataJson = {
    ':version'?: string
    ':grammarVersion'?: string
    ':locale'?: string,
    ':action'?: string,
    ':dataUrl'?: string
}

export type FieldsetJson = ContainerJson & {
    ':type'?: 'array' | 'object'
    ':count'?: number
    ':initialCount'?: number;
}

export type FormJson = ContainerJson & {
    ':metadata'?: MetaDataJson,
    ':data'?: any
}

export type OptionJson = {
    ':value'?: Primitives
    ':text'?: string
}
