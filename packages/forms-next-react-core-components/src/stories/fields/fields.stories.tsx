import { ComponentMeta } from '@storybook/react';
import AdaptiveForm from '../../components/AdaptiveForm';
import formJson from './json';
import Template from '../template';

export default {
    title: 'AdaptiveForm/Form Fields',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;


export const FormWithRadioButton = Template.bind({});
FormWithRadioButton.args = {
    formJson: formJson.radio
};

export const FormWithPlainText = Template.bind({});
FormWithPlainText.args = {
    formJson: formJson.plainText
};

export const FormWithButton = Template.bind({});
FormWithButton.args = {
    formJson: formJson.button
};

export const FormWithMultiLine = Template.bind({});
FormWithMultiLine.args = {
    formJson: formJson.multiline
};

export const FormWithPanel = Template.bind({});
FormWithPanel.args = {
    formJson: formJson.panel
};

