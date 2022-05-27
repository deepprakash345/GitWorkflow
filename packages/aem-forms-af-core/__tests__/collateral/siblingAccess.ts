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

const staticForm = {
    items: [
        {
            name: 'field1',
            type: 'string',
            fieldType: 'text-input'
        },
        {
            name: 'field2',
            type: 'string',
            fieldType: 'text-input',
            rules: {
                value : 'field1'
            }
        }
    ]
};

const dynamicForm = {
    items: [
        {
            name: 'orders',
            type: 'array',
            fieldType: 'panel',
            minItems : 1,
            maxItems : 10,
            items: [
                {
                    fieldType: 'panel',
                    type: 'object', // this can be transparent
                    items: [
                        {
                            name : 'price',
                            type: 'number',
                            fieldType: 'text-input'
                        },
                        {
                            name : 'quantity',
                            type: 'number',
                            fieldType: 'text-input'
                        },
                        {
                            name : 'total',
                            type: 'number',
                            fieldType: 'text-input',
                            rules: {
                                value : 'price * quantity'
                            }
                        }
                    ]
                }
            ]
        }
    ]
};

export default {
    dynamicForm,
    staticForm
};