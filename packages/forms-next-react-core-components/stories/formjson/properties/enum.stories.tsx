import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
const textInput = {
    'label' : {
        'value' : 'Field with enum'
    },
    'description': 'Enter either 1 or 2',
    'viewType' : 'text-input'
};


const dropDown = {
    'label' : {
        'value' : 'Dropdown with enum'
    },
    'viewType' : 'drop-down'
};

const radio = {
    'label' : {
        'value' : 'Radio Button Group with enum'
    },
    'viewType' : 'radio-group'
};

const checkboxGroup = {
    'label' : {
        'value' : 'Checkbox group with enum'
    },
    'viewType' : 'checkbox-group'
};

const checkbox = {
    'label' : {
        'value' : 'Checkbox with enum'
    },
    'description': 'When selected 1 will be submitted, otherwise 2',
    'viewType' : 'checkbox'
};

const item = {
    'enum' : [1, 2],
    'enumNames': ['1', '2'],
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
    title: 'Form JSON/Properties/enum',
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

export const enumTextInput = Template.bind({});
enumTextInput.args = {formJson: args(textInput)};

export const enumDropDown = Template.bind({});
enumDropDown.args = {formJson: args(dropDown)};

export const enumRadio = Template.bind({});
enumRadio.args = {formJson: args(radio)};

export const enumCheckbox = Template.bind({});
enumCheckbox.args = {formJson: args(checkbox)};

export const enumCheckboxGroup = Template.bind({});
enumCheckboxGroup.args = {formJson: args(checkboxGroup)};
