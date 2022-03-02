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
    'fieldType' : 'text-input',
    description : "Enter either true or false",
    type: 'boolean'
};

export default {
    title: 'Reference/JSON/Constraints/type/boolean',
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

export const boolean = Template.bind({})
boolean.storyName = "boolean"
boolean.args = {formJson: formWithSubmit({
        ...textInputExample
    })
}
