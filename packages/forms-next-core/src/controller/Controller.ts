import {Action} from './Actions';
import {
    FieldJson,
    FieldsetJson,
    FormJson
} from '../types';

export type callbackFn = (eventName: string, object: FieldJson | FormJson | FieldsetJson, payload: any) => void

export type Subscription = {
    unsubscribe(): void
}

export interface Controller {
    subscribe (callback: callbackFn, eventName?: string): Subscription
    dispatch(action: Action) : void
    getState(): any
    getElementController(id: string): Controller
}

