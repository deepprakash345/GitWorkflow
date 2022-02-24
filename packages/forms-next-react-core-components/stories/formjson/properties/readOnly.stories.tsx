import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import { action } from '@storybook/addon-actions';
import {Action} from "@aemforms/crispr-core/lib";
import {base} from "../../template";

const generate = (t = "text-input", extras = {}) => {
    return {
        ...base,
        items: [
        {
            'name' : 'field1',
            label : {
                value : 'Field Label'
            },
            'description': 'This field is read only',
            'readOnly' : true,
            viewType: t,
            ...extras
        }
    ]}
}

export default {
    title: 'Crispr/JSON/Properties/readOnly',
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

export const dateInput = Template.bind({});
dateInput.storyName = 'date-input';
dateInput.args = {formJson: generate('date-input')};


export const numberInput = Template.bind({});
numberInput.storyName = 'number-input';
numberInput.args = {formJson: generate('number-input')};


export const fileInput = Template.bind({});
fileInput.storyName = 'file-input';
fileInput.args = {formJson: generate('file-input')};

const opts = {
    enum: [1, 2],
    enumNames: ["Option 1", "Option 2"]
}

export const dropDown = Template.bind({});
dropDown.storyName = 'drop-down';
dropDown.args = {formJson: generate('drop-down', opts)};

export const radioGroup = Template.bind({});
radioGroup.storyName = 'radio-group';
radioGroup.args = {formJson: generate('radio-group', opts)};

export const checkboxGroup = Template.bind({});
checkboxGroup.storyName = 'checkbox-group';
checkboxGroup.args = {formJson: generate('checkbox-group', opts)};

export const checkbox = Template.bind({});
checkbox.storyName = 'checkbox';
checkbox.args = {formJson: generate('checkbox', {type: "boolean" })};
