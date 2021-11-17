import {formWithPanel, numberFieldForm, oneFieldForm, nonFormComponent, create, formWithRules} from './collateral';
import {createFormInstance, fetchForm} from '../src';
import {FieldJson} from '../src/types';
const nock = require('nock');

test('single field form', async () => {
    const form = JSON.parse(JSON.stringify(oneFieldForm));
    const actual = await createFormInstance(form);
    expect(actual.getState().items[0]).toMatchObject({
        type: 'string',
        viewType: 'text-input',
        name: 'name',
        readOnly: false,
        visible: true,
        enabled: true
    });
});

test('single field form with number type', async () => {
    const actual = await createFormInstance(numberFieldForm);
    expect(actual.getState().items[0]).toMatchObject({
        viewType: 'number-input',
        type: 'number',
        name: 'name',
        readOnly: false,
        visible: true,
        enabled: true
    });
});

test('single field form with default', async () => {
    const form = JSON.parse(JSON.stringify(oneFieldForm));
    form.items[0].default = 'john doe';
    const actual = await createFormInstance(form);
    expect(actual.getState().items[0]).toMatchObject({
        default: 'john doe',
        viewType: 'text-input',
        type: 'string',
        name: 'name',
        readOnly: false,
        visible: true,
        enabled: true,
        value: 'john doe'
    });
});

test('form with panel', async () => {
    const actual = await createFormInstance(formWithPanel);
    expect(actual.getState().items[0]).toMatchObject({
        viewType: 'text-input',
        type: 'string',
        name: 'name',
        readOnly: false,
        visible: true,
        enabled: true
    });
    expect(actual.getState().items[1]).toMatchObject({
        type: 'object',
        name: 'address',
        visible : true,
        items : [
            {
                viewType: 'number-input',
                type: 'number',
                name: 'zip',
                value: undefined,
                readOnly: false,
                visible: true,
                enabled: true
            }
        ]
    });
});

test.skip('nested fields with non form component', async () => {
    const actual = await createFormInstance(nonFormComponent);
    expect(actual.getState().items[0]).toMatchObject({
        viewType: 'text-input',
        type: 'string',
        name: 'name',
        readOnly: false,
        visible: true,
        enabled: true
    });
    expect(actual.getState().items[1]).toMatchObject({
        count: 1,
        initialCount: 1,
        visible : true,
        items : [
            {
                viewType: 'number-input',
                type: 'number',
                name: 'zip',
                readOnly: false,
                visible: true,
                enabled: true
            }
        ]
    });
});

test('form with rules', async () => {
    const formJson: any = JSON.parse(JSON.stringify(formWithRules));
    formJson.items[0].default = 'john';
    formJson.items[1].default = 'doe';
    let form = await createFormInstance(formJson);
    let field = form.getState().items[2] as FieldJson;
    expect(field.value).toEqual('john doe');
});

const API_HOST = 'https://api.aem-forms.com';
test('Fetch a form from rest API should work', async () => {
    const scope = nock(API_HOST)
        .get('/my-test-form.model.json')
        .reply(200, {
            'model' : create(['f', 'f', 'f'])
        });
    const form = await fetchForm(`${API_HOST}/my-test-form`);
    const formObj = JSON.parse(form);
    expect(formObj).toEqual(create(['f', 'f', 'f']));
});

test('Fetch a form from wrong rest API should throw an error', async () => {
    const scope = nock(API_HOST)
        .get('/my-test-form.model.json')
        .reply(404);
    await expect(fetchForm(`${API_HOST}/my-test-form`)).rejects.toThrow('Not Found');
});

test('Fetch form should pass the request headers', async () => {
    const scope = nock(API_HOST, {
        reqheaders : {
            'authorization': 'Bearer sometoken'
        }
    }).get('/my-test-form.model.json')
        .reply(200, {
            'model' : create(['f', 'f', 'f'])
        });
    const form = await fetchForm(`${API_HOST}/my-test-form`, {
        'authorization' : 'Bearer sometoken'
    });
    const formObj = JSON.parse(form);
    expect(formObj).toEqual(create(['f', 'f', 'f']));
});

