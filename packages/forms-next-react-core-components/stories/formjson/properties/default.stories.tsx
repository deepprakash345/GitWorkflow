import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import { action } from '@storybook/addon-actions';
import {Action} from "@aemforms/crispr-core/lib";

const defaultString = [{
    'name' : 'field1',
    label : {
        value : 'Text Field'
    },
    'default': 'Default Value',
    'viewType' : 'text-input'
}]

const defaultNumber = [{
    'name' : 'field1',
    label : {
        value : 'Number Field'
    },
    'default': 1,
    'viewType' : 'number-input'
}]

const defaultDate = [{
    'name' : 'field1',
    label : {
        value : 'Date Field'
    },
    'default': "2010-10-10",
    'viewType' : 'date-input'
}]

const defaultArray = [{
    'name' : 'field1',
    label : {
        value : 'Default Selection in Checkboxes'
    },
    "description" : "all components can have default values. Try them out from the controls",
    type: "string[]",
    'default': ["a", "b"],
    enum: ["a", "b", "c"],
    enumNames: ["Option 1", "Option 2", "Option 3"],
    'viewType' : 'checkbox-group'
}]

const base = {
    'adaptiveform': '0.0.17-pre',
    'metadata': {
        'grammar': 'json-formula-1.0.0',
        'version': '1.0.0'
    }
}

const logData = (e: Action) => action('onFieldChanged')(e.target.exportData());

export default {
    title: 'Form JSON/Properties/default',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onFieldChanged={logData}/>
    </Spectrum3Provider>
);

export const string = Template.bind({});
string.args = {formJson: {
        ...base,
        items : defaultString
}};

export const number = Template.bind({});
number.args = {formJson: {
        ...base,
        items : defaultNumber
    }};

export const date = Template.bind({});
date.args = {formJson: {
        ...base,
        items : defaultDate
    }};

export const array = Template.bind({});
array.args = {formJson: {
        ...base,
        items : defaultArray
    }};