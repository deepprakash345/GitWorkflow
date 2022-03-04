import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import {mappings} from '../../src';
import {decorator, logAction} from "../template";
import {examples} from "./json";
import documentation from './documentation.mdx'


export default {
    title: 'Crispr/Form Components/TextField',
    component: AdaptiveForm,
    decorators: [decorator],
    parameters: {
        docs: {
            page: documentation
        }
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>
);

export const def = Template.bind({})
def.storyName = "Default"
def.args = {formJson: examples['text-input'], onSubmit : logAction('data')}

export const typeNumber = Template.bind({})
typeNumber.storyName = "Capturing Number"
typeNumber.args = {formJson: examples['text-input-number'], onSubmit : logAction('data')}

export const typeDate = Template.bind({})
typeDate.storyName = "Capturing Dates"
typeDate.args = {formJson: examples['text-input-date'], onSubmit : logAction('data')}

export const customProperties = Template.bind({})
customProperties.storyName = "Custom Properties- isQuiet=true"
customProperties.args = {formJson: examples['text-input-custom'], onSubmit : logAction('data')}

