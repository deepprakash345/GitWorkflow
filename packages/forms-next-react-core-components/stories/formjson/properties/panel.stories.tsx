import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {base} from "../template";

export default {
    title: 'Crispr/JSON/Properties/viewType',
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
        "viewType": "panel",
        "items": [
            {
                "name": "firstName",
                "label": {
                    "value": "First Name"
                },
                "type": "string",
                "viewType": "text-input",
                "required": true
            },
            {
                "name": "lastName",
                "label": {
                    "value": "Last Name"
                },
                "type": "text",
                "viewType": "text-input",
                "required": true
            }
        ]
    },
    {
        "name": "contact",
        "label": {
            "value": "contact"
        },
        "viewType": "panel",
        "items": [
            {
                "name": "mobile",
                "label": {
                    "value": "Mobile Number"
                },
                "type": "string",
                "viewType": "number-input",
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