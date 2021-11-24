import { ComponentMeta } from '@storybook/react';
import AdaptiveForm from '../../components/AdaptiveForm';
import showHideJson from './json/show-hide.json';
import readonlyJson from './json/readonly.json';
import requiredJson from './json/required.json';
import titleJson from './json/title.json';
import Template from '../template';

export default {
    title: 'AdaptiveForm/Form Rules',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

export const FormVisibiltyRules = Template.bind({});
FormVisibiltyRules.args = {
    formJson: showHideJson
};
FormVisibiltyRules.storyName = 'Show/Hide';

export const readonly = Template.bind({});
readonly.args = {
    formJson: readonlyJson
};

export const required = Template.bind({});
required.args = {
    formJson: requiredJson
};

export const title = Template.bind({});
title.args = {
    formJson: titleJson
};

