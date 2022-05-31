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
import fieldWithLabel from '../../../../forms-headless-sample/public/examples/starter/fieldWithLabel.form.json';
import mappings from '../../../src/utils/mappings';
import {Action} from "@adobe/aem-forms-af-core";
import { action } from '@storybook/addon-actions';

const formJson:any = (label, description, visible = undefined, richText = undefined) => {
    return {
        'adaptiveform': '0.10.0',
        items: [
            {
                'name' : 'field',
                'label' : {
                    'value' : label,
                    visible,
                    richText
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
    title: 'Reference/JSON/Properties/label',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onFieldChanged={logData}/>
    </Spectrum3Provider>
);

export const FieldWithLabel = Template.bind({});
FieldWithLabel.args = {formJson: {
        ...fieldWithLabel,
        items: [
            {
                ...fieldWithLabel.items[0],
                description: "Label is applicable for all the field types"
            }
        ]
    }};

export const FieldWithoutLabel = Template.bind({});
FieldWithoutLabel.args = {formJson: formJson(undefined, 'Field has no label and is not accessible')};

export const hiddenLabel = Template.bind({});
hiddenLabel.args = {formJson : formJson("Hidden Label", "The Caption of the fields is not visible but is accessible", false, undefined)};

export const richTextLabel = Template.bind({});
richTextLabel.args = {formJson: formJson("The <strong>Label</strong> has <strong>bold</strong> and <em>italics</em> styling",
        "For rich text we use sanitize-html package with default options. https://www.npmjs.com/package/sanitize-html#default-options",
        undefined, true)};
