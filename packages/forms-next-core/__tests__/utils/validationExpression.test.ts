import {createFormInstance} from "../../src";

const formJson = {
    "adaptiveform": "0.0.17-pre",
    "metadata": {
        "grammar": "json-formula-1.0.0",
        "version": "1.0.0"
    },
    "items": [
        {
            "viewType": "text-input",
            "name": "field1",
            "type": "number",
            "label": {
                "value": "Enter a number"
            },
            "validationExpression": "value < field2 * field2",
            "description": "The value must be less than the square of value in field 2",
            "constraintMessages" : {
                "validationExpression" : "some custom error message"
            }
        },
        {
            "viewType": "text-input",
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