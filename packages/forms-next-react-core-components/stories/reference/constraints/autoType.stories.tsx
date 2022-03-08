import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {Action} from "@aemforms/crispr-core";
import { action } from '@storybook/addon-actions';
import {base, decorator, formWithSubmit, logAction} from "../../template";

const enumInputTypeExample = {
    "name" : "field",
    'label' : {
        'value' : 'Text Field'
    },
    enum: [1, 2, 3, 4],
    'description': "Type can be deduced from enum values as well",
    'fieldType' : 'text-input',
};

export default {
    title: 'Reference/JSON/Constraints/type/auto',
    decorators: [decorator],
    component: AdaptiveForm,

} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>
    </Spectrum3Provider>
);

export const enumType = Template.bind({})
enumType.storyName = "enum"
enumType.args = {formJson: formWithSubmit(enumInputTypeExample)}
