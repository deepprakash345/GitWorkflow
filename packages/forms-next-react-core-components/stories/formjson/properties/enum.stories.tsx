import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
const textInputE = {
    'label' : {
        'value' : 'Field with enum'
    },
    'description': 'Enter either 1 or 2',
    'viewType' : 'text-input'
};


const dropDownE = {
    'label' : {
        'value' : 'Dropdown with enum'
    },
    'viewType' : 'drop-down'
};

const radioE = {
    'label' : {
        'value' : 'Radio Button Group with enum'
    },
    'viewType' : 'radio-group'
};

const radioEWithEnumNames = {
    ...radioE,
    enumNames: ["option 1", "Option 2"],
    description: "The labels of individual options can be changed using enumNames"
};

const checkboxGroupE = {
    'label' : {
        'value' : 'Checkbox group with enum'
    },
    'viewType' : 'checkbox-group'
};

const checkboxE = {
    'label' : {
        'value' : 'Checkbox with enum'
    },
    'description': 'When selected 1 will be submitted, otherwise 2',
    'viewType' : 'checkbox'
};

const item = {
    'enum' : [1, 2],
    'name' : 'field'
};

const json:any = {
    'adaptiveform': '0.0.17-pre',
    'action': 'http://www.google.com/',
    'metadata': {
        'grammar': 'json-formula-1.0.0',
        'version': '1.0.0'
    }
};

export default {
    title: 'Crispr/JSON/Properties/enum',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

const args = function (x) {
    return {
        ...json,
        items: [
            {
                ...item,
                ...x
            }
        ]
    };
};

export const textInput = Template.bind({});
textInput.args = {formJson: args(textInput)};

export const dropDown = Template.bind({});
dropDown.args = {formJson: args(dropDownE)};

export const radio = Template.bind({});
radio.args = {formJson: args(radioE)};

export const checkbox = Template.bind({});
checkbox.args = {formJson: args(checkboxE)};

export const checkboxGroup = Template.bind({});
checkboxGroup.args = {formJson: args(checkboxGroupE)};

export const enumNames = Template.bind({});
enumNames.args = {formJson: args(radioEWithEnumNames)};
