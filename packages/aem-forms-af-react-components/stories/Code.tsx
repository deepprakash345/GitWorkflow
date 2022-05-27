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

import React from "react";
import {jsonString} from "@adobe/aem-forms-af-core";
import { Source } from '@storybook/components';

const imports = {
    onSubmit: `import Submit from '@adobe/aem-forms-af-super-component';`
}

const calls = {
    onSubmit: `const onSubmit = (action: Submit) => {
    console.log(action.target.exportData())
}
`
}

const props = {
    onSubmit: `onSubmit={onSubmit}`
}

const getCode = (callbacks) => {
    return `import {mappings} from '@adobe/aem-forms-af-react-components'
import {AdaptiveForm} from '@adobe/aem-forms-af-super-component';
${callbacks.map(x => imports[x]).join('\n')}
import json from './demo.form.json';
${callbacks.map(x => calls[x]).join('\n')}
const Example = () => (<AdaptiveForm mappings={mappings} formJson={json} ${callbacks.map(x => props[x]).join(' ')}/>)
export default Example
`
}

export const Code = function ({callbacks}) {
    const code = getCode(callbacks)
    return (
        <Source language="javascript" code={code} />);
}
