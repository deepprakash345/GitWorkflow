export interface BaseConstraints {
    required?: boolean;
    expression?: string;
}

export interface StringConstraints extends BaseConstraints {
    minLength?: number;
    maxLength?: number;
}

export interface NumberConstraints extends BaseConstraints {
    minimum?: number;
    maximum?: number;
    fracDigits?: number;
    leadDigits?: number;
}

export type FieldConstraints = StringConstraints | NumberConstraints;

interface ContainerConstraints extends BaseConstraints {
    minItems?: number;
    maxItems?: number;
}

interface RuleField {
    rules?: {
        [key: string]: string;
    }
}

type Primitives = string | number | boolean | null;

interface ValueField {
    value: Primitives;
    default?: Primitives;
}

export interface NodeModel {

}

interface BaseModel<T extends BaseConstraints> extends RuleField, NodeModel {
    readonly type?: string;
    readonly name?: string;
    readonly dataRef?: string;
    id: string
    title?: string
    description?: string
    readOnly?: boolean;
    enabled?: boolean;
    visible?: boolean;
    placeholder?: string;
    valid?: boolean
    constraints?: T;
    multiline?: boolean;
    viewType?: string
    props?: {
        [key: string]: any;
    }
}

export interface FieldModel extends BaseModel<FieldConstraints>, ValueField {
    json: () => FieldJson
}

export interface FormMetaDataModel {
    readonly version: string
    readonly grammarVersion: string
    readonly locale: string,
    readonly action: string,
    readonly dataUrl: string
}

export type Items<T> = { [key: string]: T }

export interface ContainerModel<T> {
    children: Items<T>
}

export interface FieldsetModel extends BaseModel<ContainerConstraints>, ContainerModel<FieldModel | FieldsetModel> {
    type?: 'array' | 'object'
    count?: number
    initialCount?: number;
    json: () => FieldsetJson
}

export type FormModel = ContainerModel<FieldModel | FieldsetModel> & {
    data?: any
    metadata?: MetaDataJson
    json: () => any
}

export type Option = {
    ':value'?: Primitives
    ':text'?: string
}

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
    ':options'?: Option[];
    ':enforceOptions'?: boolean
}

type ConstraintsMessages = {
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


type BaseJson = {
    ':id': string;
    ':type'?: string;
    ':dataRef'?: string;
    ':title'?: string
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