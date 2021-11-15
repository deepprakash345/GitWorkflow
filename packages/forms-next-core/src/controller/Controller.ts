import {
    BaseModel,
    FieldJson, FieldModel,
    FieldsetJson, FieldsetModel,
    FormJson, FormModel, WithState
} from '../types';
import EventQueue from './EventQueue';

export interface Action {
    type: string,
    payload: any
    metadata: any,
    readonly isCustomEvent: boolean
    readonly target: Controller
}

export type callbackFn = (action: Action) => void

export type Subscription = {
    unsubscribe(): void
}

export interface Controller {
    subscribe(callback: callbackFn, eventName?: string): Subscription

    dispatch(action: Action): void

    getState(): any

    getElementController(id: string): Controller

    queueEvent(action: Action): void
}

class ActionImpl implements Action {
    protected _type: string
    private _payload?: any
    private _target?: any

    constructor(payload: any, type: string, private _metadata?: any) {
        this._payload = payload;
        this._type = type;
    }

    public get type() {
        return this._type;
    }

    public get payload() {
        return this._payload;
    }

    public get metadata() {
        return this._metadata;
    }

    public get target() {
        return this._target;
    }

    public get isCustomEvent() {
        return false;
    }
}

class ActionImplWithTarget implements Action {

    constructor(private _action: Action, private _target: Controller) {
    }

    public get type() {
        return this._action.type;
    }

    public get payload() {
        return this._action.payload;
    }

    public get metadata() {
        return this._action.metadata;
    }

    public get target() {
        return this._target;
    }

    public get isCustomEvent() {
        return this._action.isCustomEvent;
    }

    public toString() {
        return JSON.stringify({
            payload: this.payload,
            type: this.type,
            isCustomEvent: this.isCustomEvent
        });
    }
}

export class Change extends ActionImpl {
    constructor(payload: any, dispatch: boolean = false) {
        super(payload, 'change', {dispatch});
    }
}

export class Initialize extends ActionImpl {
    constructor(payload?: any, dispatch: boolean = false) {
        super(payload, 'initialize', {dispatch});
    }
}

export class Click extends ActionImpl {
    constructor(payload?: any, dispatch: boolean = false) {
        super(payload, 'click', {dispatch});
    }
}

export class Submit extends ActionImpl {
    constructor(payload?: any, dispatch: boolean = false) {
        super(payload, 'submit', {dispatch});
    }
}

export class AddDependent extends ActionImpl {
    constructor(payload: BaseModel) {
        super(payload, 'AddDependent');
    }
}

export class FieldAdded extends ActionImpl {
    constructor(payload: BaseModel) {
        super(payload, 'FieldAdded');
    }
}

export class AddItem extends ActionImpl {
    constructor(payload?: number) {
        super(payload, 'AddItem');
    }
}

export class RemoveItem extends ActionImpl {
    constructor(payload?: number) {
        super(payload, 'RemoveItem');
    }
}

export class CustomEvent extends ActionImpl {
    //todo: dispatch means bubble down, find a better name
    constructor(eventName: string, payload: any, dispatch: boolean = false) {
        super(payload, eventName, {dispatch});
    }

    public get isCustomEvent() {
        return true;
    }
}

class ControllerImpl implements Controller {

    private _callbacks: {
        [key: string]: callbackFn[]
    } = {}

    private _dependents: BaseModel[] = [];

    constructor(private _elem: FieldModel | FieldsetModel | FormModel,
                private _eventQueue: EventQueue<any>,
                private _form: FormModel) {

    }

    dispatch(action: Action): void {
        if (action.type === 'AddDependent') {
            const dependent = action.payload;
            if (this._dependents.indexOf(dependent) === -1) {
                this.subscribe(() => {
                    this._eventQueue.queue(dependent, new Change(undefined));
                });
                this._dependents.push(dependent);
            }
        } else {
            const context = {
                '$form': this._form,
                '$field': this._elem,
                '$event': {
                    type: action.type,
                    payload: action.payload,
                    target: this._elem
                }
            };
            let actionWithTarget: Action = new ActionImplWithTarget(action, this);
            // for submit, we create payload and send it to the caller
            if (action?.type === 'submit') {
                actionWithTarget = new Submit(context.$form?.controller.getState().data);
            }
            this._elem.executeAction(actionWithTarget, context, this.trigger.bind(this));
            this._eventQueue.runPendingQueue();
        }
    }

    getState(): FieldJson | FieldsetJson | FormJson {
        return this._elem.json();
    }

    subscribe(callback: callbackFn, eventName: string = 'change') {
        this._callbacks[eventName] = this._callbacks[eventName] || [];
        this._callbacks[eventName].push(callback);
        //console.log(`subscription added : ${this._elem.id}, count : ${this._callbacks[eventName].length}`);
        return {
            unsubscribe: () => {
                this._callbacks[eventName] = this._callbacks[eventName].filter(x => x !== callback);
                //console.log(`subscription removed : ${this._elem.id}, count : ${this._callbacks[eventName].length}`);
            }
        };
    }

    private trigger(action: Action) {
        const handlers = this._callbacks[action.type] || [];
        handlers.forEach(x => {
            x(new ActionImplWithTarget(action, this));
        });
    }

    getElementController(id: string): Controller {
        const element = this._form.getElement(id);
        if (element != null) {
            return element.controller;
        } else {
            return new EmptyController<any>();
        }
    }

    trackDependency() {

    }

    queueEvent(action: Action) {
        this._eventQueue.queue(this._elem, action);
    }
}

export const createController = (form: FormModel, eventQueue: EventQueue<BaseModel>) =>
    (elem ?: FieldModel | FieldsetModel | FormModel) => {
    return new ControllerImpl(elem || form, eventQueue, form);
};

export class EmptyController<T> implements Controller {
    constructor(private _elem?: WithState<T>) {

    }

    dispatch(action: Action) {
        console.error(`invalid action ${action.type}. element doesn't exist`);
    }

    getState() {
        if (this._elem) {
            return this._elem.json();
        } else {
            return undefined;
        }
    }

    subscribe() {
        return {
            unsubscribe: () => {
            }
        };
    }

    getElementController(id: string): Controller {
        return this;
    }

    queueEvent(action: Action) {

    }
}

