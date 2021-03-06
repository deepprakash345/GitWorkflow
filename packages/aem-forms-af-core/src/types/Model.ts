/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

/**
 * Defines generic interface's for form runtime model
 */

import {
    ConstraintsJson,
    ContainerJson,
    FieldJson,
    FieldsetJson,
    FormJson,
    Label,
    MetaDataJson
} from './Json';
import RuleEngine from '../rules/RuleEngine';
import EventQueue from '../controller/EventQueue';
import DataGroup from '../data/DataGroup';
import {Logger} from '../Form';

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

/** Generic type for a form object state */
export type State<T> =
    T extends ContainerJson ? T & {
    id: string,
    items: Array<State<FieldJson | ContainerJson>> } : T & {id: string, ':type' : string }

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
     * To map the field???s value to a property in the data model.
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
     * Custom widget type show to the user for capturing the data.
     */
    readonly ':type': string

    /**
     * Type of field to capture the user data.
     */
    readonly 'fieldType': string
    /**
     * Custom properties of the form field.
     */
    properties: {
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
     * Validates the given form field
     * @returns list of {@link ValidationError | validation errors}
     */
    validate() : Array<ValidationError>

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
     * @private
     */
    ruleNodeReference(): any
    /**
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
     * Version of the adaptive form specification
     */
    readonly version: string
    /**
     * Version of the rule grammar
     */
    readonly grammar: string
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
export interface FieldsetModel extends ContainerModel, WithState<FieldsetJson> {
    type?: 'array' | 'object'
}

/**
 * Defines the interface for form model
 */
export interface FormModel extends ContainerModel,
    WithState<FormJson> {
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

    readonly logger: Logger

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

/**
 * Defines Validation Error interface.
 */
export interface IValidationError {
    /**
     * {@link FieldModel.id | name} of the field
     */
    fieldName: string;
    /**
     * List of error messages
     */
    errorMessages: Array<string>
}

/**
 * Implementation of {@link IValidationError | Validation Error} interface
 */
export class ValidationError implements IValidationError {

    fieldName: string;
    errorMessages: Array<string>;

    constructor(fieldName = '', errorMessages: Array<any> = []) {
        this.errorMessages = errorMessages;
        this.fieldName = fieldName;
    }

}