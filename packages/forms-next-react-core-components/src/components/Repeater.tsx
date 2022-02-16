import React from 'react';
import Add from '@spectrum-icons/workflow/Add';
import Remove from '@spectrum-icons/workflow/Remove';
import {ActionButton, ButtonGroup} from '@adobe/react-spectrum';
import {Handlers} from '@aemforms/crispr-react-bindings';

const Repeater = ({add, remove, index, handlers}:{
                      add: boolean,
                      remove: boolean,
                      index: number,
                      handlers: Handlers
                  }) => {
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

export default Repeater;