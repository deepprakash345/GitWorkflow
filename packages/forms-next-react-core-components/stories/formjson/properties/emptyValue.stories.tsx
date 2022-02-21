import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {base, logData} from "../template";

const sampleField = {
    viewType: 'text-input',
    type: "string",
    "name": "field",
    label: {
        value: "Label of the field"
    }
}

const undefExample = {
    ...base,
    items: [
        {
            ...sampleField,
            description: "When empty value is undefined, data will not be submitted for the field"
        }
    ]
}

const nullExample = {
    ...base,
    items: [
        {
            ...sampleField,
            emptyValue: null,
            description: "When empty value is undefined, data will not be submitted for the field"
        }
    ]
}

const emptyStringExample = {
    ...base,
    items: [
        {
            ...sampleField,
            emptyValue: '',
            description: "When empty value is '', '' (empty string) will be submitted for the field when empty"
        }
    ]
}

export default {
    title: 'Form JSON/Properties/emptyValue',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onFieldChanged={logData}/>
    </Spectrum3Provider>
);

export const useCase1 = Template.bind({})
useCase1.storyName = "undefined"
useCase1.args=  {formJson : undefExample}

export const useCase2 = Template.bind({})
useCase2.storyName = "null"
useCase2.args=  {formJson : nullExample}

export const useCase3 = Template.bind({})
useCase3.storyName = "empty string"
useCase3.args=  {formJson : emptyStringExample}