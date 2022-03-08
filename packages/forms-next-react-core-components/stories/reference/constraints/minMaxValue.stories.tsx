import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-super-component';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import minValueForm from '../../../../../docs/examples/constraints/minimum.form.json';
import maxValueForm from '../../../../../docs/examples/constraints/maxValue.form.json';
import minLengthForm from '../../../../../docs/examples/constraints/minLength.form.json';
import maxLengthForm from '../../../../../docs/examples/constraints/maxLength.form.json';
import exactLengthForm from '../../../../../docs/examples/constraints/exactLength.form.json';
import patternForm from '../../../../../docs/examples/constraints/pattern.form.json';
import {base} from "../../template";

export default {
    title: 'Reference/JSON/Constraints',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const minimum = Template.bind({});
minimum.storyName = "minimum"
minimum.args = {formJson: minValueForm};

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
                    "value": "Field with minimum value 100 (exclusive)"
                }
            }
        ]
    }};

export const maximum = Template.bind({});
maximum.storyName = "maximum"
maximum.args = {formJson: maxValueForm};

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
                    "value": "Field with maximum value 100 (exclusive)"
                }
            }
        ]
    }};

export const minLength = Template.bind({});
minLength.storyName = "minLength"
minLength.args = {formJson: minLengthForm};

export const maxLength = Template.bind({});
maxLength.storyName = "maxLength"
maxLength.args = {formJson: maxLengthForm};

// export const exactLength = Template.bind({});
// exactLength.args = {formJson: exactLengthForm};

export const pattern = Template.bind({});
pattern.storyName = "pattern"
pattern.args = {formJson: patternForm};

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
                    value: "Enter an even number only"
                },
                description: "Step constraint is applicable only if an initial value is defined (either using default or minimum)"
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
            enum: [1, 2],
            description: 'Since enum is not enforced other values can be entered'
        }, {
                fieldType: 'text-input',
                label: {
                    value: 'Field with enum 1 or 2'
                },
                enforceEnum: true,
                enum: [1, 2],
                description: 'Same field, with enforceEnum set to true'
            }]
    }};

export const validationExpression = Template.bind({});
validationExpression.storyName = "validationExpression"
validationExpression.args = {formJson: {
        ...base,
        items: [{
            fieldType: 'text-input',
            name: "field1",
            type:"number",
            label: {
                value: 'Enter a number'
            },
            validationExpression: "value < field2 * field2",
            description: 'The value must be less than the square of value in field 2'
        }, {
            fieldType: 'text-input',
            type: "number",
            name: "field2",
            label: {
                value: 'Enter a number'
            }
        }]
    }};
