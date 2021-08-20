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
    json: () => FieldJson
}

export interface FormMetaDataModel  {
    version: string
    grammarVersion: string
    locale: string,
    action: string,
    dataUrl: string
}

export type Items<T> = {[key:string]: T}

export interface ContainerModel<T> {
    items: Items<T>
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

type Option = {
    ':value'?: Primitives
    ':text'?: string
}

export type ConstraintsJson = {
    ':required'?: boolean;
    ':expression'?: string;
    ':minLength'?: number;
    ':maxLength'?: number;
    ':multiline'?: boolean;
    ':minimum'?: number;
    ':maximum'?: number;
    ':fracDigits'?: number;
    ':leadDigits'?: number;
    ':options'?: Option[];
}

export type FieldJson = {
    ':type'?: string;
    ':name'?: string;
    ':dataRef'?: string;
    ':id'?: string
    ':title'?: string
    ':hideTitle'?:boolean
    ':description'?: string
    ':readOnly'?: boolean;
    ':enabled'?: boolean;
    ':presence'?: boolean;
    ':placeholder'?: string;
    ':valid'?: boolean
    ':constraints'?: ConstraintsJson;
    ':viewType'?: string
    ':value'?: Primitives
    ':props'?: {
        [key: string] : any;
    }
}

export type ContainerJson = {
    ':id'?: string;
    ':type'?: string;
    ':items': Items<FieldJson | ConstraintsJson>
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
    ':metadata'?: MetaDataJson
}