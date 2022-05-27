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
import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@adobe/aem-forms-af-super-component';
import { ComponentStory } from '@storybook/react';
import {mappings} from '../../src';
import {decorator, formWithSubmit, logAction} from "../template";
import documentation from './textfield.mdx'

export default {
    title: 'Adaptive Form/Components/Text Input Field',
    component: AdaptiveForm,
    decorators: [decorator],
    parameters: {
        docs: {
            page: documentation
        }
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>
);

const field = (label, name, description= undefined) => {
    return {
        fieldType: 'text-input',
        label: {
            value: label
        },
        name,
        description
    }
}

export const def = Template.bind({})
def.storyName = "Text Input"
def.args = {formJson: formWithSubmit(field('Basic Text Field', 'field1')), onSubmit : logAction('data')}

export const withRichTextLabel = Template.bind({})
const richTextLabelfield = field('With <b>Rich Text</b> Field', 'field1')
withRichTextLabel.args = {formJson: formWithSubmit({
        ...richTextLabelfield,
        label : {
            ...richTextLabelfield.label,
            richText : true
        }
    }), onSubmit : logAction('data')}


export const withPlaceholder = Template.bind({})
withPlaceholder.args = {formJson: formWithSubmit(
        {...field('Text Field with Placeholder', 'field1'), placeholder: 'Enter some text'}),
    onSubmit : logAction('data')}

export const withRichHelpText = Template.bind({})
withRichHelpText.storyName = "With Help Text"
withRichHelpText.args = {formJson: formWithSubmit(
        {...field('Text Field with rich help text', 'field1'), description: 'For <strong>rich text</strong> we use sanitize-html package with <a href="https://www.npmjs.com/package/sanitize-html#default-options"> default options</a>'}),
    onSubmit : logAction('data')}

export const typeNumber = Template.bind({})
typeNumber.storyName = "Number Input"
typeNumber.args = {formJson: formWithSubmit({
            ...field('Text Field to capture number', 'field1'),
            type: 'number',
            description: 'Enter a number only'}),
    onSubmit : logAction('data')}


export const typeDate = Template.bind({})
typeDate.storyName = "Date Input"
typeDate.args = {formJson: formWithSubmit({
        ...field('Text Field to capture dates', 'field1'),
        type: 'string',
        format: 'date',
        description: 'Enter date in yyyy-mm-dd format'}),
    onSubmit : logAction('data')}

export const multiLineWidget = Template.bind({})
multiLineWidget.storyName = "Multi Line Text Field"
multiLineWidget.args = {formJson: formWithSubmit({
        ...field('Text Field to capture multi line input', 'field1'),
        fieldType: 'multiline-input'}), onSubmit : logAction('data')}


// export const customProperties = Template.bind({})
// customProperties.storyName = "Custom Properties- isQuiet=true"
// customProperties.args = {formJson: examples['text-input-custom'], onSubmit : logAction('data')}

