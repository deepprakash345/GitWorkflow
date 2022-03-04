import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@aemforms/crispr-react-bindings';
import {ComponentStory} from '@storybook/react';
import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum';
import {mappings} from '../../src';
import {decorator, logAction} from "../template";
import {examples} from "./json";
import documentation from './documentation.mdx'

export default {
    title: 'Crispr/Form Components',
    component: AdaptiveForm,
    decorators: [decorator],
    parameters: {
        docs: {
            page: documentation
        }
    },
    args : {
        onSubmit : logAction("data")
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
        <AdaptiveForm mappings={mappings} formJson={args.formJson}  onSubmit={args.onSubmit}/>
);

export const button = Template.bind({});
button.args={formJson:examples['button']}
button.parameters = {
    highlights: ["items.0"]
}

export const dateInput = Template.bind({})
dateInput.args = {formJson: examples['date-input']}
dateInput.parameters = {
    highlights: ["items.0"]
}

export const fileUpload = Template.bind({})
fileUpload.args = {formJson: examples['file-input']}
fileUpload.parameters = {
    highlights: ["items.0"]
}

export const multilineInput = Template.bind({})
multilineInput.args = {formJson: examples['multiline-input']}
multilineInput.parameters = {
    highlights: ["items.0"]
}

export const numberInput = Template.bind({})
numberInput.args = {formJson: examples['number-input']}
numberInput.parameters = {
    highlights: ["items.0"]
}

export const text = Template.bind({});
text.args={formJson:examples['plain-text']}
text.parameters = {
    highlights: ["items.0"]
}

export const password = Template.bind({});
password.args = { formJson: examples['password'] }
password.parameters = {
  highlights: ["items.0"]
}