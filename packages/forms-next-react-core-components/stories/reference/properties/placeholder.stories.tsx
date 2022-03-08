import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-super-component';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {base} from "../../template";

const generate = (t = "text-input", extras = {}, support = true) => {
    return {
        ...base,
        items: [
            {
                'name' : 'field1',
                label : {
                    value : 'Field Label'
                },
                'placeholder': 'Enter the value in the field',
                fieldType: t,
                ...extras
            }
        ]}
}

export default {
    title: 'Reference/JSON/Properties/placeholder',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson}/>
    </Spectrum3Provider>
);

export const textInput = Template.bind({});
textInput.storyName = 'text-input';
textInput.args = {formJson: generate('text-input')};

export const multilineInput = Template.bind({});
multilineInput.storyName = 'multiline-input';
multilineInput.args = {formJson: generate('multiline-input')};

const opts = {
    enum: [1, 2],
    enumNames: ["Option 1", "Option 2"]
}

export const dropDown = Template.bind({});
dropDown.storyName = 'drop-down';
dropDown.args = {formJson: generate('drop-down', opts)};
