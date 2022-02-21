import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';

const item = {
    'label' : {
        'value' : 'Field'
    },
    'name' : 'textInput'
};

const options = {
    enumNames: ['option 1', 'option 2'],
    enum: [0, 1]
};

const json:any = {
    'adaptiveform': '0.0.17-pre',
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

const getJson = (viewType: string) => {
    return {
    ...json,
        items: [{
        ...item,
        viewType
    }]
    };
};

const getOptionsJson = (viewType: string) => {
    return {
        ...json,
        items: [{
            ...item,
            viewType,
            ...options
        }]
    };
};

export const textInput = Template.bind({});
textInput.storyName = 'text-input';
textInput.args = {formJson: getJson('text-input')};

export const multilineInput = Template.bind({});
multilineInput.storyName = 'multiline-input';
multilineInput.args = {formJson: getJson('multiline-input')};

export const dateInput = Template.bind({});
dateInput.storyName = 'date-input';
dateInput.args = {formJson: getJson('date-input')};


export const numberInput = Template.bind({});
numberInput.storyName = 'number-input';
numberInput.args = {formJson: getJson('number-input')};


export const fileInput = Template.bind({});
fileInput.storyName = 'file-input';
fileInput.args = {formJson: getJson('file-input')};


export const dropDown = Template.bind({});
dropDown.storyName = 'drop-down';
dropDown.args = {formJson: getOptionsJson('drop-down')};


export const radioGroup = Template.bind({});
radioGroup.storyName = 'radio-group';
radioGroup.args = {formJson: getOptionsJson('radio-group')};


export const checkboxGroup = Template.bind({});
checkboxGroup.storyName = 'checkbox-group';
checkboxGroup.args = {formJson: getOptionsJson('checkbox-group')};

export const checkbox = Template.bind({});
const checkboxJson = {
    ...json,
    items: [{
        ...item,
        viewType: 'checkbox',
        type: 'boolean'
    }]
};
checkbox.args = {formJson: checkboxJson};

export const text = Template.bind({});
const textJson = {
    ...json,
    items: [{
        'name' : 'textInput',
        viewType: 'plain-text',
        value: 'text'
    }]
};
text.args = {formJson: textJson};
export const button = Template.bind({});
const buttonJson = {
    ...json,
    items: [{
        ...item,
        viewType: 'button',
        label: {
            value: 'click me'
        }
    }]
};
button.args = {formJson: buttonJson};