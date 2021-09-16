import {FieldJson, FieldsetJson, MetaDataJson} from './Json';

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

export type Primitives = string | number | boolean | null;

interface ValueField {
    value: Primitives;
    default?: Primitives;
}

interface BaseModel<T extends BaseConstraints> extends RuleField {
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