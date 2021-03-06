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
import {ContainerJson, State} from '@adobe/aem-forms-af-core/lib';
import {Handlers} from './hooks';

export const renderChildren = function <P extends ContainerJson>(props: State<P>,
                                                                 mappings: any,
                                                                 modelId: string,
                                                                 handlers?: Handlers) {
    const items = props.items;
    const maxItems = props.maxItems;
    const minItems = props.minItems;
    if (typeof items === 'object') {
        const children = props.items;
        return (
                children.map((child: any) => {
                    const Comp = mappings?.[child[':type']];
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
                            <Comp key={child.id + '__' + modelId} {...child} />
                        </div>) :
                        <Comp key={child.id + '__' + modelId} {...child} />
                    );
                })
            );
    } else {
        return [];
    }
};