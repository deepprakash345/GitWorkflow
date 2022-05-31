
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

import {TRANSLATION_TOKEN} from '@adobe/aem-forms-af-core';
import {getTranslationMessages} from '../../src/component/i18n';

test('i18n getTranslationMessages returns flat react-intl message format', () => {
    const actual = getTranslationMessages({
        'items' : {
            'panel' : {
                'fieldType': 'panel',
                'items' : {
                    'firstName': {
                        'fieldType': 'text-input',
                        'type': 'string',
                        'title': 'Hello, world',
                        'description': "The person's first name.",
                        'props:translationIds' : {
                            'title' : 'panel##firstName##timeStamp##title##timeStamp',
                            'description' : 'panel##firstName##timeStamp##description##timeStamp'
                        },
                        'name': 'firstName',
                        'required': true
                    },
                    'lastName': {
                        'fieldType': 'text-input',
                        'type': 'string',
                        'title': 'Hello, world',
                        'description': "The person's last name.",
                        'props:translationIds' : {
                            'title' : 'panel##lastName##timeStamp##title##timeStamp',
                            'description' : 'panel##lastName##timeStamp##description##timeStamp',
                            'enumNames' : 'panel##lastName##timeStamp##enumNames##timeStamp'
                        },
                        'name': 'firstName',
                        'required': true,
                        'enumNames' : ['Yes', 'No']
                    }
                }
            }
        }
    });
    expect(actual).toBeDefined();
    //expect(Object.keys(actual).length).toEqual(6); //todo : handle labels
    // check if this matches the required react-intl format
    Object.entries(actual).forEach(([key, value])=> {
        // @ts-ignore
        expect(value.id).toBeDefined();
        // @ts-ignore
        expect(value.id).toContain(TRANSLATION_TOKEN);
        // @ts-ignore
        expect(value.defaultMessage).toBeDefined();
    });
});