import { ComponentMeta } from '@storybook/react';
import AdaptiveForm from '../../components/AdaptiveForm';
import initializeJson from './json/initializeJson.json';
import clickJson from './json/click.json';
import Template from '../template';

export default {
    title: 'AdaptiveForm/Form Events',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

export const fetchDataFromApi = Template.bind({});
fetchDataFromApi.args = {
    formJson: initializeJson
};

export const clickEvent = Template.bind({});
clickEvent.args = {
    formJson: clickJson
};
