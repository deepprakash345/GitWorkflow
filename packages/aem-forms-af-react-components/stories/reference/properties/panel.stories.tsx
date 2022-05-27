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
import { AdaptiveForm } from '@adobe/aem-forms-af-super-component';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {base} from "../../template";

export default {
    title: 'Reference/JSON/Properties/fieldType',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const formJson = {
    ...base,
    "items": [
    {
        "name": "basicdetails",
        "label": {
            "value": "Basic Details"
        },
        description: "A panel holds a set of fields together",
        "fieldType": "panel",
        "items": [
            {
                "name": "firstName",
                "label": {
                    "value": "First Name"
                },
                "type": "string",
                "fieldType": "text-input",
                "required": true
            },
            {
                "name": "lastName",
                "label": {
                    "value": "Last Name"
                },
                "type": "text",
                "fieldType": "text-input",
                "required": true
            }
        ]
    },
    {
        "name": "contact",
        "label": {
            "value": "contact"
        },
        "fieldType": "panel",
        "items": [
            {
                "name": "mobile",
                "label": {
                    "value": "Mobile Number"
                },
                "type": "string",
                "fieldType": "number-input",
                "required": true
            }
        ]
    }
]
}


export const panel: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

panel.args = {
    formJson
};