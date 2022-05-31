/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@adobe/aem-forms-af-react-renderer';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import React from 'react';
import {decorator} from "../../template";

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
    'adaptiveform': '0.10.0',
    'metadata': {
        'grammar': 'json-formula-1.0.0',
        'version': '1.0.0'
    }
};


export default {
    title: 'Reference/JSON/Properties/fieldType',
    component: AdaptiveForm,
    decorators: [decorator]
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => <AdaptiveForm mappings={mappings} formJson={args.formJson} />

const getJson = (fieldType: string) => {
    return {
    ...json,
        items: [{
        ...item,
        fieldType
    }]
    };
};

const getOptionsJson = (fieldType: string) => {
    return {
        ...json,
        items: [{
            ...item,
            fieldType,
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
checkbox.storyName = "checkbox"
const checkboxJson = {
    ...json,
    items: [{
        ...item,
        fieldType: 'checkbox',
        type: 'boolean'
    }]
};
checkbox.args = {formJson: checkboxJson};

export const text = Template.bind({});
text.storyName = "text"
const textJson = {
    ...json,
    items: [{
        'name' : 'textInput',
        fieldType: 'plain-text',
        value: 'text'
    }]
};
text.args = {formJson: textJson};
export const button = Template.bind({});
button.storyName = "button"
const buttonJson = {
    ...json,
    items: [{
        ...item,
        fieldType: 'button',
        label: {
            value: 'click me'
        }
    }]
};
button.args = {formJson: buttonJson};