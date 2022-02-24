import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@aemforms/crispr-react-bindings';
import {ComponentStory} from '@storybook/react';
import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum';
import {mappings} from '../../src';
import {decorator, logAction} from "../template";
import {examples} from "./json";
import documentation from './doc/chapter1.mdx'

export default {
    title: 'Crispr/Form Components',
    component: AdaptiveForm,
    decorators: [decorator],
    parameters: {
        docs: {
            page: documentation
        }
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
        <AdaptiveForm mappings={mappings} formJson={args.formJson}  onSubmit={args.onSubmit}/>
);

export const button = Template.bind({});
button.args={formJson:examples['button'], onSubmit : logAction('data')}


export const dateInput = Template.bind({})
dateInput.args = {formJson: examples['date-input'], onSubmit : logAction('data')}

export const fileUpload = Template.bind({})
fileUpload.args = {formJson: examples['file-input'], onSubmit : logAction('data')}

export const multilineInput = Template.bind({})
multilineInput.args = {formJson: examples['multiline-input'], onSubmit : logAction('data')}

export const numberInput = Template.bind({})
numberInput.args = {formJson: examples['number-input'], onSubmit : logAction('data')}

export const radioGroup = Template.bind({})
radioGroup.args = {formJson: examples['radio-group'], onSubmit : logAction('data')}

export const text = Template.bind({});
text.args={formJson:examples['plain-text'], onSubmit : logAction('data')}