import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-super-component';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
const textInput = {
    'label' : {
        'value' : 'Field'
    },
    'description': 'Leave the field empty to fail required validation',
    'fieldType' : 'text-input'
};

const dropDown = {
    'label' : {
        'value' : 'Dropdown'
    },
    'enum' : [0, 1],
    'enumNames' : ['Option 1', 'Option 2'],
    'description': 'Leave the field empty to fail required validation',
    'fieldType' : 'drop-down'
};

const radio = {
    'label' : {
        'value' : 'Radio Button Group'
    },
    'enum' : [0, 1],
    'enumNames' : ['Option 1', 'Option 2'],
    'description': 'Do not select any option to fail required validation',
    'fieldType' : 'radio-group'
};

const checkboxGroup = {
    'label' : {
        'value' : 'Checkbox group'
    },
    'enum' : [0, 1],
    'enumNames' : ['Option 1', 'Option 2'],
    'description': 'Do not select any option to fail required validation',
    'fieldType' : 'checkbox-group'
};

const checkbox = {
    'label' : {
        'value' : 'Checkbox'
    },
    'type' : 'boolean',
    'description': 'Unselect to trigger fail validation',
    'fieldType' : 'checkbox'
};

const item = {
    'required' : true,
    'name' : 'field'
};

const itemWithCustomRequiredMessage = {
    'required' : true,
    'name' : 'field1',
    'constraintMessages' : {
        'required' : 'The required message has been customized'
    }
};

const json:any = {
    'adaptiveform': '0.0.17-pre',
    'action': 'http://www.google.com/',
    'items' : [
        {
            'fieldType': 'button',
            'label' : {
                'value' : 'submit to trigger validation'
            },
            'events' : {
                'click' : 'submitForm()'
            }
        }
    ],
    'metadata': {
        'grammar': 'json-formula-1.0.0',
        'version': '1.0.0'
    }
};

export default {
    title: 'Reference/JSON/Constraints/required',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const [requiredField, requiredDropdown, requiredRadioGroup, requiredCheckbox, requiredCheckboxGroup] =
    [textInput, dropDown, radio, checkbox, checkboxGroup].map(x => {
        const formJson = {
            ...json,
            items: [
                {
                    ...item,
                    ...x
                },
                {
                    ...itemWithCustomRequiredMessage,
                    ...x,
                    description : 'This Field has a custom error message'
                },
                ...json.items
            ]
        };
        const y = Template.bind({});
        // y.storyName = formJson.items[0].label.value;
        y.args = {formJson};
        return y;
    });

