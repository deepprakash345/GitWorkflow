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
import {base, decorator, formWithSubmit, logAction} from "../../template";

const textInputExample = {
    "name" : "field",
    'label' : {
        'value' : 'Text Field'
    },
    'fieldType' : 'text-input',
    description : "Enter either true or false",
    type: 'boolean'
};

export default {
    title: 'Reference/JSON/Constraints/type/boolean',
    component: AdaptiveForm,
    decorators: [decorator],
    args: {
        onSubmit : logAction("submit")
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>
    </Spectrum3Provider>
);

export const boolean = Template.bind({})
boolean.storyName = "boolean"
boolean.args = {formJson: formWithSubmit({
        ...textInputExample
    })
}
