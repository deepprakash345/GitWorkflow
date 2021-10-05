import {
    ContainerModel,
    FieldJson, FieldModel,
    FieldsetJson, FieldsetModel,
    FormJson, FormModel, WithState
} from '../types';

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
    subscribe (callback: callbackFn, eventName?: string): Subscription
    dispatch(action: Action) : void
    getState(): any
    getElementController(id: string): Controller
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

    constructor(private _action: Action, private _target: Controller) {}

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
            payload : this.payload,
            type : this.type,
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
    constructor(payload: any, dispatch: boolean = false) {
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

    constructor(private _elem: FieldModel | FieldsetModel | FormModel,
                private _form: FormModel) {

    }

    dispatch(action: Action): void {
        const context = {
            '$form': this._form,
            '$field': this._elem,
            '$event' : {
                type : action.type,
                payload: action.payload,
                target: this._elem
            }
        };
        const actionWithTarget = new ActionImplWithTarget(action, this);
        this._elem.dispatch(actionWithTarget, context, this.trigger.bind(this));
    }

    getState(): FieldJson | FieldsetJson | FormJson {
        return this._elem.json();
    }

    subscribe(callback: callbackFn, eventName: string = 'change') {
        this._callbacks[eventName] = this._callbacks[eventName] || [];
        this._callbacks[eventName].push(callback);
        console.log(`subscription added : ${this._elem.id}, count : ${this._callbacks[eventName].length}`);
        return {
            unsubscribe: () => {
                this._callbacks[eventName] = this._callbacks[eventName].filter(x => x !== callback);
                console.log(`subscription removed : ${this._elem.id}, count : ${this._callbacks[eventName].length}`);
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
        const elem =(this._elem as ContainerModel).getElement(id);
        if (elem) {
            return elem.controller();
        } else {
            return emptyController();
        }
    }
}

export const createController = (form: FormModel) => (elem ?:FieldModel | FieldsetModel | FormModel) => {
    return new ControllerImpl(elem || form, form);
};

export const emptyController = function emptyController<P, T extends WithState<P>>(elem?: T) {
    return {
        dispatch: () => {
            throw new Error("invalid action change. element doesn't exist");
        },
        getState: () => {
            if (elem) {
                return elem.json();
            } else {
                return undefined;
            }
        },
        subscribe: () => {
            return {
                unsubscribe : () => {
                }
            };
        },
        getElementController(id: string): Controller {
            return emptyController<any, any>();
        }
    };
};

