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
import {mappings} from '../../src';
import {decorator} from "../template";
import documentation from "./documentation.mdx"
import layouts from "./json";

export default {
    title: 'Adaptive Form/Layouts/Tabs',
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

export const horizontal = Template.bind({});
horizontal.args={formJson: layouts.horizontalTabsJson}

export const vertical = Template.bind({});
vertical.args={formJson: layouts.verticalTabsJson}
