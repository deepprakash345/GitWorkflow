import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {Action} from "@aemforms/crispr-core/lib";
import { action } from '@storybook/addon-actions';
import {base} from "../template";

const defaultTypeExample = {
    "name" : "field",
    'label' : {
        'value' : 'Text Field'
    },
    'description': 'Default type for text-input is string',
    'viewType' : 'text-input',
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
    title: 'Form JSON/Constraints/type/string',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onFieldChanged={logData}/>
    </Spectrum3Provider>
);

export const defaultType = Template.bind({})
defaultType.storyName = "default"
defaultType.args = {formJson: {
        ...base,
        items: [{
            ...defaultTypeExample
        }]
    }}


export const numberInput = Template.bind({})
numberInput.args = {formJson: {
        ...base,
        items: [{
            ...numberInputTypeExample
        }]
    }}
