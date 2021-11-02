import React, {ReactElement} from 'react';
import {ContainerJson} from '@adobe/forms-next-core/lib';

export const renderChildren = function<T extends ContainerJson>(props: T, mappings: any) {
    const items = props.items;
    if (typeof items === 'object') {
        const children = Object.values(props.items);
        return children.map((child: any) => {
            const Comp = mappings?.[child.viewType];
            if (Comp === undefined) {
                return <div><h4>Undefined Element</h4>
                    <pre>{JSON.stringify(child, null, 2)}</pre>
                </div>;
            }
            return <Comp key={child.id} {...child} />;
        });
    } else {
        return [];
    }
};

export const renderIfVisible = function(props:any, Component: any)  {
    if (props?.visible === true) {
        return Component;
    } else {
        return null;
    }
};