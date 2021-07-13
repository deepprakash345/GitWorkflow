interface BaseConstraints {
    required?: boolean;
    expression?: string;
}

interface StringConstraints extends BaseConstraints {
    minLength?: number;
    maxLength?: number;
    multiline?: boolean;
}

interface NumberConstraints extends BaseConstraints {
    minimum?: number;
    maximum?: number;
    fracDigits?: number;
    leadDigits?: number;
}

interface ContainerConstraints extends BaseConstraints {
    minItems?: number;
    maxItems?: number;
}

interface RuleField {
    rules?: {
        [key: string] : string;
    }
}

interface ValueField<T> {
    value?: T;
    default?: T;
}

export interface NodeModel {

}

interface BaseModel<T> extends RuleField, NodeModel {
   readonly type?: string;
   readonly name?: string;
   readonly dataRef?: string;
   id?: string
   readOnly?: boolean;
   enabled?: boolean;
   presence?: boolean;
   valid?: boolean
   constraints?: T;
   viewType?: string
   props?: {
       [key: string] : any;
    }
}

export interface StringFieldModel extends BaseModel<StringConstraints>, ValueField<string> {
    type: 'string'
}

export interface NumberFieldModel extends BaseModel<NumberConstraints>, ValueField<number> {
    type: 'number'
}

type FormMetaData = {
    version: string
    grammarVersion: string
    locale: string
}

export interface ContainerModel<T> {
    items: Array<T>
}

export type FieldModel = StringFieldModel | NumberFieldModel;
export interface FieldSetModel extends BaseModel<ContainerConstraints>, ContainerModel<FieldModel | FieldSetModel> {
    type?: 'array' | 'object'
    count?: number
    initialCount?: number;
}

export interface FormModel extends ContainerModel<FieldModel | FieldSetModel> {
     metadata?: FormMetaData
}
