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

const formJson:any = (description) => {
    return {
        'adaptiveform': '0.10.0',
        items: [
            {
                'name' : 'field',
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
    title: 'Reference/JSON/Properties/description',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onFieldChanged={logData}/>
    </Spectrum3Provider>
);

export const BasicDescription = Template.bind({});
BasicDescription.args = {formJson:  formJson("Basic description of the Field. Description is applicable for all the fields")};

export const richTextDescription = Template.bind({});
richTextDescription.args = {formJson: formJson("For <strong>rich text</strong> we use sanitize-html package with <a href='https://www.npmjs.com/package/sanitize-html#default-options'> default options</a>")};
