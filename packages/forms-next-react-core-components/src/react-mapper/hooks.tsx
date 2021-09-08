import {JSXElementConstructor, ReactNode, useContext, useEffect, useState} from 'react';
import formContext, {IFormContext} from './FormContext';
import {Change, Click} from '@adobe/forms-next-core/lib/controller/Actions';
import {FieldJson} from '@adobe/forms-next-core/lib';
import React from 'react';

export type Dispatch<T> = (x: T) => any
export type Handlers = {
    dispatchChange: Dispatch<any>
    dispatchClick: Dispatch<void>
}

export const useRuleEngine = function <T extends FieldJson, P>(props : T): [T, Handlers] {
    const [elementState, setElementState] = useState(props);
    const context:IFormContext = useContext(formContext);
    const id = props[':id'] as string;
    useEffect(() => {
        const subscription = context.controller?.subscribe(id, (id: string, state: any) => {
            setElementState(Object.assign({}, state));
        });
        return () => {
            subscription?.unsubscribe();
        };
    }, [id]);

    const dispatchChange = (val: P) => {
        const changeAction = new Change(id as string, val);
        context.controller?.dispatch(changeAction);
    };

    const dispatchClick = () => {
        const clickAction = new Click(id as string, null);
        context.controller?.dispatch(clickAction);
    };

    return [elementState, {dispatchChange, dispatchClick}];
};


export const useRenderer = function(props:any, propsMapper: (x:any, handlers: Handlers) => any, Component: JSXElementConstructor<any>)  {
    const [state, handlers] = useRuleEngine<FieldJson, string>(props);
    const res = propsMapper(state, handlers);
    return <Component {...res} />;
};