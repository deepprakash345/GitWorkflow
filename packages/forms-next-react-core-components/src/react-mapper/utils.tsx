import React from 'react';
import {ContainerJson} from '@aemforms/forms-next-core/lib';
import Add from '@spectrum-icons/workflow/Add';
import Remove from '@spectrum-icons/workflow/Remove';
import {Handlers} from './hooks';
import {ActionButton, Flex, ButtonGroup} from '@adobe/react-spectrum';

const repeater = (add: boolean, remove: boolean, index: number, handlers: Handlers) => {
    return (<ButtonGroup marginStart="1rem" gap="10px">
        {
            add ? (<ActionButton onPress={() => handlers.dispatchAddItem(index + 1)} variant="primary">
                <Add/>
            </ActionButton>) : ''
        }
        {
            remove ? (<ActionButton onPress={() => handlers.dispatchRemoveItem(index)}>
                <Remove/>
            </ActionButton>) : ''
        }
    </ButtonGroup>);
};

export const renderChildren = function <T extends ContainerJson>(props: T, mappings: any, handlers: Handlers) {
    const items = props.items;
    const maxItems = props.maxItems;
    const minItems = props.minItems;
    if (typeof items === 'object') {
        const children = Object.values(props.items);
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
                    return (
                        addRemoveRequired ?
                            (<Flex direction="row" gap="10" alignItems="end">
                                <Comp key={child.id} {...child} />
                                { //@ts-ignore
                                    repeater(addRequired, removeRequired, child.index, handlers)
                                }
                            </Flex>) : <Comp key={child.id} {...child} />);
                })
            );
    } else {
        return [];
    }
};