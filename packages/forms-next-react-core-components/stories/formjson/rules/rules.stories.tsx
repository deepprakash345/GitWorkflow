import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import dynamicValueForm from '../../../../../docs/examples/rules/dynamicValue.form.json';
import dynamicOptionsForm from '../../../../../docs/examples/rules/dynamicOptions.form.json';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import rules from './rules.mdx';
import mappings from '../../../src/utils/mappings';
import {base} from "../../template";
import formJson from "../../rules/json";

/**
 * Adaptive Form allows changing the properties of a field dynamically using JSON Formula expressions.
 * To do that in your form, one can use the rules property in the Field.
 */
export default {
    title: 'Crispr/JSON/Rules',
    component: AdaptiveForm,
    parameters: {
        docs: {
            page: rules
        }
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const value = Template.bind({});
value.args = {formJson: dynamicValueForm};

export const options = Template.bind({});
options.args = {formJson: dynamicOptionsForm};

export const readOnly = Template.bind({});
readOnly.args = {
    formJson: {
        ...base,
        "items": [
            {
                "name": "checkbox",
                "type": "boolean",
                "viewType": "checkbox",
                "label": {
                    "value": "Select for enabling the text field"
                }
            },
            {
                "name": "name",
                "type": "string",
                "viewType": "text-input",
                "label": {
                    "value": "Text input"
                },
                "rules": {
                    "readOnly": "checkbox != true()"
                }
            }
        ]
    }
}

export const required = Template.bind({});
required.args = {
    formJson: {
        ...base,
        "items": [
            {
                "name": "checkbox",
                "type": "boolean",
                "viewType": "checkbox",
                "label": {
                    "value": "Select to make the text field required"
                }
            },
            {
                "name": "name",
                "type": "string",
                "viewType": "text-input",
                "label": {
                    "value": "Text input"
                },
                "rules": {
                    "required": "checkbox == true()"
                }
            }
        ]
    }
};

export const visible = Template.bind({});
visible.storyName="dynamic show hide"
visible.args = {
    formJson: {
        ...base,
        "items": [
            {
                "name": "name",
                "type": "string",
                "viewType": "text-input",
                "label": {
                    "value": "Text input"
                },
                description : "submit button will remain hidden until you enter something in this field"
            },
            {
                "name": "button",
                "viewType": "button",
                "label": {
                    "value": "Submit"
                },
                "rules": {
                    "visible": "length(name) > 0"
                }
            }
        ]
    }
};