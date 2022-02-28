import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
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
            viewType: 'checkbox-group',
            label: {
                value: 'select minimum 3'
            },
            type: "number[]",
            enum: x,
            enumNames : x.map((i) => `Option ${i}`),
            minItems : 3
        },
        {
            "viewType": "button",
            "label": {
                "value": "submit"
            },
            "events": {
                "click": "submit_form()"
            }
        }
    ]
}

const form2 = {
    ...base,
    items: [
        {
            viewType: 'panel',
            name: "selection",
            label: {
                value: 'Choose 3 items'
            },
            type: "array",
            minItems: 3,
            items : [
                {
                    viewType: 'checkbox-group',
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
            "viewType": "button",
            "label": {
                "value": "submit"
            },
            "events": {
                "click": "submit_form()"
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