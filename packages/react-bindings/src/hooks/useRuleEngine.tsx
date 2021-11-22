import {FieldJson} from '@aemforms/forms-next-core/lib';
import formContext, {IFormContext} from '../component/FormContext';
import {useContext, useEffect, useState} from 'react';
import {Action, AddItem, Change, Click, RemoveItem} from '@aemforms/forms-next-core/lib/controller/Controller';

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
export const useRuleEngine = function <T extends FieldJson & {id: string}, P>(props : T): [T, Handlers] {
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

