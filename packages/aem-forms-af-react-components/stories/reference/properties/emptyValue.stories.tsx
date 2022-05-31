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
import {base, logData} from "../../template";

const sampleField = {
    fieldType: 'text-input',
    type: "string",
    "name": "field",
    label: {
        value: "Label of the field"
    }
}

const undefExample = {
    ...base,
    items: [
        {
            ...sampleField,
            description: "When empty value is undefined, data will not be submitted for the field"
        }
    ]
}

const nullExample = {
    ...base,
    items: [
        {
            ...sampleField,
            emptyValue: null,
            description: "When empty value is undefined, data will not be submitted for the field"
        }
    ]
}

const emptyStringExample = {
    ...base,
    items: [
        {
            ...sampleField,
            emptyValue: '',
            description: "When empty value is '', '' (empty string) will be submitted for the field when empty"
        }
    ]
}

export default {
    title: 'Reference/JSON/Properties/emptyValue',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onFieldChanged={logData}/>
    </Spectrum3Provider>
);

export const undefinedValue = Template.bind({})
undefinedValue.storyName = "undefined"
undefinedValue.args=  {formJson : undefExample}

export const nullValue = Template.bind({})
nullValue.storyName = "null"
nullValue.args=  {formJson : nullExample}

export const emptyS = Template.bind({})
emptyS.storyName = "empty string"
emptyS.args=  {formJson : emptyStringExample}