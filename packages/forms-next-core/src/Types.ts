export interface BaseConstraints {
    required?: boolean;
    expression?: string;
}

export interface StringConstraints extends BaseConstraints {
    minLength?: number;
    maxLength?: number;
    multiline?: boolean;
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
        [key: string] : string;
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
   id?: string
   title?: string
   description?: string
   readOnly?: boolean;
   enabled?: boolean;
   presence?: boolean;
   placeholder?: string;
   valid?: boolean
   constraints?: T;
   viewType?: string
   props?: {
       [key: string] : any;
    }
}

export interface FieldModel extends BaseModel<FieldConstraints>, ValueField {
}

type FormMetaData = {
    version: string
    grammarVersion: string
    locale: string
}

export interface ContainerModel<T> {
    items: Array<T>
}

export interface FieldsetModel extends BaseModel<ContainerConstraints>, ContainerModel<FieldModel | FieldsetModel> {
    type?: 'array' | 'object'
    count?: number
    initialCount?: number;
}

export type FormModel = ContainerModel<FieldModel | FieldsetModel> & {
    metadata?: FormMetaData
}
