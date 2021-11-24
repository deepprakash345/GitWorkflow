import { ComponentMeta } from '@storybook/react';
import AdaptiveForm from '../../components/AdaptiveForm';
import contactJson from './json/contact.json';
import Template from '../template';

export default {
    title: 'AdaptiveForm/Examples',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

export const contact = Template.bind({});
contact.args = {
    formJson: contactJson
};