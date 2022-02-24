import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {base} from "../../template";

export default {
    title: 'Crispr/JSON/events/custom',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const dispatchJson = {
    ...base,
    "items": [
        {
            "name": "textfield",
            "viewType": "text-input",
            label: {
                value: 'Counts how many times the button is clicked'
            },
            description : "dispatch_event can be used to dispatch an event on any field and the field can handle it to update any of its properties",
            "events": {
                "custom:buttonClicked": "{value : value + 1}"
            }
        },
        {
        "name": "button",
        "label": {
            "value": "click me"
        },
        "viewType": "button",
        "events": {
            "click": "dispatch_event(textfield, 'custom:buttonClicked')",
        }
    }]
}

const payloadJson = {
    ...base,
    "items": [
        {
            "name": "textfield",
            "viewType": "text-input",
            label: {
                value: 'Counts how many times the button is clicked'
            },
            description : "dispatch_event can pass custom data which can be accessed by the handlers",
            "events": {
                "custom:buttonClicked": "{value : value + $event.payload.weight}"
            }
        },
        {
            "name": "button",
            "label": {
                "value": "Single click is counted 5 times"
            },
            "viewType": "button",
            "events": {
                "click": "dispatch_event(textfield, 'custom:buttonClicked', {weight: 5})",
            }
        }]
}

const requestJson = {
    ...base,
    "items": [
        {
            "name": "countries",
            "type": "string",
            "viewType": "drop-down",
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
            "viewType": "button",
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
fetchData.args = {
    formJson: requestJson
};

