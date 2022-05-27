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
import dynamicValueForm from '../../../../docs/examples/rules/dynamicValue.form.json';
import dynamicOptionsForm from '../../../../docs/examples/rules/dynamicOptions.form.json';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import rules from './rules.mdx';
import mappings from '../../src/utils/mappings';
import {base, decorator} from "../template";
import formJson from "../../rules/json";

/**
 * Adaptive Form allows changing the properties of a field dynamically using JSON Formula expressions.
 * To do that in your form, one can use the rules property in the Field.
 */
export default {
    title: 'Adaptive Form/Dynamic Behaviour',
    component: AdaptiveForm,
    decorators : [decorator],
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
value.storyName = "Calculating Values"
value.args = {formJson: dynamicValueForm};

export const options = Template.bind({});
options.storyName = "Dynamic Options"
options.args = {formJson: dynamicOptionsForm};

export const readOnly = Template.bind({});
readOnly.storyName = "Read Only"
readOnly.args = {
    formJson: {
        ...base,
        "items": [
            {
                "name": "checkbox",
                "type": "boolean",
                "fieldType": "checkbox",
                "label": {
                    "value": "Select for enabling the text field"
                }
            },
            {
                "name": "name",
                "type": "string",
                "fieldType": "text-input",
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
required.storyName = "Conditionally Mandatory fields"
required.args = {
    formJson: {
        ...base,
        "items": [
            {
                "name": "checkbox",
                "type": "boolean",
                "fieldType": "checkbox",
                "label": {
                    "value": "Select to make the text field required"
                }
            },
            {
                "name": "name",
                "type": "string",
                "fieldType": "text-input",
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
visible.storyName="Show/Hide"
visible.args = {
    formJson: {
        ...base,
        "items": [
            {
                "name": "field",
                "type": "string",
                "fieldType": "text-input",
                "label": {
                    "value": "Text input"
                },
                description : "submit button will remain hidden until you enter something in this field"
            },
            {
                "name": "button",
                "fieldType": "button",
                "label": {
                    "value": "Submit"
                },
                "rules": {
                    "visible": "length(field) > 0"
                }
            }
        ]
    }
};

export const disable = Template.bind({});
disable.storyName="Enable/Disable"
disable.args = {
    formJson: {
        ...base,
        title: "Enable/Disable",
        "items": [
            {
                "name": "agree",
                "type": "boolean",
                "fieldType": "checkbox",
                "label": {
                    "value": "I agree to the terms and conditions"
                },
                description : "submit button will remain hidden until you <b>agree</b>"
            },
            {
                "name": "button",
                "fieldType": "button",
                "label": {
                    "value": "Submit"
                },
                enabled : false,
                "rules": {
                    "enabled": "agree == true()"
                }
            }
        ]
    }
};