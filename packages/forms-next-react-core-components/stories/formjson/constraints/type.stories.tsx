import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {Action} from "@aemforms/crispr-core/lib";
import { action } from '@storybook/addon-actions';
import {base} from "../../template";

const textInputExample = {
    "name" : "field",
    'label' : {
        'value' : 'Text Field'
    },
    'viewType' : 'text-input',
    type: 'string'
};

const numberInputTypeExample = {
    "name" : "field",
    'label' : {
        'value' : 'Text Field'
    },
    type : "string",
    'description': "A number input's value can be saved as string",
    'viewType' : 'number-input',
};

const logData = (e: Action) => action('onFieldChanged')(e.target.exportData());

export default {
    title: 'Crispr/JSON/Constraints/type/string',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onFieldChanged={logData}/>
    </Spectrum3Provider>
);

export const textInput = Template.bind({})
textInput.args = {formJson: {
        ...base,
        items: [{
            ...textInputExample
        }]
    }}


export const numberInput = Template.bind({})
numberInput.args = {formJson: {
        ...base,
        items: [{
            ...numberInputTypeExample
        }]
    }}
