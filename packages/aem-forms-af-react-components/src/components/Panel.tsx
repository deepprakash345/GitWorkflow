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

import { Flex } from '@adobe/react-spectrum';
import {FieldsetJson} from '@adobe/aem-forms-af-core';
import React, {useContext} from 'react';

import {useRuleEngine, renderChildren, FormContext} from '@adobe/aem-forms-af-super-component';
import {State} from '@adobe/aem-forms-af-core';

const Panel = function (fieldset: State<FieldsetJson>) {
    const context = useContext(FormContext);
    const [props, handlers] = useRuleEngine(fieldset);

    if (props.visible) {
        return (<Flex direction="column" width="300px" gap="10px">
            {renderChildren(props, context.mappings, context.modelId, handlers)}
        </Flex>);
    } else {
        return null;
    }
};

export default Panel;