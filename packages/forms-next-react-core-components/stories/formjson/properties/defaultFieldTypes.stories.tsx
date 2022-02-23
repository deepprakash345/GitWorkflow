import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@aemforms/crispr-react-bindings';
import {ComponentStory} from '@storybook/react';
import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {base} from "../template";


export default {
    title: 'Crispr/JSON/Properties/viewType/defaults',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson}/>
    </Spectrum3Provider>
);

export const stringType = Template.bind({});
stringType.args = {
    formJson: {
        ...base,
        items: [{
            "type": "string",
            "label": {
                value: "Field"
            },
            description: "Default field for string types is text-input"

        }]
    }
}

export const booleanType = Template.bind({});
booleanType.args = {
    formJson: {
        ...base,
        items: [{
            "type": "boolean",
            "label": {
                value: "Field"
            },
            description: "Default field for boolean type is checkbox"
        }]
    }
}

export const dateFormat = Template.bind({});
dateFormat.args = {
    formJson: {
        ...base,
        items: [
            {
                "type": "string",
                format: "date",
                "label": {
                    value: "Field"
                },
                description: "Default field for format date is date-input"
            }
        ]
    }
}

export const fileType = Template.bind({});
fileType.args = {
    formJson: {
        ...base,
        items: [
            {
                "type": "file",
                "label": {
                    value: "Field"
                },
                description: "Default field for file type is file-input"
            }
        ]
    }
}


export const numberType = Template.bind({});
numberType.args = {
    formJson: {
        ...base,
        items: [
            {
                "type": "number",
                "label": {
                    value: "Field"
                },
                description: "Default field for number type is number-input"
            }
        ]
    }
}


export const enumE = Template.bind({});
enumE.storyName = "enum"
enumE.args = {
    formJson: {
        ...base,
        items: [
            {
                "enum": [1, 2, 3],
                "label": {
                    value: "Field"
                },
                description: "Default field with enum is drop-down"
            }
        ]
    }
}

export const enum2 = Template.bind({});
enum2.storyName = "enum with 2 values"
enum2.args = {
    formJson: {
        ...base,
        items: [
            {

                "enum": [1, 2],
                "label": {
                    value: "Field"
                },
                description: "Default field for enum with two values is checkbox"
            }
        ]
    }
}