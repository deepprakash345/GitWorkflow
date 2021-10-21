import {JSXElementConstructor, useContext, useEffect, useState} from 'react';
import formContext, {IFormContext} from './FormContext';
import {FieldJson} from '@adobe/forms-next-core/lib';
import React from 'react';
import {Convertor} from '../utils/SpectrumMappers';
import {Action, Change, Click} from '@adobe/forms-next-core/lib/controller/Controller';

export type Dispatch<T> = (x: T) => any
export type Handlers = {
    dispatchChange: Dispatch<any>
    dispatchClick: Dispatch<void>
}

export const useRuleEngine = function <T extends FieldJson, P>(props : T): [T, Handlers] {
    const context:IFormContext = useContext(formContext);
    const id = props.id as string;
    const controller = context.controller?.getElementController(id);
    // use the controller state, if an empty controller (like objects outside of form vocab), fallback to props
    const [elementState, setElementState] = useState(controller?.getState() || props);
    useEffect(() => {
        const subscription = controller?.subscribe((action: Action) => {
            setElementState(Object.assign({}, action.target.getState()));
        });
        return () => {
            subscription?.unsubscribe();
        };
    });

    const dispatchChange = (val: P) => {
        const changeAction = new Change(val);
        controller?.dispatch(changeAction);
    };

    const dispatchClick = () => {
        const clickAction = new Click(null);
        controller?.dispatch(clickAction);
    };

    return [elementState, {dispatchChange, dispatchClick}];
};

export const useRenderer = function(props:any, propsMapper: Convertor<any>, Component: JSXElementConstructor<any>)  {
    const [state, handlers] = useRuleEngine<FieldJson, string>(props);
    const res = propsMapper(state, handlers);
    const errMessage = state.errorMessage || '';
    return (<div className={'field'}>
        <Component {...res} />
        {errMessage.length > 0 ? <div>{errMessage}</div> : null}
    </div>);
};
