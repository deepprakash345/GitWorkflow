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
    type: 'string'
};

export default {
    title: 'Reference/JSON/Constraints/type/string',
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

export const string = Template.bind({})
string.storyName = "string"
string.args = {formJson: formWithSubmit({
            ...textInputExample
        })
    }
