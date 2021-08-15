import {useContext, useEffect, useState} from 'react';
import formContext, {IFormContext} from './FormContext';
import {Change} from '@adobe/forms-next-core/lib/controller/Actions';
import {ContainerJson} from '@adobe/forms-next-core/lib';
import {Subscription} from '@adobe/forms-next-core/lib/controller/Controller';

type hasID = {
    ':id'?: string,
    [key: string]: any
}

type Dispatch<T> = (x: T) => any

export const useRuleEngine = function<T extends hasID, P>(props: T): [T, Dispatch<P>] {
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
    return [elementState, dispatchChange];
};

export const useRenderChildren = function<T extends ContainerJson>(props: T) {
    const children = Object.values(props[':items']);
    const context:any = useContext(formContext);
    return children.map((child: any) => {
        const Comp = context.mappings[child[':type']];
        if (Comp === undefined) {
            return <div><h4>Undefined Element</h4><pre>{JSON.stringify(child, null, 2)}</pre></div>;
        }
        return <Comp {...child} />;
    });

};