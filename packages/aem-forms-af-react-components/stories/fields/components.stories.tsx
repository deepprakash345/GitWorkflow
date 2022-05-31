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
import {AdaptiveForm} from '@adobe/aem-forms-af-react-renderer';
import {ComponentStory} from '@storybook/react';
import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum';
import {mappings} from '../../src';
import {decorator, formWithSubmit, logAction} from "../template";
import {examples} from "./json";
import React from 'react';

export default {
    title: 'Adaptive Form/Components/Other Components',
    component: AdaptiveForm,
    decorators: [decorator],
    args : {
        onSubmit : logAction("data")
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <AdaptiveForm mappings={mappings} formJson={args.formJson}  onSubmit={args.onSubmit}/>
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

export const text = Template.bind({});
text.args={formJson:examples['plain-text']}
text.parameters = {
    highlights: ["items.0"]
}

export const password = Template.bind({});
password.args = { formJson: examples['password'] }
password.parameters = {
  highlights: ["items.0"]
}

export const numberWidget = Template.bind({})
numberWidget.storyName = "Number widget"
numberWidget.args = {formJson: formWithSubmit({
        ...field('Numeric Widget to capture number', 'field1'),
        type: 'number',
        fieldType: 'number-input'}), onSubmit : logAction('data')}

export const dateWidget = Template.bind({})
dateWidget.storyName = "Date Widget"
dateWidget.args = {formJson: formWithSubmit({
        ...field('Date Widget to capture dates', 'field1'),
        fieldType: 'date-input'}), onSubmit : logAction('data')}