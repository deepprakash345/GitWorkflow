import {
    ContainerModel,
    FieldJson,
    FieldModel,
    FieldsetJson,
    FieldsetModel,
    FormJson,
    FormModel,
    WithState
} from '../types';
import {Action} from './Actions';
import {callbackFn, Controller} from './Controller';

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
        this._elem.dispatch(action, context, this.trigger(action.payload));
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

    private trigger(payload: any) {
        return (eventName: string) => {
            const handlers = this._callbacks[eventName] || [];
            handlers.forEach(x => {
                x(eventName, this._elem.json(), payload);
            });
        };
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