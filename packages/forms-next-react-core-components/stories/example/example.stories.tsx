import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-next-react-bindings';
import formJson from './json';
import Template from '../template';

export default {
    title: 'AdaptiveForm/Examples',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

export const contact = Template.bind({});
contact.args = {
    formJson: formJson.contactJson
};