import React from "react";
import {jsonString} from "@aemforms/crispr-core";
import { Source } from '@storybook/components';

const imports = {
    onSubmit: `import Submit from '@aemforms/crispr-react-bindings';`
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

const getCode = (json, callbacks) => {
    return `import {mappings} from '@aemforms/crispr-react-core-components'
import {AdaptiveForm} from '@aemforms/crispr-react-bindings';
${callbacks.map(x => imports[x]).join('\n')}
import json from './Form.json';
${callbacks.map(x => calls[x]).join('\n')}
const Example = () => <AdaptiveForm mappings={mappings} formJson={json} ${callbacks.map(x => props[x]).join(' ')}/>

export default Example
`
}

export const Code = function ({json, callbacks}) {
    const code = getCode(json, callbacks)
    return (
        <Source language="javascript" code={code} />);
}
