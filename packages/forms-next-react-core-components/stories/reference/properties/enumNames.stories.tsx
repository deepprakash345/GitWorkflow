import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-super-component';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {formWithSubmit} from "../../template";

export default {
    title: 'Reference/JSON/Properties/enumNames',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;


const radioEWithEnumNames = {
    'label' : {
        'value' : 'Radio Button Group with enum'
    },
    enum: [1, 2],
    'fieldType' : 'radio-group',
    enumNames: ["option 1", "Option 2"],
    description: "The labels of individual options can be changed using enumNames"
};

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const enumNames = Template.bind({});
enumNames.storyName = "enumNames"
enumNames.args = {formJson: formWithSubmit(radioEWithEnumNames)};