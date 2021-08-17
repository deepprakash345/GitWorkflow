import {useContext, useEffect, useState} from 'react';
import formContext, {IFormContext} from './FormContext';
import {Change, Click} from '@adobe/forms-next-core/lib/controller/Actions';
import {ContainerJson} from '@adobe/forms-next-core/lib';

type hasID = {
    ':id'?: string,
    [key: string]: any
}

type Dispatch<T> = (x: T) => any

export const useRuleEngine = function<T extends hasID, P>(props: T): [T, Dispatch<any>, Dispatch<void>] {
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

export const useRenderChildren = function<T extends ContainerJson>(props: T) {
    const children = Object.values(props[':items']);
    const context:any = useContext(formContext);
    return children.map((child: any) => {
        const Comp = context.mappings[child[':type']];
        if (Comp === undefined) {
            return <div><h4>Undefined Element</h4><pre>{JSON.stringify(child, null, 2)}</pre></div>;
        }//todo: find better key
        return <Comp key={child[':id']} {...child} />;
    });

};