import {FieldJson, FieldsetJson, FormJson, Items, MetaDataJson, Primitives} from './Json';
import {Action, Controller} from '../controller/Controller';

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

export interface ScriptableField {
    rules?: {
        [key: string]: string;
    }
    events?: {
        [key: string] : string
    }
}

interface ValueField {
    value: Primitives;
    default?: Primitives;
}

export interface Dispatcher {
    dispatch: (action: Action, context: any, trigger: (x: Action) => void) => any
}

export interface WithState<T> {
    json : () => T
}

interface WithController {
    controller :() => Controller
}

interface BaseModel<T extends BaseConstraints> extends Dispatcher {
    readonly type?: string;
    readonly name?: string;
    readonly dataRef?: string;
    id?: string
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
    isContainer: boolean

}

export interface FieldModel extends BaseModel<FieldConstraints>,
    ValueField,
    ScriptableField,
    WithState<FieldJson>,
    WithController {}

export interface FormMetaDataModel {
    readonly version: string
    readonly grammarVersion: string
    readonly locale: string,
    readonly action: string,
    readonly dataUrl: string
}

export interface ContainerModel extends WithController {
    items: Items<FieldsetModel | FieldModel>
    isContainer: boolean
    getElement: (id: string) => FieldModel | ContainerModel | undefined
}

export interface FieldsetModel extends BaseModel<ContainerConstraints>,
    ContainerModel,
    ScriptableField,
    WithState<FieldsetJson>,
    WithController {
    type?: 'array' | 'object'
    count?: number
    initialCount?: number;
}

export interface FormModel extends Dispatcher,
    ContainerModel,
    ScriptableField,
    WithState<FormJson> {
    id ?: string
    data?: any
    metadata?: MetaDataJson
}