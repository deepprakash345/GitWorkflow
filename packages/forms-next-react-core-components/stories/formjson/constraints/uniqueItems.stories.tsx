import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {base} from "../template";

export default {
    title: 'Crispr/JSON/Constraints/uniqueItems',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

const form = {
    ...base,
    items: [
        {
            viewType: 'panel',
            name: "selection",
            label: {
                value: 'Choose unique items'
            },
            type: "array",
            uniqueItems: true,
            items : [
                {
                    viewType: 'checkbox-group',
                    label: {
                        value: 'select an item'
                    },
                    type: "number",
                    enum: [1, 2, 3, 4, 5],
                    enumNames : [1, 2, 3, 4, 5].map((i) => `Option ${i}`)
                }
            ]
        }
    ]
}

export const panel = Template.bind({});
panel.storyName="Repeatable Panel"
panel.args = {formJson: form};