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
import { action } from '@storybook/addon-actions';
import {Action} from "@adobe/aem-forms-af-core";
import {decorator, formWithSubmit, logAction} from "../../template";

const defaultString = [{
    'name' : 'field1',
    label : {
        value : 'Text Field'
    },
    'default': 'Default Value',
    'fieldType' : 'text-input'
}]

const defaultNumber = [{
    'name' : 'field1',
    label : {
        value : 'Number Field'
    },
    'default': 1,
    'fieldType' : 'number-input'
}]

const defaultDate = [{
    'name' : 'field1',
    label : {
        value : 'Date Field'
    },
    'default': "2010-10-10",
    'fieldType' : 'date-input'
}]

const defaultArray = {
    'name' : 'field1',
    label : {
        value : 'Default Selection in Checkboxes'
    },
    "description" : "all components can have default values. Try them out from the controls",
    type: "string[]",
    'default': ["a", "b"],
    enum: ["a", "b", "c"],
    enumNames: ["Option 1", "Option 2", "Option 3"],
    'fieldType' : 'checkbox-group'
}

const base = {
    'adaptiveform': '0.10.0',
    'metadata': {
        'grammar': 'json-formula-1.0.0',
        'version': '1.0.0'
    }
}

export default {
    title: 'Reference/JSON/Properties/default',
    component: AdaptiveForm,
    decorators : [decorator],
    args: {
        onSubmit: logAction("data")
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>
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
array.args = {formJson: formWithSubmit(defaultArray)};