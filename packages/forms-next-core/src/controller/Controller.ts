import {Action} from './Actions';

export type callbackFn = (id:string, obj: any) => void

export type Subscription = {
    unsubscribe(): void
}

export interface Controller {
    subscribe (id: string, callback: callbackFn): Subscription
    dispatch(action: Action) : void
    getState(): any
}