import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {base, decorator, formWithSubmit, logAction} from "../../template";

const textInputExample = {
    "name" : "field",
    'label' : {
        'value' : 'Text Field'
    },
    type: 'number',
    description: 'Enter only numbers',
    'viewType' : 'text-input'
};

const numberInputExample = {
    "name" : "field",
    'label' : {
        'value' : 'Text Field'
    },
    type: 'number',
    'description': "A text input's value can be saved as number",
    'viewType' : 'number-input',
};


export default {
    title: 'Reference/JSON/Constraints/type/number',
    component: AdaptiveForm,
    decorators: [decorator],
    args: {
        onSubmit : logAction("submit")
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>
    </Spectrum3Provider>
);

export const textInput = Template.bind({})
textInput.args = {formJson: formWithSubmit({
            ...textInputExample
        })
    }

export const numberInput = Template.bind({})
numberInput.args = {
    formJson: formWithSubmit({
            ...numberInputExample
        })
    }
