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

import React from "react";
import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@adobe/aem-forms-af-react-renderer';
import {ComponentStory} from '@storybook/react';
import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum';
import {mappings} from '../../src';
import {decorator, formWithSubmit, logAction} from "../template";
import documentation from './checkbox.mdx'
import {examples} from "./json";

export default {
    title: 'Adaptive Form/Components/Checkbox',
    component: AdaptiveForm,
    decorators: [decorator],
    parameters: {
        docs: {
            page: documentation
        }
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>)

export const def = Template.bind({});
def.storyName = "Simple Checkbox"
def.args={formJson:formWithSubmit({
        name : "field1",
        fieldType: 'checkbox',
        label: {
            value : "single checkbox"
        },
        enum : ["on", "off"]
    }), onSubmit : logAction('data')}
def.parameters = {
    highlights: ["items.0.enum"]
}

export const defSelected = Template.bind({});
defSelected.storyName = "Default Selected"
defSelected.args={formJson:formWithSubmit({
        name : "field1",
        fieldType: 'checkbox',
        label: {
            value : "single checkbox"
        },
        "default" : "on",
        enum : ["on", "off"]
    }), onSubmit : logAction('data')}

export const withRichTextLabel = Template.bind({});
withRichTextLabel.args={formJson:formWithSubmit({
        name : "field1",
        fieldType: 'checkbox',
        label: {
            value : "<b>strong</b> checkbox",
            richText: true
        },
        enum : ["on", "off"]
    }), onSubmit : logAction('data')}
withRichTextLabel.parameters = {
    highlights: ["items.0.enum"]
}

export const withDescription = Template.bind({});
withDescription.args={formJson:formWithSubmit({
        name : "field1",
        fieldType: 'checkbox',
        label: {
            value : "another checkbox"
        },
        enum : ["on", "off"],
        description : "This is the description for the checkbox"
    }), onSubmit : logAction('data')}
withDescription.parameters = {
    highlights: ["items.0.enum"]
}

export const noOffValue = Template.bind({});
noOffValue.storyName = "Off Value"
noOffValue.args={formJson:formWithSubmit({
        name : "field1",
        fieldType: 'checkbox',
        label: {
            value : "checkbox with only on value"
        },
        enum : ["on"]
    }), onSubmit : logAction('data')}
noOffValue.parameters = {
    highlights: ["items.0.enum"]
}

export const boolean = Template.bind({});
boolean.args={formJson:formWithSubmit({
        name : "field1",
        fieldType: 'checkbox',
        label: {
            value : "checkbox with only on value"
        },
        type : "boolean"
    }), onSubmit : logAction('data')}
boolean.parameters = {
    highlights: ["items.0"]
}

export const group = Template.bind({});
group.storyName = "Checkbox Group"
group.args={formJson:formWithSubmit({
        name : "field1",
        fieldType: 'checkbox-group',
        label: {
            value : "Select 1 or more"
        },
        enum : [1, 2, 3, 4],
        enumNames: ["option 1", "option 2", "option 3", "option 4"]
    }), onSubmit : logAction('data')}
group.parameters = {
    highlights : ['items.0.enum']
}

export const groupHorizontalAlignment = Template.bind({});
groupHorizontalAlignment.storyName = "Horizontal Alignment"
groupHorizontalAlignment.args={formJson:formWithSubmit({
        name : "field1",
        fieldType: 'checkbox-group',
        label: {
            value : "Select 1 or more"
        },
        properties : {
            'afs:layout': { orientation: 'horizontal' }
        },
        enum : [1, 2, 3, 4],
        enumNames: ["option 1", "option 2", "option 3", "option 4"]
    }), onSubmit : logAction('data')}
groupHorizontalAlignment.parameters = {
  highlights: ['items.0.properties']
}

export const groupWithRichTextLabels = Template.bind({});
groupWithRichTextLabels.storyName = "Checkbox Group with Rich Text"
groupWithRichTextLabels.args={formJson:formWithSubmit({
        name : "field1",
        fieldType: 'checkbox-group',
        label: {
            value : "A <strong>strong Group</strong> of checkboxes",
            richText: true
        },
        description: "The individual checkboxes cannot have rich text",
        enum : [1, 2, 3, 4],
        enumNames: ["option 1", "option 2", "option 3", "option 4"]
    }), onSubmit : logAction('data')}
groupWithRichTextLabels.parameters = {
    highlights : ['items.0.enum']
}


export const dynamicGroup = Template.bind({});
dynamicGroup.args={formJson:formWithSubmit({
        name : "numDependents",
        fieldType: 'number-input',
        label: {
            value : "How many dependents you have"
        },
        default : 1,
        minimum : 1,
        maximum : 3,
        type : "number"
    }, {
        name : "field1",
        fieldType: 'checkbox-group',
        label: {
            value : "Choose a dependent"
        },
        enum : [],
        rules : {
            "enum" : "if(numDependents == 1, toArray(1), if(numDependents == 2, [1,2], if(numDependents == 3, [1, 2, 3], toArray(1))))",
            "enumNames" : "if(numDependents == 1, ['Dependent 1'], if(numDependents == 2, ['Dependent 1', 'Dependent 2'], if(numDependents == 3, ['Dependent 1', 'Dependent 2', 'Dependent 3'], ['Dependent 1'])))"
        },
        type : "number"
    }), onSubmit : logAction('data')}
dynamicGroup.parameters = {
    highlights : ['items.0.type']
}