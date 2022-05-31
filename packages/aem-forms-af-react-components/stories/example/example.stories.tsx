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

import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@adobe/aem-forms-af-react-renderer';
import { ComponentStory } from '@storybook/react';
import mappings from '../../src/utils/mappings';
import formJson from './json';
import {decorator, logAction} from '../template';
import fieldWithLabel from '../../../forms-headless-sample/public/examples/starter/fieldWithLabel.form.json';
import withSubmitButton from '../../../forms-headless-sample/public/examples/starter/withSubmitButton.form.json';
import hierarchy from '../../../forms-headless-sample/public/examples/starter/hierarchy.form.json';
import hierarchyWithDataModel from '../../../forms-headless-sample/public/examples/starter/hierarchyWithDataModel.form.json';
import {FormJson} from '@adobe/aem-forms-af-core';
import jsonform from "./json";
import produce from 'immer';


export default {
    title: 'Reference/Examples',
    component: AdaptiveForm,
    decorators: [decorator],
        parameters: {
        docs: {
            page: null
        }
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>
);

export const Introduction = Template.bind({});
Introduction.args={formJson:fieldWithLabel};

export const formData = Template.bind({});
formData.args={formJson:withSubmitButton, onSubmit: logAction('onSubmit')};
formData.parameters = {
    highlights : ['items.3']
};

export const nestedData = Template.bind({});
nestedData.args={formJson:hierarchy, onSubmit: logAction('onSubmit')};

export const dataBindings = Template.bind({});
dataBindings.args={formJson:hierarchyWithDataModel, onSubmit: logAction('onSubmit')};

export const Contact = Template.bind({});
Contact.args={formJson: formJson.contactJson as FormJson};

export const PrefillFormWithPersonalisedData = Template.bind({});

// maintain immutability via immer
const contactWithPersonalisedData: any = produce(formJson.contactJson, draft => {
    // mutating draft implementation without changing the original object
    // @ts-ignore
    draft.data = {
        'firstName' : 'abc',
        'lastName' : 'def',
        'email' : 'abc.def@xyz.in'
    };
    // @ts-ignore
    draft.items[0].enabled =  draft.items[1].enabled =  draft.items[2].enabled =  draft.items[3].enabled = false;
});
PrefillFormWithPersonalisedData.args={formJson: contactWithPersonalisedData as FormJson};
