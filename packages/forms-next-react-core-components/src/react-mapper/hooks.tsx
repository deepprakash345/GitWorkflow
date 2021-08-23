import {useContext, useEffect, useState} from 'react';
import formContext, {IFormContext} from './FormContext';
import {Change, Click} from '@adobe/forms-next-core/lib/controller/Actions';
import {FieldJson} from '@adobe/forms-next-core/lib';
import React from 'react';

type Dispatch<T> = (x: T) => any

export const useRuleEngine = function<T extends FieldJson, P>(props: T): [T, Dispatch<any>, Dispatch<void>] {
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

    return [elementState, dispatchChange, dispatchClick];
};