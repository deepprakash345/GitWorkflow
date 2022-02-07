import {
    FieldModel,
    FieldsetModel,
    FormModel, State
} from '@aemforms/forms-next-core/lib';
import formContext, {IFormContext} from '../component/FormContext';
import {useContext, useEffect, useState} from 'react';
import {AddItem, Click, RemoveItem} from '@aemforms/forms-next-core/lib/controller/Controller';
import {jsonString} from '@aemforms/forms-next-core/lib/utils/JsonUtils';

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

    return [elementState, {dispatchChange, dispatchClick, dispatchAddItem, dispatchRemoveItem}];
};

