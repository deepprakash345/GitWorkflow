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
import { AdaptiveForm } from '@adobe/aem-forms-af-super-component';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import jsonform from '../../example/json';
import { action } from '@storybook/addon-actions';
import {Action} from '@adobe/aem-forms-af-core';
export default {
    title: 'Reference/Component/events',
    component: AdaptiveForm,
    decorators : [(Story) => {
        return (<Spectrum3Provider theme={defaultTheme}>
            <Story />
        </Spectrum3Provider>);
    }]
} as ComponentMeta<typeof AdaptiveForm>;

const logAction = (name: string) => (e: Action) => action(name)({
    target : e.target.getState(),
    payload: e.payload,
    type: e.type
});

export const initialize: ComponentStory<typeof AdaptiveForm> = (args) => (
    <AdaptiveForm mappings={mappings}
                  formJson={args.formJson}
                  onInitialize={logAction('Initialized')}
    />
);

initialize.args = {
    formJson: jsonform.contactJson
};