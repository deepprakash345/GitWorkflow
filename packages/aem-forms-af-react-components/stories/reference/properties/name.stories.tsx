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
import {Action} from "@adobe/aem-forms-af-core";
import { action } from '@storybook/addon-actions';

const formJson:any = (name, label, description) => {
    return {
        'adaptiveform': '0.10.0',
        items: [
            {
                'name' : name,
                'label' : {
                    'value' : label
                },
                'description': description,
                'fieldType' : 'text-input'
            }
        ],
        'metadata': {
        'grammar': 'json-formula-1.0.0',
            'version': '1.0.0'
        }
    }
};

const logData = (e: Action) => action('onFieldChanged')(e.target.exportData());

export default {
    title: 'Reference/JSON/Properties/name',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onFieldChanged={logData}/>
    </Spectrum3Provider>
);

export const alphabets = Template.bind({});
alphabets.args = {formJson : formJson("someName", "Field with some name", "The name property determines the key in the json data")};

export const alphaNumeric = Template.bind({});
alphaNumeric.args = {formJson: formJson("specialName123_$", "Field with special characters in name", "The name property can contain numeric and special characters as well")};

export const numeric = Template.bind({});
numeric.args = {formJson: formJson("1234", "Field with numeric name", "The name property can be all numbers")};

export const special = Template.bind({});
special.args = {formJson : formJson("_$!&", "No alphabets and no numbers", "The name property must not begin with $ and :")};

export const noName = Template.bind({});
noName.args = {formJson : formJson(undefined, "Field with no name", "Field without name will not have its data captured")};
