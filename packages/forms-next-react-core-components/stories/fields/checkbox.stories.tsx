import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@aemforms/crispr-react-bindings';
import {ComponentStory} from '@storybook/react';
import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum';
import {mappings} from '../../src';
import {decorator, logAction} from "../template";
import documentation from './documentation.mdx'
import {examples} from "./json";

export default {
    title: 'Crispr/Form Components/Checkbox',
    component: AdaptiveForm,
    decorators: [decorator],
    parameters: {
        docs: {
            page: documentation
        }
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>)

export const def = Template.bind({});
def.storyName = "default"
def.args={formJson:examples['checkbox'], onSubmit : logAction('data')}
def.parameters = {
    highlights: ["items.0.enum"]
}

export const noOffValue = Template.bind({});
noOffValue.args={formJson:examples['checkboxNoOff'], onSubmit : logAction('data')}
noOffValue.parameters = {
    highlights: ["items.0.enum"]
}

export const boolean = Template.bind({});
boolean.args={formJson:examples['checkboxBoolean'], onSubmit : logAction('data')}
boolean.parameters = {
    highlights: ["items.0"]
}

