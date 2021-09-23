import {formWithPanel, numberFieldForm, oneFieldForm, nonFormComponent, create} from './collateral';
import {createFormInstance, fetchForm} from '../src';
import {jsonString} from '../src/utils/JsonUtils';
import {FieldJson} from '../src/types';
const nock = require('nock');

test('single field form', async () => {
    const actual = await createFormInstance(oneFieldForm);
    expect(actual.children.name.json()).toEqual({
        ':constraints' : { ':dataType': 'string' },
        ':type': 'text',
        ':name': 'name',
        ':readOnly': false,
        ':visible': true,
        ':enabled': true,
        ':id': 'name'
    });
});

test('single field form with number type', async () => {
    const actual = await createFormInstance(numberFieldForm);
    expect(actual.children.name.json()).toEqual({
        ':type': 'numericEdit',
        ':constraints' : { ':dataType': 'number' },
        ':name': 'name',
        ':readOnly': false,
        ':visible': true,
        ':enabled': true,
        ':id': 'name'
    });
});

test('single field form with default', async () => {
    const form = JSON.parse(JSON.stringify(oneFieldForm));
    form[':items'].name[':default'] = 'john doe';
    const actual = await createFormInstance(form);
    expect(actual.children.name.json()).toEqual({
        ':default': 'john doe',
        ':type': 'text',
        ':constraints' : { ':dataType': 'string' },
        ':name': 'name',
        ':readOnly': false,
        ':visible': true,
        ':enabled': true,
        ':id': 'name',
        ':value': 'john doe'
    });
});

test('form with panel', async () => {
    const actual = await createFormInstance(formWithPanel);
    expect(actual.children.name.json()).toEqual({
        ':type': 'text',
        ':constraints' : { ':dataType': 'string' },
        ':name': 'name',
        ':readOnly': false,
        ':visible': true,
        ':enabled': true,
        ':id': 'name'
    });
    expect(actual.children.address.json()).toEqual({
        ':constraints' : { ':dataType': 'object' },
        ':name': 'address',
        ':id': 'address',
        ':visible' : true,
        ':count': 1,
        ':initialCount': 1,
        ':items': {
            'zip': {
                ':type': 'numericEdit',
                ':constraints' : { ':dataType': 'number' },
                ':name': 'zip',
                ':readOnly': false,
                ':visible': true,
                ':enabled': true,
                ':id': 'address.zip'
            }
        }
    });
});

test('nested fields with non form component', async () => {
    const actual = await createFormInstance(nonFormComponent);
    expect(actual.children.name.json()).toEqual({
        ':type': 'text',
        ':constraints' : { ':dataType': 'string' },
        ':name': 'name',
        ':readOnly': false,
        ':visible': true,
        ':enabled': true,
        ':id': 'name'
    });
    expect(actual.children.somekey.json()).toEqual({
        ':count': 1,
        ':initialCount': 1,
        ':visible' : true,
        ':items': {
            'zip': {
                ':type': 'numericEdit',
                ':constraints' : { ':dataType': 'number' },
                ':name': 'zip',
                ':readOnly': false,
                ':visible': true,
                ':enabled': true,
                ':id': 'zip'
            }
        }
    });
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

test('Form should be prefilled from data URL', async () => {
    let json = create(['f', 'f', 'f']);
    json[':metadata'] = {
        ':dataUrl' : `${API_HOST}/my-test-data.json`
    };
    const data = {
        'f1' : 'x',
        'f2' : 'y',
        'f3' : 'z'
    };
    nock(API_HOST)
        .post('/my-test-data.json')
        .reply(200, {
            ':data' : jsonString(data)
        });
    const form = await createFormInstance(json);
    const state= form.getState();
    expect(state[':data']).toEqual(data);
    expect((state[':items'].f1 as FieldJson)[':value']).toEqual(data['f1']);
    expect((state[':items'].f2 as FieldJson)[':value']).toEqual(data['f2']);
    expect((state[':items'].f3 as FieldJson)[':value']).toEqual(data['f3']);
});

test.todo('Form creation should not fail if prefill url returns no data');/*, async () => {
    let json = create(['f', 'f', 'f']);
    json[':metadata'] = {
        'dataUrl' : `${API_HOST}/my-test-data.json`
    };
    nock(API_HOST)
        .post('/my-test-data.json')
        .reply(404);
    const form = await createFormInstance(json);
    expect(form.getState().data).toEqual({});
});*/

test('Form creation should not fail if prefill url returns wrong data', async () => {
    let json = create(['f', 'f', 'f']);
    json[':metadata'] = {
        ':dataUrl' : `${API_HOST}/my-test-data.json`
    };
    nock(API_HOST)
        .post('/my-test-data.json')
        .reply(200, {
            'some-key' : 'some-value'
        });
    const form = await createFormInstance(json);
    expect(form.getState()[':data']).toEqual({});
});