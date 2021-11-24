import { ComponentMeta } from '@storybook/react';
import AdaptiveForm from '../../components/AdaptiveForm';
import formJson from './json';
import Template from '../template';

export default {
    title: 'AdaptiveForm/Form Fields/Form With Text Fields',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

export const string = Template.bind({});
string.args = {
    formJson: formJson.textInput
};

export const number = Template.bind({});
number.args = {
    formJson: formJson.numberInput
};

export const date = Template.bind({});
date.args = {
    formJson: formJson.dateInput
};

export const Description = Template.bind({});
Description.args = {
    formJson: formJson.description
};