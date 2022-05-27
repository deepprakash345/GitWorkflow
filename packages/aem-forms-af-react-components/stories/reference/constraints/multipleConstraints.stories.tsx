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
import stringCons from '../../../../../docs/examples/constraints/stringConstraints.form.json';
import numCons from '../../../../../docs/examples/constraints/numberConstraints.form.json';
import dateCons from '../../../../../docs/examples/constraints/dateConstraints.form.json';


export default {
    title: 'Reference/JSON/Constraints/Multiple Constraints',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const stringConstraints = Template.bind({});
stringConstraints.args = {formJson: stringCons};

export const dateConstraints = Template.bind({});
dateConstraints.args = {formJson: dateCons};

export const numberConstraints = Template.bind({});
numberConstraints.args = {formJson: numCons};