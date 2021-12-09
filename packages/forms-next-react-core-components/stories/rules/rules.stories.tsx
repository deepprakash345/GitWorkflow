import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-next-react-bindings';
import Template from '../template';
import formJson from './json';

export default {
    title: 'AdaptiveForm/Form Rules',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

export const FormVisibiltyRules = Template.bind({});
FormVisibiltyRules.args = {
    formJson: formJson.showHideJson
};
FormVisibiltyRules.storyName = 'Show/Hide';

export const readonly = Template.bind({});
readonly.args = {
    formJson: formJson.readonlyJson
};

export const required = Template.bind({});
required.args = {
    formJson: formJson.requiredJson
};

export const title = Template.bind({});
title.args = {
    formJson: formJson.titleJson
};

