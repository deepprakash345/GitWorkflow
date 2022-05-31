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
import {base} from "../../template";

export default {
    title: 'Reference/JSON/Constraints/minItems',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

const range = function* (start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}
//@ts-ignore
const x = [...range(1, 5)]

const form = {
    ...base,
    items: [
        {
            fieldType: 'checkbox-group',
            label: {
                value: 'select minimum 3'
            },
            type: "number[]",
            enum: x,
            enumNames : x.map((i) => `Option ${i}`),
            minItems : 3
        },
        {
            "fieldType": "button",
            "label": {
                "value": "submit"
            },
            "events": {
                "click": "submitForm()"
            }
        }
    ]
}

const form2 = {
    ...base,
    items: [
        {
            fieldType: 'panel',
            name: "selection",
            label: {
                value: 'Choose 3 items'
            },
            type: "array",
            minItems: 3,
            items : [
                {
                    fieldType: 'checkbox-group',
                    label: {
                        value: 'select an item'
                    },
                    type: "number",
                    enum: x,
                    enumNames : x.map((i) => `Option ${i}`)
                }
            ]
        },
        {
            "fieldType": "button",
            "label": {
                "value": "submit"
            },
            "events": {
                "click": "submitForm()"
            }
        }
    ]
}

export const field = Template.bind({});
field.storyName="Field with data type array"
field.args = {formJson: form};

export const panel = Template.bind({});
panel.storyName="Repeatable Panel"
panel.args = {formJson: form2};