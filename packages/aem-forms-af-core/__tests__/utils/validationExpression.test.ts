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

import {createFormInstance} from "../../src";

const formJson = {
    "adaptiveform": "0.10.0",
    "metadata": {
        "grammar": "json-formula-1.0.0",
        "version": "1.0.0"
    },
    "items": [
        {
            "fieldType": "text-input",
            "name": "field1",
            "type": "number",
            "label": {
                "value": "Enter a number"
            },
            "validationExpression": "$field < field2 * field2",
            "description": "The value must be less than the square of value in field 2",
            "constraintMessages" : {
                "validationExpression" : "some custom error message"
            }
        },
        {
            "fieldType": "text-input",
            "type": "number",
            "name": "field2",
            "label": {
                "value": "Enter a number"
            }
        }
    ]
}

test("passing validationExpression should not make the field invalid", () => {
    const form = createFormInstance(formJson)
    form.items[1].value = 10;
    form.items[0].value = 90;
    expect(form.items[0].valid).toEqual(true)
})

test("failing validationExpression should make the field invalid", () => {
    const form = createFormInstance(formJson)
    form.items[1].value = 10;
    form.items[0].value = 100;
    expect(form.items[0].valid).toEqual(false)
})

test("failing validationExpression should set the correct error message", () => {
    const form = createFormInstance(formJson)
    form.items[1].value = 10;
    form.items[0].value = 100;
    expect(form.items[0].getState().errorMessage).toEqual("some custom error message")
})