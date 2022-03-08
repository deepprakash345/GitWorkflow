import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import { action } from '@storybook/addon-actions';
import {Action} from "@aemforms/crispr-core";
import {base} from "../../template";

const visibleExample = [
    {
        'name' : 'field1',
        label : {
            value : 'Field 1'
        },
        visible: true,
        'description': 'A Field is visible by default. Visible property is applicable for all field types',
        'fieldType' : 'text-input'
    }
]
const hiddenExample = [
    {
        'name' : 'field1',
        label : {
            value : 'Field 1'
        },
        'description': 'There is a hidden field in the form. Type some thing and check the data.',
        'fieldType' : 'text-input'
    },
    {
        'name' : 'field2',
        fieldType: 'text-input',
        "default": 'default Value for hidden field',
        visible: false
    }
]

const logData = (e: Action) => action('onFieldChanged')(e.target.exportData());

export default {
    title: 'Reference/JSON/Properties/visible',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onFieldChanged={logData}/>
    </Spectrum3Provider>
);

export const visible = Template.bind({});
visible.storyName = "visible"
visible.args = {formJson: {
        ...base,
        items: visibleExample
    }};

export const hidden = Template.bind({});
hidden.storyName = "hidden"
hidden.args = {formJson: {
        ...base,
        items: hiddenExample
}};