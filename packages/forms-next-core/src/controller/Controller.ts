import {Action} from './Actions';

export type callbackFn = (id:string, obj: any, eventName: string) => void

export type Subscription = {
    unsubscribe(): void
}

export interface Controller {
    subscribe (id: string, callback: callbackFn, eventName?: string): Subscription
    dispatch(action: Action) : void
    getState(): any
}