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
import minLengthForm2 from '../../../../forms-headless-sample/public/examples/constraints/minLengthErrorMessage.form.json';
import maxLengthForm2 from '../../../../forms-headless-sample/public/examples/constraints/maxLengthErrorMessage.form.json';
import minValueForm2 from '../../../../forms-headless-sample/public/examples/constraints/minimumErrorMessage.form.json';
import maxValueForm2 from '../../../../forms-headless-sample/public/examples/constraints/maxValueErrorMessage.form.json';
import patternForm from '../../../../forms-headless-sample/public/examples/constraints/patternMessage.form.json';
import formatForm from '../../../../forms-headless-sample/public/examples/constraints/formatMessage.form.json';
import {base} from "../../template";

export default {
    title: 'Reference/JSON/Constraints/Messages',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const minLength = Template.bind({});
minLength.storyName="minLength"
minLength.args = {formJson: minLengthForm2};

export const maxLength = Template.bind({});
maxLength.storyName = "maxLength"
maxLength.args = {formJson: maxLengthForm2};

export const minimum = Template.bind({});
minimum.storyName = "minimum"
minimum.args = {formJson: minValueForm2};

export const exclusiveMinimum = Template.bind({});
exclusiveMinimum.storyName = "exclusiveMinimum"
exclusiveMinimum.args = {formJson: {
    ...base,
    items: [
        {
            "name": "textInput1",
            "type": "number",
            "fieldType": "text-input",
            "exclusiveMinimum": 100,
            "label": {
                "value": "Field with minimum value 100 (exclusive) and custom error message"
            },
            "constraintMessages": {
                "exclusiveMinimum" : "Custom Error Message to be shown when value is less than or equal to 100"
            }
        }
    ]
}};

export const maximum = Template.bind({});
maximum.storyName = "maximum"
maximum.args = {formJson: maxValueForm2};

export const exclusiveMaximum = Template.bind({});
exclusiveMaximum.storyName = "exclusiveMaximum"
exclusiveMaximum.args = {formJson: {
    ...base,
    items: [
        {
            "name": "textInput1",
            "type": "number",
            "fieldType": "text-input",
            "exclusiveMaximum": 100,
            "label": {
                "value": "Field with maximum value 100 (exclusive) and custom error message"
            },
            "constraintMessages": {
                "exclusiveMaximum" : "Custom Error Message to be shown when value is greater than or equal to 100"
            }
        }
    ]
}};

export const pattern = Template.bind({});
pattern.storyName = "pattern"
pattern.args = {formJson: patternForm};

export const format = Template.bind({});
format.storyName = "format"
format.args = {formJson: formatForm};

export const step = Template.bind({});
step.storyName = "step"
step.args = {formJson: {
        ...base,
        items : [
            {
                type: "number",
                step: 2,
                default: 2,
                fieldType: "number-input",
                label: {
                    value: "Enter a number"
                },
                constraintMessages: {
                    step: "Enter an even number only"
                }
            }
        ]
    }};

export const minItems = Template.bind({});
minItems.storyName = "minItems"
minItems.args = {formJson: {
        ...base,
        items: [
            {
                fieldType: 'checkbox-group',
                label: {
                    value: 'select minimum 3'
                },
                type: "number[]",
                enum: [1, 2, 3, 4, 5],
                enumNames : [1, 2, 3, 4, 5].map((i) => `Option ${i}`),
                minItems : 3,
                constraintMessages : {
                    minItems: "Select atleast 3"
                },
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
    }};

export const maxItems = Template.bind({});
maxItems.storyName = "maxItems"
maxItems.args = {formJson: {
        ...base,
        items: [
            {
                fieldType: 'checkbox-group',
                label: {
                    value: 'select at most 3'
                },
                type: "number[]",
                enum: [1, 2, 3, 4, 5],
                enumNames : [1, 2, 3, 4, 5].map((i) => `Option ${i}`),
                constraintMessages : {
                    maxItems: "Select at most 3"
                },
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
    }};

export const enforceEnum = Template.bind({});
enforceEnum.storyName = "enforceEnum"
enforceEnum.args = {formJson: {
        ...base,
        items: [{
            fieldType: 'text-input',
            label: {
                value: 'Field with enum 1 or 2'
            },
            enforceEnum: true,
            enum: [1, 2],
            constraintMessages: {
                enum: "Only 1 or 2 are allowed"
            }
        }]
    }};