import { formWithPanel, oneFieldForm, panelWithoutBinding } from "./collateral/index"
import createFormInstance from "../FormInstance"
import { FieldModel, FieldSetModel, FormModel } from "../Types"

test('single field form', () => {
    const actual = createFormInstance(oneFieldForm)
    expect(actual.form.items).toEqual([{
        "default": undefined,
        viewType: "text",
        type: "string",
        name: "name",
        readOnly: false,
        presence: true,
        enabled: true,
        valid: true,
        id: "name",
        value: null
    }])
})

test('single field form with number type', () => {
    const form: FormModel = JSON.parse(JSON.stringify(oneFieldForm)) as FormModel
    (form.items[0] as FieldModel).type = "number";
    (form.items[0] as FieldModel).viewType = "numericEdit"
    const actual = createFormInstance(form)
    expect(actual.form.items).toEqual([{
        "default": undefined,
        viewType: "numericEdit",
        type: "number",
        name: "name",
        readOnly: false,
        presence: true,
        enabled: true,
        valid: true,
        id: "name",
        value: null
    }])
})

test('single field form with default', () => {
    const form: FormModel = JSON.parse(JSON.stringify(oneFieldForm)) as FormModel
    (form.items[0] as FieldModel).default = "john doe"
    const actual = createFormInstance(form)
    expect(actual.data).toEqual({ name: "john doe" })
    expect(actual.form.items).toEqual([{
        "default": "john doe",
        viewType: "text",
        type: "string",
        name: "name",
        readOnly: false,
        presence: true,
        enabled: true,
        valid: true,
        id: "name",
        value: "john doe"
    }])
})

test("single field form with data", () => {
    const actual = createFormInstance(oneFieldForm, {name : "john doe"})
    expect(actual.form.items).toEqual([{
        "default": undefined,
        viewType: "text",
        type: "string",
        name: "name",
        readOnly: false,
        presence: true,
        enabled: true,
        valid: true,
        id: "name",
        value: "john doe"
    }])
})

test("form with panel", () => {
    const actual = createFormInstance(formWithPanel)
    expect(actual.form.items[0]).toEqual({
        "default": undefined,
        viewType: "text",
        type: "string",
        name: "name",
        readOnly: false,
        presence: true,
        enabled: true,
        valid: true,
        id: "name",
        value: null
    });
    expect(actual.form.items[1]).toEqual({
        type: "object",
        name: "address",
        id: "address",
        count: 1,
        initialCount: 1,
        items: [{
            "default": undefined,
            viewType: "numericEdit",
            type: "number",
            name: "zip",
            readOnly: false,
            presence: true,
            enabled: true,
            valid: true,
            id: "address.zip",
            value: null
        }]
    })
})

test("form with panel with data", () => {
    const actual = createFormInstance(formWithPanel, {name: "john doe", address: {zip : 10206}})
    expect(actual.form.items[0]).toEqual({
        "default": undefined,
        viewType: "text",
        type: "string",
        name: "name",
        readOnly: false,
        presence: true,
        enabled: true,
        valid: true,
        id: "name",
        value: "john doe"
    });
    expect(actual.form.items[1]).toEqual({
        type: "object",
        name: "address",
        id: "address",
        count: 1,
        initialCount: 1,
        items: [{
            "default": undefined,
            viewType: "numericEdit",
            type: "number",
            name: "zip",
            readOnly: false,
            presence: true,
            enabled: true,
            valid: true,
            id: "address.zip",
            value: 10206
        }]
    })
})

test("panel with default values", () => {
    const form = JSON.parse(JSON.stringify(formWithPanel)) as FormModel;
    ((form.items[1] as FieldSetModel).items[0] as FieldModel).default = 10206
    const actual = createFormInstance(form, {name: "john doe"})
    expect(actual.data).toEqual({
        name : "john doe",
        address : {
            zip : 10206
        }
    })
    expect(actual.form.items[0]).toEqual({
        "default": undefined,
        viewType: "text",
        type: "string",
        name: "name",
        readOnly: false,
        presence: true,
        enabled: true,
        valid: true,
        id: "name",
        value: "john doe"
    });
    expect(actual.form.items[1]).toEqual({
        type: "object",
        name: "address",
        id: "address",
        count: 1,
        initialCount: 1,
        items: [{
            "default": 10206,
            viewType: "numericEdit",
            type: "number",
            name: "zip",
            readOnly: false,
            presence: true,
            enabled: true,
            valid: true,
            id: "address.zip",
            value: 10206
        }]
    })
})

test("panel without data binding", () => {
    const actual = createFormInstance(panelWithoutBinding, {name: "john doe", zip : 10206})
    expect(actual.form.items[0]).toEqual({
        "default": undefined,
        viewType: "text",
        type: "string",
        name: "name",
        readOnly: false,
        presence: true,
        enabled: true,
        valid: true,
        id: "name",
        value: "john doe"
    });
    expect(actual.form.items[1]).toEqual({
        count: 1,
        initialCount: 1,
        items: [{
            "default": undefined,
            viewType: "numericEdit",
            type: "number",
            name: "zip",
            readOnly: false,
            presence: true,
            enabled: true,
            valid: true,
            id: "zip",
            value: 10206
        }]
    })
})

test("panel without data binding and default values", () => {
    const form = JSON.parse(JSON.stringify(panelWithoutBinding)) as FormModel;
    ((form.items[1] as FieldSetModel).items[0] as FieldModel).default = 10206
    const actual = createFormInstance(form)
    expect(actual.form.items[0]).toEqual({
        "default": undefined,
        viewType: "text",
        type: "string",
        name: "name",
        readOnly: false,
        presence: true,
        enabled: true,
        valid: true,
        id: "name",
        value: null
    });
    expect(actual.form.items[1]).toEqual({
        count: 1,
        initialCount: 1,
        items: [{
            "default": 10206,
            viewType: "numericEdit",
            type: "number",
            name: "zip",
            readOnly: false,
            presence: true,
            enabled: true,
            valid: true,
            id: "zip",
            value: 10206
        }]
    })
    expect(actual.data).toEqual({
        zip : 10206
    })
})
