import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-super-component';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {base, logData} from "../../template";

export default {
    title: 'Reference/JSON/Constraints/maxItems',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onFieldChanged={logData} />
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
                value: 'select at most 3'
            },
            type: "number[]",
            enum: x,
            enumNames : x.map((i) => `Option ${i}`),
            maxItems : 3
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
            "name": "selection",
            label: {
                value: 'Choose at most 3 items'
            },
            type: "array",
            maxItems: 3,
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