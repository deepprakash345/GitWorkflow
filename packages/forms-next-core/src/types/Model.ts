/**
 * Defines generic interface's for form runtime model
 * @module FormModel
 */

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
import {Fieldset} from '../Fieldset';

/**
 * Generic Scriptable field interface. All non-transparent fields which support rule/events
 * should implement this interface
 */
export interface ScriptableField {
    /**
     * Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.
     */
    rules?: {
        [key: string]: string;
    }
    /**
     * Events is a dictionary of eventName to the actions to perform.
     */
    events?: {
        [key: string] : string
    }
    /**
     * Instance of rule engine
     * @private
     */
    ruleEngine: RuleEngine
}

/**
 * Generic interface which defines {@link State | form object state}.
 * @typeparam T type of the form object (for example, {@link FieldJson | form field}
 */
interface WithState<T> {
    /**
     * {@link State | state} of the form object
     */
    getState : () => State<T>
}

/**
 * Generic interface which defines container state
 * @typeparam T type of the form object which extends from {@link ContainerJson | container}
 */
interface WithContainerState<T extends ContainerJson> {
    getState : () => T & {
        id: string
        items: Array<{id: string, viewType: string}>
    }
}

/** Generic type for a form object state */
export type State<T> =
    T extends ContainerJson ? T & {
    id: string,
    items: Array<{id: string, viewType: string}> } : T & {id: string}

/**
 * @private
 */
export type Subscription = {
    unsubscribe(): void
}

/**
 * Generic Action/Event interface.
 * Defines common properties that each action/event should have
 */
export interface Action {
    /**
     * Name of the event.
     */
    type: string,
    /**
     * Event payload as defined by the event.
     */
    payload: any
    /**
     * Event metadata.
     */
    metadata: any,
    /**
     * Is the event custom
     */
    readonly isCustomEvent: boolean
    /**
     * The field element on which the event is triggered.
     */
    readonly target: FormModel | FieldModel | FieldsetModel
    /**
     * Original event. If the event is dispatched, this refers the original event
     */
    readonly originalAction?: Action
}

/**
 * @private
 */
export type callbackFn = (action: Action) => void

/**
 * @private
 */
export interface WithController {
    /**
     * @param callback
     * @param eventName
     * @private
     */
    subscribe(callback: callbackFn, eventName?: string): Subscription

    /**
     * @param action
     * @private
     */
    dispatch(action: Action): void
}

/**
 * Generic base model interface.
 * Defines common properties that each form field should have
 */
export interface BaseModel extends ConstraintsJson, WithController {
    /**
     * Name of the form field.
     */
    readonly name?: string;
    /**
     * To map the field’s value to a property in the data model.
     */
    readonly dataRef?: string | null;
    /**
     * Unique id of the form field.
     */
    readonly id : string
    /**
     * The index of the Field within its parent.
     */
    readonly index : number
    /**
     * Label to be used for the field.
     */
    label?: Label
    /**
     * Extra description to be shown to the user to aid in form filling experience. It can be rich text.
     */
    description?: string
    /**
     * Whether the field should be readOnly to end user or not.
     */
    readOnly?: boolean;
    /**
     * Whether the field is enabled and takes part in rules, events etc.
     */
    enabled?: boolean;
    /**
     * Whether the field should be visible to author or not.
     */
    visible?: boolean;
    /**
     * The placeholder to show on the widget.
     */
    placeholder?: string;
    /**
     * The current validation state of the Field. The property is always computed after merging the Data Model with the Form
     */
    valid?: boolean
    /**
     * Type of widget to show to the user for capturing the data..
     */
    readonly viewType: string
    /**
     * Custom properties of the form field.
     */
    props?: {
        [key: string]: any;
    }
    /**
     * Whether the form field is container or not
     */
    readonly isContainer: boolean,
    /**
     * The Parent Panel of the Field/Panel.
     */
    readonly parent: ContainerModel | null
    /**
     * Array containing Fields or Panels.
     */
    readonly items?: Array<FieldsetModel | FieldModel>
    /**
     * The current value of the Field. The property is serialized in the Data Model.
     */
    value: any;
    /**
     * Default value of the Field.
     */
    readonly default?: any;
    /**
     * Imports data to the form field
     *  @private
     */
    importData(a?: DataGroup) : any
    /**
     * @private
     */
    getRuleNode(): any
    /**
     * The current value of the Field. The property is serialized in the Data Model
     * @private
     */
    directReferences(): any
    /**
     * The current value of the Field. The property is serialized in the Data Model
     * @private
     */
    _initialize(): any
}

/**
 * Generic field model interface.
 * Defines properties that each form field should have
 */
export interface FieldModel extends BaseModel, ScriptableField, WithState<FieldJson> {
    /**
     * Parent of the current field
     */
    parent: ContainerModel
}

/**
 * Defines form meta data properties
 */
export interface FormMetaDataModel {
    /**
     * Version of the crispr form specification
     */
    readonly version: string
    /**
     * Version of the rule grammar
     */
    readonly grammarVersion: string
    /**
     * Form locale
     */
    readonly locale: string
}

/**
 * Generic container model interface.
 * Defines properties that each container should have
 */
export interface ContainerModel extends BaseModel, ScriptableField {
    /**
     * Defines the children/items of the container
     */
    items: Array<FieldsetModel | FieldModel>
    /**
     * Defines the parent of the container
     */
    parent: ContainerModel
    /**
     * Returns the index of the {@link FieldModel | child item} or the {@link FieldsetModel | child container}
     * @param f child item
     * @returns `index` of the item
     */
    indexOf(f: FieldModel | FieldsetModel): number
}

/**
 * Generic field set model interface.
 * Defines properties that each field set should have
 */
export interface FieldsetModel extends ContainerModel, WithContainerState<FieldsetJson> {
    type?: 'array' | 'object'
}

/**
 * Defines the interface for form model
 */
export interface FormModel extends ContainerModel,
    WithContainerState<FormJson> {
    /**
     * Id of the form.
     */
    readonly id: string
    /**
     * Form data
     */
    readonly data?: any
    /**
     * Form metadata
     */
    readonly metadata?: MetaDataJson
    /**
     * Form title.
     */
    readonly title: string

    /**
     * Imports the given form data
     * @param data form data
     */
    importData(data: any) : any
    /**
     * Exports the form data
     */
    exportData() : any
    /**
     * Get form element model based on the id of the form element
     * @param id id of the form element
     */
    getElement(id: string) : FieldModel | FormModel | FieldsetModel
    /**
     * @private
     */
    getUniqueId() : string
    /**
     * @private
     */
    getEventQueue(): EventQueue
}

/**
 * Defines file object interface.
 */
export interface IFileObject {
    /**
     * Name of the file
     */
    name: string;
    /**
     * Media type of the file data
     */
    mediaType: string
    /**
     * Data of the file attachment. It can be uri or any file interface specific to channel (in web, it is file object).
     */
    data? : any
    /**
     * Size of the file binary as per iec specification.
     */
    size? : number
}