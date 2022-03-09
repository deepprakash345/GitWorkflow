import React from "react";
import {jsonString} from "@aemforms/forms-core";
import { Source } from '@storybook/components';

const imports = {
    onSubmit: `import Submit from '@aemforms/forms-super-component';`
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
    return `import {mappings} from '@aemforms/forms-react-components'
import {AdaptiveForm} from '@aemforms/forms-super-component';
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
