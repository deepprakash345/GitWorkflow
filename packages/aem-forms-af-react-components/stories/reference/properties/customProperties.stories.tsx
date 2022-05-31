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
import {mappings} from '../../../src';
import {decorator, formWithSubmit} from "../../template";
import React from 'react';

export default {
    title: 'Reference/JSON/Properties/properties',
    component: AdaptiveForm,
    decorators: [decorator]
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>
);

export const customProperties = Template.bind({});
customProperties.args={formJson:formWithSubmit( 'Custom Properties', {
        name: "scale",
        label: {
            value : 'Choose a Metric Scale'
        },
        type: "string",
        fieldType : 'checkbox-group',
        enum: ['pounds', 'kgs'],
        "default" : "kgs",
        "events" : {
            "change" : "{value: if($value == `null`, 'kgs', $value) }"
        }
    }, {
        name: 'field1',
        fieldType : 'text-input',
        type: 'number',
        label : {
            value : "Weight"
        },
        properties: {
            scale: "1"
        },
        rules : {
            properties : "{scale : if(scale == 'pounds', 1.6, 1)}",
            description : "'Maximum allowed weight is '  & ($field.$properties.scale * 100) & ' ' & scale",
            maximum : "$field.$properties.scale * 100"
        }
    })}
