import {formWithPanel, numberFieldForm, oneFieldForm, nonFormComponent, create, formWithRules} from './collateral';
import {createFormInstance, fetchForm} from '../src';
import siblingAccess from '../__tests__/collateral/siblingAccess';
import {Change} from '../src/controller/Controller';

const nock = require('nock');

test('single field form', async () => {
    const form = JSON.parse(JSON.stringify(oneFieldForm));
    const actual = await createFormInstance(form);
    expect(actual.items?.[0].getState()).toMatchObject({
        type: 'string',
        fieldType: 'text-input',
        name: 'name',
        readOnly: false,
        visible: true,
        enabled: true
    });
});

test('single field form with number type', async () => {
    const actual = await createFormInstance(numberFieldForm);
    expect(actual.items?.[0].getState()).toMatchObject({
        fieldType: 'number-input',
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
    expect(actual.items?.[0].getState()).toMatchObject({
        default: 'john doe',
        fieldType: 'text-input',
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
    expect(actual.items?.[0].getState()).toMatchObject({
        fieldType: 'text-input',
        type: 'string',
        name: 'name',
        readOnly: false,
        visible: true,
        enabled: true
    });
    expect(actual.items?.[1].getState()).toMatchObject({
        type: 'object',
        name: 'address',
        visible : true
    });
    expect(actual.items?.[1].items?.[0].getState()).toMatchObject({
        fieldType: 'number-input',
        type: 'number',
        name: 'zip',
        value: undefined,
        readOnly: false,
        visible: true,
        enabled: true
    });
});

test.skip('nested fields with non form component', async () => {
    const actual = await createFormInstance(nonFormComponent);
    expect(actual.items?.[0].getState()).toMatchObject({
        fieldType: 'text-input',
        type: 'string',
        name: 'name',
        readOnly: false,
        visible: true,
        enabled: true
    });
    expect(actual.items?.[1].getState()).toMatchObject({
        count: 1,
        initialCount: 1,
        visible : true,
        items : [
            {
                fieldType: 'number-input',
                type: 'number',
                name: 'zip',
                readOnly: false,
                visible: true,
                enabled: true
            }
        ]
    });
});

test('form with sibling access', async () => {
    const form = await createFormInstance(siblingAccess.staticForm);
    const f = form.items?.[0];
    f.value = 'x';
    expect(form.items[1].value).toEqual('x');
});

test('form with sibling access - dynamic form', async () => {
    const form = await createFormInstance(siblingAccess.dynamicForm);
    const p = form.items?.[0].items?.[0].items?.[0];
    const q = form.items?.[0].items?.[0].items?.[1];
    const t = form.items?.[0].items?.[0].items?.[2];
    //@ts-ignore
    p.value = '100';
    //@ts-ignore
    q.value = '10';
    expect(t?.value).toEqual(1000);
});

test('form with rules', async () => {
    const formJson: any = JSON.parse(JSON.stringify(formWithRules));
    formJson.items[0].default = 'john';
    formJson.items[1].default = 'doe';
    let form = await createFormInstance(formJson);
    let field = form.items?.[2];
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

