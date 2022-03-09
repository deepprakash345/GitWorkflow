import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@aemforms/forms-super-component';
import {ComponentStory} from '@storybook/react';
import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum';
import {mappings} from '../../src';
import {decorator, formWithSubmit, logAction} from "../template";
import {examples} from "./json";
import React from 'react';

export default {
    title: 'Adaptive Form/Components/Other Components',
    component: AdaptiveForm,
    decorators: [decorator],
    args : {
        onSubmit : logAction("data")
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <AdaptiveForm mappings={mappings} formJson={args.formJson}  onSubmit={args.onSubmit}/>
);

const field = (label, name, description= undefined) => {
    return {
        fieldType: 'text-input',
        label: {
            value: label
        },
        name,
        description
    }
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

export const numberWidget = Template.bind({})
numberWidget.storyName = "Number widget"
numberWidget.args = {formJson: formWithSubmit({
        ...field('Numeric Widget to capture number', 'field1'),
        type: 'number',
        fieldType: 'number-input'}), onSubmit : logAction('data')}

export const dateWidget = Template.bind({})
dateWidget.storyName = "Date Widget"
dateWidget.args = {formJson: formWithSubmit({
        ...field('Date Widget to capture dates', 'field1'),
        fieldType: 'date-input'}), onSubmit : logAction('data')}