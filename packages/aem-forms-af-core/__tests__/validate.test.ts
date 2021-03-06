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

import {validateFormInstance} from '../src/FormInstance';

const form = {
    'items': [{
        'fieldType': 'panel',
        'name': 'personal',
        'type': 'object',
        'items': [
            {
                'name': 'firstname',
                'fieldType': 'text-input',
                'type': 'string',
                'required': true,
                'constraintMessages': {
                    'required': 'The field is required'
                },
                'props:translationIds': {
                    'title': 'personal##9636##firstname##184##title##4993'
                },
                'label': {
                    'value': 'Firstname'
                }
            },
            {
                'name': 'lastname',
                'fieldType': 'text-input',
                'type': 'string',
                'required': true,
                'constraintMessages': {
                    'required': 'The field is required'
                },
                'props:translationIds': {
                    'title': 'personal##9636##lastname##5970##title##5962'
                },
                'label': {
                    'value': 'Lastname'
                }
            },
            {
                'name': 'selectone',
                'fieldType': 'radio-group',
                'type': 'boolean',
                'enum': [
                    true,
                    false
                ],
                'enumNames': [
                    'Option 1(choose me)',
                    'Option 2'
                ],
                'required': true,
                'constraintMessages': {
                    'required': 'The field is required'
                },
                'props:translationIds': {
                    'title': 'personal##9636##selectone##9252##title##1205',
                    'enumNames': 'personal##9636##selectone##9252##enumNames##1723',
                    'enum': 'personal##2451##selectone##868##enum##2824'
                },
                'label': {
                    'value': 'Select One'
                }
            },
            {
                'name': 'aboutme',
                'fieldType': 'multiline-input',
                'default': 'Everything is awesome!',
                'type': 'string',
                'required': true,
                'constraintMessages': {
                    'required': 'The field is required'
                },
                'props:translationIds': {
                    'title': 'personal##9636##aboutme##3552##title##543'
                },
                'label': {
                    'value': 'About me'
                }
            },
            {
                'name': 'submit',
                'fieldType': 'button',
                'screenReaderText': 'Enter your message in less than 1000 characters and minimum 50 characters',
                'events': {
                    'click': "dispatchEvent($form, 'submit')"
                },
                'props:translationIds': {
                    'title': 'personal##9636##submit##5663##title##8429'
                },
                'label': {
                    'value': 'Submit'
                }
            }
        ],
        'props:translationIds': {
            'title': 'personal##7195##title##8805'
        },
        'label': {
            'value': 'Personal Information'
        }
    }
    ],
    'props:thankyouMessage': 'Thank you for submitting the form',
    'metadata': {
        'grammar': 'json-formula-1.0.0',
        'version': '1.0.0'
    }
};

test('validation with required fields and no data', () => {
    const res = validateFormInstance(form, {});
    expect(res).toEqual(false);
});

test('validation with required fields and data', () => {
    const res = validateFormInstance(form, {
        'personal': {
            'firstname': 'a',
            'lastname': 'b',
            'selectone': true,
            'aboutme': 'Everything is awesome!'
        }
    });
    expect(res).toEqual(true);
});