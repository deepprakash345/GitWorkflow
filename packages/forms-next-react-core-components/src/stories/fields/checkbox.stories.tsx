import { ComponentMeta } from '@storybook/react';
import AdaptiveForm from '../../components/AdaptiveForm';
import formJson from './json';
import Template from '../template';

export default {
    title: 'AdaptiveForm/Form Fields/Form With Checkbox',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;


export const Default = Template.bind({});
Default.args = {
    formJson: formJson.defaultCheckbox
};

export const boolean = Template.bind({});
boolean.args = {
    formJson: formJson.booleanCheckbox
};

export const string = Template.bind({});
string.args = {
    formJson: formJson.stringCheckbox
};