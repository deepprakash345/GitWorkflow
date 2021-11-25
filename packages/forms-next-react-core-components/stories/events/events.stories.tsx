import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-next-react-bindings';
import formJson from './json';
import Template from '../template';

export default {
    title: 'AdaptiveForm/Form Events',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

export const fetchDataFromApi = Template.bind({});
fetchDataFromApi.args = {
    formJson: formJson.initializeJson
};

export const clickEvent = Template.bind({});
clickEvent.args = {
    formJson: formJson.clickJson
};
