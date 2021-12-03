import {
    ConstraintsJson,
    ContainerJson,
    FieldJson,
    FieldsetJson,
    FormJson,
    Label,
    MetaDataJson,
    Primitives
} from './Json';
import RuleEngine from '../rules/RuleEngine';
import EventQueue from '../controller/EventQueue';
import DataGroup from '../data/DataGroup';

export interface ScriptableField {
    rules?: {
        [key: string]: string;
    }
    events?: {
        [key: string] : string
    }
    ruleEngine: RuleEngine
}

interface WithState<T> {
    getState : () => State<T>
}

interface WithContainerState<T extends ContainerJson> {
    getState : () => T & {
        id: string
        items: Array<{id: string, viewType: string}>
    }
}

export type State<T> =
    T extends ContainerJson ? T & {
    id: string,
    items: Array<{id: string, viewType: string}> } : T & {id: string}

export type Subscription = {
    unsubscribe(): void
}

export interface Action {
    type: string,
    payload: any
    metadata: any,
    readonly isCustomEvent: boolean
    readonly target: BaseModel
}

export type callbackFn = (action: Action) => void

export interface WithController {
    subscribe(callback: callbackFn, eventName?: string): Subscription
    dispatch(action: Action): void
}

export interface BaseModel extends ConstraintsJson, WithController {
    readonly name?: string;
    readonly dataRef?: string;
    readonly id : string
    readonly index : number
    label?: Label
    description?: string
    readOnly?: boolean;
    enabled?: boolean;
    visible?: boolean;
    placeholder?: string;
    valid?: boolean
    readonly viewType: string
    props?: {
        [key: string]: any;
    }
    readonly isContainer: boolean,
    readonly parent: ContainerModel | null
    readonly items?: Array<FieldsetModel | FieldModel>
    value: Primitives;
    readonly default?: Primitives;
    importData(a?: DataGroup) : any
    getRuleNode(): any
    directReferences(): any
    _initialize(): any
}

export interface FieldModel extends BaseModel, ScriptableField, WithState<FieldJson> {
    value: Primitives;
    default?: Primitives;
    parent: ContainerModel
}

export interface FormMetaDataModel {
    readonly version: string
    readonly grammarVersion: string
    readonly locale: string,
    readonly action: string,
    readonly dataUrl: string
}

export interface ContainerModel extends BaseModel, ScriptableField {
    items: Array<FieldsetModel | FieldModel>
    parent: ContainerModel
    indexOf(f: FieldModel | FieldsetModel): number
}

export interface FieldsetModel extends ContainerModel, WithContainerState<FieldsetJson> {
    type?: 'array' | 'object'
}

export interface FormModel extends ContainerModel,
    WithContainerState<FormJson> {
    readonly id: string
    readonly data?: any
    readonly metadata?: MetaDataJson
    readonly title: string
    importData(a: any) : any
    exportData() : any
    getElement(id: string) : FieldModel | FormModel | FieldsetModel
    getUniqueId() : string
    getEventQueue(): EventQueue
    submit(): any
}

export interface IFileObject {
    name: string;
    mediaType: string
    data? : any // can be uri or any file interface specific to channel (in web, it is file object)
    size? : number // iec specification
}