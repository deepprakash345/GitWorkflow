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

import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@adobe/aem-forms-af-super-component';
import {ComponentStory} from '@storybook/react';
import mappings from '../../../src/utils/mappings';
import {decorator, formWithSubmit, logAction, logData} from "../../template";
import documentation from './defaultFieldTypes.docs.mdx'

export default {
    title: 'Reference/JSON/Properties/fieldType/defaults',
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

export const string = Template.bind({});
string.storyName = "string"
string.args = {
    formJson: formWithSubmit({
        "name": "field",
        "type": "string",
        "label": {
            value: "Field"
        },
        description: "Default field for string types is text-input"
    })
}

export const boolean = Template.bind({});
boolean.storyName = "boolean"
boolean.parameters = {
    highlights : ["items.0.type"]
}
boolean.args = {
    formJson: formWithSubmit({
        "name": "field",
        "type": "boolean",
        "label": {
            value: "Field"
        },
        description: "Default field for boolean type is checkbox"
    })
}

export const date = Template.bind({});
date.storyName = "date"
date.args = {
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

export const file = Template.bind({});
file.storyName = "file"
file.args = {
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


export const number = Template.bind({});
number.storyName = "number"
number.args = {
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