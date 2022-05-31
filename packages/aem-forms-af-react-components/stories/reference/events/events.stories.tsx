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
import {base, decorator} from "../../template";
import documentation from './events.mdx'

export default {
    title: 'Adaptive Form/Events',
    decorators: [decorator],
    parameters: {
        docs: {
            page: documentation
        }
    },
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const clickJson = {
    ...base,
    "items": [
        {
        "name": "button",
        "label": {
            "value": "click me"
        },
        "fieldType": "button",
        "events": {
            "click": "{label: {value : 'You Clicked me'}}",
        }
    }]
}

const initializeJson = {
    ...base,
    "items": [
        {
            "name": "button",
            "label": {
                "value": "click me"
            },
            "fieldType": "button",
            "events": {
                "initialize": "{label: {value : 'I have been initialized. Click me'}}",
                "click": "{label: {value : 'You Clicked me again'}}"
            }
        }]
}

const changeJson = {
    ...base,
    "items": [
        {
            "name": "checkbox",
            "label": {
                "value": "click me"
            },
            "enum" : [1, 2],
            "fieldType": "checkbox",
            "events": {
                "change": "{label: {value : if(value == 1, 'Hurray, I am chosen :-)', 'Please choose me :-|')}}"
            }
        }]
}

const blurJson = {
    ...base,
    "items": [
        {
            "name": "textinput",
            "label": {
                "value": "On focus out, value of text input would be transformed to upper case and validated"
            },
            'required': true,
            'constraintMessages': {
                'required': 'mandatory field'
            },
            "fieldType": "text-input",
            "events": {
                "blur": ['{value : upper($value)}', 'validate($event.target)']
            }
        }]
}


const template: ComponentStory<typeof AdaptiveForm> = (args) => (
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
);



export const change = template.bind({})
change.storyName = "onChange"
change.args = {
    formJson: changeJson
};

export const blur = template.bind({})
blur.storyName = "onBlur"
blur.args = {
    formJson: blurJson
};


export const initialize = template.bind({})
initialize.storyName = "onInitialize"
initialize.args = {
    formJson: initializeJson
};


export const click = template.bind({})
click.storyName = "onClick"
click.args = {
    formJson: clickJson
};


