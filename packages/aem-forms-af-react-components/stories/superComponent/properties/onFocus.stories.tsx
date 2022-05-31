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
import jsonform from '../../example/json';
import React, {useState} from 'react';
import produce from 'immer';
export default {
    title: 'Reference/Component/props',
    component: AdaptiveForm,
    decorators : [(Story) => {
        return (<Spectrum3Provider theme={defaultTheme}>
            <Story />
        </Spectrum3Provider>);
    }]
} as ComponentMeta<typeof AdaptiveForm>;

const App = ({componentMapping = mappings, formJson})=> {
    const [focusOn, setFocusOn] = useState('');
    return <div>
        <AdaptiveForm mappings={componentMapping} formJson={formJson} locale='en'
                      focusOn={focusOn}
                      onValidationComplete={(action: any)=> {
                          const validationCompleteHandlerPayload = action.payload;
                          if (validationCompleteHandlerPayload?.length > 0) {
                              setFocusOn(validationCompleteHandlerPayload[0].fieldName);
                          }
                      }}/>
    </div>;
};

export const onFocus: ComponentStory<typeof AdaptiveForm> = (args) => (
    <App formJson={args.formJson}/>
);

// maintain immutability via immer
const newContactJson: any = produce(jsonform.contactJson, draft => {
    // mutating draft implementation without changing the original object
    draft.items[6].label.value = 'Click me to set focus on invalid field on form submit';
});

onFocus.args = {
    formJson: newContactJson
};