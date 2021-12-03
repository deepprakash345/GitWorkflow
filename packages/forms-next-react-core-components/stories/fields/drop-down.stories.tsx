import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-next-react-bindings';
import formJson from './json';
import Template from '../template';

export default {
    title: 'AdaptiveForm/Form Fields/Form With Drop Down',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;


export const staticOptions = Template.bind({});
staticOptions.args = {
    formJson: formJson.staticDropDown
};

export const fetchOptionsFromApi = Template.bind({});
fetchOptionsFromApi.args = {
    formJson: formJson.dynamicDropDown
};