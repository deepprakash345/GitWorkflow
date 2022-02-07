import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-next-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';

const item = {
    'label' : {
        'value' : 'Field'
    },
    'name' : 'textInput'
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
    title: 'Form JSON/Properties/viewType',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const [textInput, multilineInput, dateInput, numberInput, fileInput ] =
    ['text-input', 'multiline-input', 'date-input', 'number-input', 'file-input' ].map(x => {
    const j1 = {
        ...json,
        items: [{
            ...item,
            viewType: x
        }]
    };
    const y = Template.bind({});
    y.storyName = x;
    y.args = {formJson: j1};
    return y;
});

export const [dropDown, radioGroup, checkboxGroup] =
    ['drop-down', 'radio-group' , 'checkboxGroup'].map(x => {
    const j1 = {
        ...json,
        items: [{
            ...item,
            viewType: x,
            enumNames: ['option 1', 'option 2'],
            enum: [0, 1]
        }]
    };
    const y = Template.bind({});
    y.storyName = x;
    y.args = {formJson: j1};
    return y;
});

const checkbox = Template.bind({});
const checkboxJson = {
    ...json,
    items: [{
        ...item,
        viewType: 'checkbox',
        type: 'boolean'
    }]
};
checkbox.args = {formJson: checkboxJson};

const text = Template.bind({});
const textJson = {
    ...json,
    items: [{
        'name' : 'textInput',
        viewType: 'plain-text',
        value: 'text'
    }]
};
text.args = {formJson: textJson};
const button = Template.bind({});
const buttonJson = {
    ...json,
    items: [{
        ...item,
        viewType: 'button'
    }]
};
button.args = {formJson: buttonJson};