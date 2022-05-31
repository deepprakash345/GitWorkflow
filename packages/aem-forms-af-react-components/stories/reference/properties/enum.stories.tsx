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
const textInputE = {
    'label' : {
        'value' : 'Field with enum'
    },
    'description': 'Enter either 1 or 2',
    'fieldType' : 'text-input'
};


const dropDownE = {
    'label' : {
        'value' : 'Dropdown with enum'
    },
    'fieldType' : 'drop-down'
};

const radioE = {
    'label' : {
        'value' : 'Radio Button Group with enum'
    },
    'fieldType' : 'radio-group'
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
    'fieldType' : 'checkbox-group'
};

const checkboxE = {
    'label' : {
        'value' : 'Checkbox with enum'
    },
    'description': 'When selected 1 will be submitted, otherwise 2',
    'fieldType' : 'checkbox'
};

const item = {
    'enum' : [1, 2],
    'name' : 'field'
};

const json:any = {
    'adaptiveform': '0.10.0',
    'action': 'http://www.google.com/',
    'metadata': {
        'grammar': 'json-formula-1.0.0',
        'version': '1.0.0'
    }
};

export default {
    title: 'Reference/JSON/Properties/enum',
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
textInput.storyName = "text-input"
textInput.args = {formJson: args(textInputE)};

export const dropDown = Template.bind({});
dropDown.storyName = "drop-down"
dropDown.args = {formJson: args(dropDownE)};

export const radio = Template.bind({});
radio.storyName = "radio-group"
radio.args = {formJson: args(radioE)};

export const checkbox = Template.bind({});
checkbox.storyName = "checkbox"
checkbox.args = {formJson: args(checkboxE)};

export const checkboxGroup = Template.bind({});
checkboxGroup.storyName = "checkbox-group"
checkboxGroup.args = {formJson: args(checkboxGroupE)};

