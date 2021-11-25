import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-next-react-bindings';
import jsonform from './json';
import Template from '../template';

export default {
    title: 'AdaptiveForm/Validations',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;


export const required = Template.bind({});
required.args = {
    formJson: jsonform.requiredJson
};

export const maxminlength = Template.bind({});
maxminlength.args = {
    formJson: jsonform.maxMinLengthJson
};
maxminlength.storyName = 'Max/Min Length';

export const maximumMinimum = Template.bind({});
maximumMinimum.args = {
    formJson: jsonform.maxMinValueJson
};
maximumMinimum.storyName = 'Max/Min Value';

export const pattern = Template.bind({});
pattern.args = {
    formJson: jsonform.patternJson
};

export const customErrorMessage = Template.bind({});
customErrorMessage.args = {
    formJson: jsonform.errorJson
};