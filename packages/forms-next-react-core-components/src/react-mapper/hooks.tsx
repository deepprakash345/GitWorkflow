import {JSXElementConstructor, useContext, useEffect, useState} from 'react';
import formContext, {IFormContext} from './FormContext';
import {FieldJson} from '@adobe/forms-next-core/lib';
import React from 'react';
import {Convertor, translateMessage} from '../utils/SpectrumMappers';
import {useIntl} from 'react-intl';
import {Action, AddItem, Change, Click, RemoveItem} from '@adobe/forms-next-core/lib/controller/Controller';

export type Dispatch<T> = (x?: T) => any
export type Handlers = {
    dispatchChange: Dispatch<any>
    dispatchClick: Dispatch<void>
    dispatchAddItem: Dispatch<number>
    dispatchRemoveItem: Dispatch<number>
    formatMessage?: any
}

/**
 * Binds the component's state to the Form and dynamically changing it depending upon
 * the rules written for that Field in the Form
 * @param props
 */
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

    const dispatchAddItem = (n?: number) => {
        const action = new AddItem(n);
        controller?.dispatch(action);
    };

    const dispatchRemoveItem = (n?: number) => {
        const action = new RemoveItem(n);
        controller?.dispatch(action);
    };

    return [elementState, {dispatchChange, dispatchClick, dispatchAddItem, dispatchRemoveItem}];
};

/**
 * Binds the component to the Form element whose state is being provided
 * @param formFieldState  The state of the Field received from Adaptive Form Component
 * @param propsMapper Mapping Field State to Props of the component
 * @param Component The component to render.
 */
export const useRenderer = function(formFieldState:FieldJson, propsMapper: Convertor<any>, Component: JSXElementConstructor<any>)  {
    const [state, handlers] = useRuleEngine<FieldJson, string>(formFieldState);
    const { formatMessage } = useIntl();
    const res = propsMapper(state, handlers, translateMessage(state, formatMessage));
    const errMessage = state.errorMessage || '';
    return (<div className={'field'}>
        <Component {...res} />
        {errMessage.length > 0 ? <div>{errMessage}</div> : null}
    </div>);
};
