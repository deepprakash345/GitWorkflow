import React from 'react';
import {ContainerJson} from '@aemforms/forms-next-core/lib';
import {Handlers} from './hooks';

export const renderChildren = function <T extends ContainerJson>(props: T, mappings: any, handlers: Handlers) {
    const items = props.items;
    const maxItems = props.maxItems;
    const minItems = props.minItems;
    if (typeof items === 'object') {
        const children = props.items;
        return (
                children.map((child: any) => {
                    const Comp = mappings?.[child.viewType];
                    if (Comp === undefined) {
                        return <div><h4>Undefined Element</h4>
                            <pre>{JSON.stringify(child, null, 2)}</pre>
                        </div>;
                    }
                    //@ts-ignore
                    const addRequired = maxItems == -1 || items.length < maxItems;
                    //@ts-ignore
                    const removeRequired = items.length > minItems;
                    const addRemoveRequired: boolean = addRequired || removeRequired;
                    const Repeater = mappings.repeater;
                    return (
                        addRemoveRequired && Repeater !== undefined ?
                        (<div>
                            <Repeater add={addRequired} remove={removeRequired} index={child.index} handlers={handlers}/>
                            <Comp key={child.id} {...child} />
                        </div>) :
                        <Comp key={child.id} {...child} />
                    );
                })
            );
    } else {
        return [];
    }
};