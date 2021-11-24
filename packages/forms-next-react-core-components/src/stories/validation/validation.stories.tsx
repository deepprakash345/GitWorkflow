import { ComponentMeta } from '@storybook/react';
import AdaptiveForm from '../../components/AdaptiveForm';
import requiredJson from './json/required.json';
import maxMinLengthJson from './json/max-min-length.json';
import maxMinValueJson from './json/max-min-value.json';
import patternJson from './json/pattern.json';
import errorJson from './json/custom-error.json';
import Template from '../template';

export default {
    title: 'AdaptiveForm/Validations',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;


export const required = Template.bind({});
required.args = {
    formJson: requiredJson
};

export const maxminlength = Template.bind({});
maxminlength.args = {
    formJson: maxMinLengthJson
};
maxminlength.storyName = 'Max/Min Length';

export const maximumMinimum = Template.bind({});
maximumMinimum.args = {
    formJson: maxMinValueJson
};
maximumMinimum.storyName = 'Max/Min Value';

export const pattern = Template.bind({});
pattern.args = {
    formJson: patternJson
};

export const customErrorMessage = Template.bind({});
customErrorMessage.args = {
    formJson: errorJson
};