import {createFormInstance} from "../../src";
import {randomInt} from "../collateral";


const formJson = {
    "adaptiveform": "0.0.17-pre",
    "metadata": {
        "grammar": "json-formula-1.0.0",
        "version": "1.0.0"
    },
    "items": [
        {
            "type": "string",
            "step": 2,
            "viewType": "number-input",
            "label": {
                "value": "Enter an even number only"
            },
            "description": "Step constraint is applicable only if an initial value is defined (either using default or minimum)",
        },
        {
            "type": "string",
            "step": "2",
            "viewType": "number-input",
            "label": {
                "value": "Enter an even number only"
            },
            "description": "Step constraint is applicable only if an initial value is defined (either using default or minimum)",
        },
        {
            "type": "number",
            "step": 2,
            "viewType": "number-input",
            "label": {
                "value": "Enter an even number only"
            },
            "description": "Step constraint is applicable only if an initial value is defined (either using default or minimum)",
        },
        {
            "type": "number",
            "step": 2,
            "default": 1,
            "viewType": "number-input",
            "label": {
                "value": "Enter an even number only"
            },
            "description": "Step constraint is applicable only if an initial value is defined (either using default or minimum)"
        },
        {
            "type": "number",
            "step": 2,
            "viewType": "number-input",
            "label": {
                "value": "Enter an even number only"
            },
            "description": "Step constraint is applicable only if an initial value is defined (either using default or minimum)",
            "minimum": 4
        },
        {
            "type": "number",
            "step": 2,
            "default": 2,
            "viewType": "number-input",
            "label": {
                "value": "Enter an even number only"
            },
            "description": "Step constraint is applicable only if an initial value is defined (either using default or minimum)",
            "minimum": 3
        }
    ]
}

test("step constraint for a non number field should be undefined", () => {
    const form = createFormInstance(formJson);
    const state = form.items[0].getState();
    expect(state.step).toBeUndefined()
})

test("non numeric step constraint remains undefined", () => {
    const form = createFormInstance(formJson);
    const state = form.items[1].getState();
    expect(state.step).toBeUndefined()
})

test("step constraint without minimum or default value should begin with 0", () => {
    const form = createFormInstance(formJson);
    const field = form.items[2]
    field.value = randomInt(10) * 2;
    expect(field.valid).toEqual(true);

    field.value =  randomInt(10) * 2 + 1;
    expect(field.valid).toEqual(false);
})

test("step constraint with default value should begin with default value", () => {
    const form = createFormInstance(formJson);
    const field = form.items[3]
    field.value = randomInt(10) * 2;
    expect(field.valid).toEqual(false);

    field.value =  randomInt(10) * 2 + 1;
    expect(field.valid).toEqual(true);
})

test("step constraint with minimum should begin with minimum", () => {
    const form = createFormInstance(formJson);
    const field = form.items[4]
    field.value = randomInt(10, 2) * 2;
    expect(field.valid).toEqual(true);

    field.value =  randomInt(10, 2) * 2 + 1;
    expect(field.valid).toEqual(false);
})

test("step constraint with minimum and default should begin with minimum", () => {
    const form = createFormInstance(formJson);
    const field = form.items[5]
    field.value = randomInt(10, 2) * 2;
    expect(field.valid).toEqual(false);

    field.value =  randomInt(10, 1) * 2 + 1;
    expect(field.valid).toEqual(true);
})