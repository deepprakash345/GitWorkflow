import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@aemforms/crispr-react-bindings';
import {ComponentStory} from '@storybook/react';
import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum';
import {mappings} from '../../src';
import {decorator, logAction} from "../template";
import {examples} from "./json";
import React from 'react';

export default {
    title: 'Crispr/Form Components/Other Components',
    component: AdaptiveForm,
    decorators: [decorator],
    args : {
        onSubmit : logAction("data")
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
        <AdaptiveForm mappings={mappings} formJson={args.formJson}  onSubmit={args.onSubmit}/>
);

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