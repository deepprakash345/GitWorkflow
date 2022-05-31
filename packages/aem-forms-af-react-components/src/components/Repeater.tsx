/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

import React from 'react';
import Add from '@spectrum-icons/workflow/Add';
import Remove from '@spectrum-icons/workflow/Remove';
import {ActionButton, ButtonGroup} from '@adobe/react-spectrum';
import {Handlers} from '@adobe/aem-forms-af-react-renderer';

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