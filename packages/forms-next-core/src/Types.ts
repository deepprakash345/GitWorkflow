type BaseConstraints ={
    required?: boolean;
    expression?: string;
}
export type StringConstraints = BaseConstraints & {
    minLength?: number;
    maxLength?: number;
    multiline?: boolean;
}

type NumberConstraints = BaseConstraints & {
    minimum?: number;
    maximum?: number;
    fracDigits?: number;
    leadDigits?: number;
}

type ContainerConstraints = BaseConstraints & {
    minItems?: number;
    maxItems?: number;
}

type RuleField = {
    rules?: {
        [key: string] : string;
    }
}

type ValueField<T> = {
    value?: T;
    default?: T;
}

export type NodeModel = {

}

type BaseModel<T> = RuleField & NodeModel & {
   readonly type?: string;
   readonly name?: string;
   readonly dataRef?: string;
   id?: string
   title?: string
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

export type StringFieldModel = BaseModel<StringConstraints> & ValueField<string> & {
    type: 'string'
}

export type NumberFieldModel = BaseModel<NumberConstraints> & ValueField<number> & {
    type: 'number'
}

type FormMetaData = {
    version: string
    grammarVersion: string
    locale: string
}

export type ContainerModel<T> = {
    items: Array<T>
}

export type FieldModel = StringFieldModel | NumberFieldModel;
export type FieldSetModel = BaseModel<ContainerConstraints> & {
    type?: 'array' | 'object'
    count?: number
    initialCount?: number;
    items: Array<FieldModel | FieldSetModel>
}

export type FormModel = ContainerModel<FieldModel | FieldSetModel> & {
    metadata?: FormMetaData
}
