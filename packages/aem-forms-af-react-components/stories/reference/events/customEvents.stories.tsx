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
import {base, decorator} from "../../template";
import documentation from "./events.mdx";
import {click} from "./events.stories";

export default {
    title: 'Adaptive Form/Events/Custom Events',
    decorators: [decorator],
    parameters : {
        highlights: ["items.0.events", "items.1.events"],
        docs: {
            page: documentation
        }
    },
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const dispatchJson = {
    ...base,
    "items": [
        {
            "name": "textfield",
            "fieldType": "text-input",
            label: {
                value: 'Counts how many times the button is clicked'
            },
            description : "dispatchEvent can be used to dispatch an event on any field and the field can handle it to update any of its properties",
            "events": {
                "custom:buttonClicked": "{value : value + 1}"
            }
        },
        {
        "name": "button",
        "label": {
            "value": "click me"
        },
        "fieldType": "button",
        "events": {
            "click": "dispatchEvent(textfield, 'custom:buttonClicked')",
        }
    }]
}


const payloadJson = {
    ...base,
    "items": [
        {
            "name": "textfield",
            "fieldType": "text-input",
            label: {
                value: 'Counts how many times the button is clicked'
            },
            description : "dispatchEvent can pass custom data which can be accessed by the handlers",
            "events": {
                "custom:buttonClicked": "{value : value + $event.payload.weight}"
            }
        },
        {
            "name": "button",
            "label": {
                "value": "Single click is counted 5 times"
            },
            "fieldType": "button",
            "events": {
                "click": "dispatchEvent(textfield, 'custom:buttonClicked', {weight: 5})",
            }
        }]
}

const requestJson = {
    ...base,
    "items": [
        {
            "name": "countries",
            "type": "string",
            "fieldType": "drop-down",
            "label": {
                "value": "Countries"
            },
            "events": {
                "custom:countriesLoaded": "{ enum : $event.payload.data[*].country, enumNames: $event.payload.data[*].country }"
            }
        },
        {
            "name": "button",
            "label": {
                "value": "click me to load countries list"
            },
            description: "The request function on success/errors triggers a custom event which can be handled by any fields",
            "fieldType": "button",
            "events": {
                "click": "request('https://countriesnow.space/api/v0.1/countries', 'GET', null, 'countriesLoaded', 'countriesLoadFail')",
            }
        }]
}

const template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const dispatch = template.bind({})
dispatch.args = {
    formJson: dispatchJson
};

export const dispatchWithPayload = template.bind({})
dispatchWithPayload.args = {
    formJson: payloadJson
};

export const fetchData = template.bind({})
fetchData.storyName = "Fetch Data from APIs"
fetchData.args = {
    formJson: requestJson
};

