import {
    FieldModel,
    FieldsetModel,
    FormModel, State
} from '@aemforms/crispr-core';
import formContext, {IFormContext} from '../component/FormContext';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
//@ts-ignore
import {AddItem, Click, RemoveItem} from '@aemforms/crispr-core';
import {Blur} from '@aemforms/crispr-core';

export type Dispatch<T> = (x?: T) => any
export type Handlers = {
    dispatchBlur: Dispatch<any>
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
export const useRuleEngine = function <P>(props : State<P>): [any, Handlers] {
    const context:IFormContext = useContext(formContext);
    const id = props.id as string;
    const element = context.form?.getElement(id) as FieldModel | FormModel | FieldsetModel;

    // use the state, if an empty controller (like objects outside of form vocab), fallback to props
    const [elementState, setElementState] = useState(element?.getState() || props);
    useEffect(() => {
        const subscription = element?.subscribe(() => {
            setElementState(element.getState());
        });
        return () => {
            subscription?.unsubscribe();
        };
    }, [id]);

    const dispatchChange = (val: any) => {
        if (!element?.isContainer) {
            element.value = val;
        }
    };

    const dispatchBlur = () => {
        if (!element?.isContainer) {
            const blurAction = new Blur(null);
            element?.dispatch(blurAction);
        }
    };

    const dispatchClick = () => {
        const clickAction = new Click(null);
        element?.dispatch(clickAction);
    };

    const dispatchAddItem = (n?: number) => {
        const action = new AddItem(n);
        element?.dispatch(action);
    };

    const dispatchRemoveItem = (n?: number) => {
        const action = new RemoveItem(n);
        element?.dispatch(action);
    };

    return [elementState, {dispatchChange, dispatchClick, dispatchAddItem, dispatchRemoveItem, dispatchBlur}];
};


// @ts-ignore
export const useFocus =  function <P>(props : State<P>) {
    const context:IFormContext = useContext(formContext);
    const id = props.id as string;
    const ref = useRef(null);
    const setRef = useCallback(node => {
        if (ref.current) {
            // Make sure to cleanup any events/references added to the last instance
        }
        if (node) {
            // Check if a node is actually passed. Otherwise node would be null.
            // You can now do what you need to, addEventListeners, measure, etc.
        }
        // Save a reference to the node
        ref.current = node;
    }, []);
    const setFocus = function() {
        // @ts-ignore
        ref.current &&  ref.current.focus();
    };
    if (context?.refMap) {
        context.refMap[id] = {'setFocus': setFocus};
    }
    return [setRef, setFocus];
};

