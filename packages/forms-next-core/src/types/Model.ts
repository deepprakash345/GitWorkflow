import {FieldJson, FieldsetJson, FormJson, Items, MetaDataJson, Primitives} from './Json';
import {Action, Controller} from '../controller/Controller';
import RuleEngine from '../rules/RuleEngine';

interface BaseConstraints {
    expression?: string;
    readonly type?: string
}

interface FieldConstraints extends BaseConstraints {
    minLength?: number;
    maxLength?: number;
    minimum?: number;
    maximum?: number;
    required?: number;
}

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
    ruleEngine: RuleEngine
}

interface ValueField {
    value: Primitives;
    default?: Primitives;
}

export interface Executor {
    executeAction: (action: Action, context: any, notifyDependents: (x: Action) => void) => any
}

export interface WithState<T> {
    json : () => T
}

interface WithController {
    controller: Controller
}

export interface BaseModel extends Executor, BaseConstraints, WithController {
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
    multiline?: boolean;
    viewType?: string
    props?: {
        [key: string]: any;
    }
    isContainer: boolean,
    importData: (a: any, b: any) => any
    exportData: (a: any, b: any) => any
}

export interface FieldModel extends BaseModel,
    ValueField,
    FieldConstraints,
    ScriptableField,
    WithState<FieldJson>{}

export interface FormMetaDataModel {
    readonly version: string
    readonly grammarVersion: string
    readonly locale: string,
    readonly action: string,
    readonly dataUrl: string
}

export interface ContainerModel extends WithController {
    items: Items<FieldsetModel | FieldModel> | Array<FieldsetModel | FieldModel>
    readonly dataRef?: string;
    isContainer: boolean
    syncDataAndFormModel: (dataModel: any, parentModel: any) => void
}

export interface FieldsetModel extends BaseModel,
    ContainerModel,
    ContainerConstraints,
    ScriptableField,
    WithState<FieldsetJson> {
    type?: 'array' | 'object'
    count?: number
    initialCount?: number;
}

export interface FormModel extends Executor,
    ContainerModel,
    BaseConstraints,
    ScriptableField,
    WithState<FormJson> {
    id ?: string
    data?: any
    metadata?: MetaDataJson
    importData: (a: any) => any
    exportData: () => any
    createController: (elem: FieldModel | FieldsetModel) => Controller
    getElement: (id: string) => FieldModel | ContainerModel | FormModel
    getUniqueId() : string
}