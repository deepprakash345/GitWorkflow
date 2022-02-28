import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@aemforms/crispr-react-bindings';
import {ComponentStory} from '@storybook/react';
import mappings from '../../../src/utils/mappings';
import {decorator, formWithSubmit, logAction, logData} from "../../template";
import documentation from './defaultFieldTypes.docs.mdx'

export default {
    title: 'Reference/JSON/Properties/viewType/defaults',
    component: AdaptiveForm,
    parameters: {
        docs: {
            page: documentation
        }
    },
    decorators: [decorator],
    args: {
        onSubmit: logAction('data')
    }
}

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>
);

export const StringType = Template.bind({});
StringType.args = {
    formJson: formWithSubmit({
        "name": "field",
        "type": "string",
        "label": {
            value: "Field"
        },
        description: "Default field for string types is text-input"
    })
}

export const booleanType = Template.bind({});
booleanType.parameters = {
    highlights : ["items.0.type"]
}
booleanType.args = {
    formJson: formWithSubmit({
        "name": "field",
        "type": "boolean",
        "label": {
            value: "Field"
        },
        description: "Default field for boolean type is checkbox"
    })
}

export const dateFormat = Template.bind({});
dateFormat.args = {
    formJson: formWithSubmit(
        {
            "name": "field",
            "type": "string",
            format: "date",
            "label": {
                value: "Field"
            },
            description: "Default field for format date is date-input"
        })
}

export const fileType = Template.bind({});
fileType.args = {
    formJson: formWithSubmit(
        {
            "name": "field",
            "type": "file",
            "label": {
                value: "Field"
            },
            description: "Default field for file type is file-input"
        })
}


export const numberType = Template.bind({});
numberType.args = {
    formJson: formWithSubmit(
        {
            "name": "field",
            "type": "number",
            "label": {
                value: "Field"
            },
            description: "Default field for number type is number-input"
        }
    )
}


export const enumE = Template.bind({});
enumE.storyName = "enum"
enumE.args = {
    formJson: formWithSubmit(
        {
            "name": "field",
            "enum": [1, 2, 3],
            "label": {
                value: "Field"
            },
            description: "Default field with enum is drop-down"
        }
    )
}


export const enum2 = Template.bind({});
enum2.storyName = "enum with 2 values"
enum2.parameters = {
    highlights : ["items.0.enum"]
}
enum2.args = {
    formJson: formWithSubmit(
        {
            "name": "field",
            "enum": [1, 2],
            "label": {
                value: "Field"
            },
            description: "Default field for enum with two values is checkbox"
        }
    )
}