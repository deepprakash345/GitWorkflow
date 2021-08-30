import {formWithPanel, numberFieldForm, oneFieldForm, nonFormComponent, create} from './collateral/index';
import {createFormInstance, fetchForm} from '../FormInstance';
import {jsonString} from '../utils/JsonUtils';
const nock = require('nock');

test('single field form', async () => {
    const actual = await createFormInstance(oneFieldForm);
    expect(actual.items.name).toEqual({
        ':constraints' : { ':dataType': 'string' },
        ':type': 'text',
        ':name': 'name',
        ':readOnly': false,
        ':presence': true,
        ':enabled': true,
        ':id': 'name'
    });
});

test('single field form with number type', async () => {
    const actual = await createFormInstance(numberFieldForm);
    expect(actual.items.name).toEqual({
        ':type': 'numericEdit',
        ':constraints' : { ':dataType': 'number' },
        ':name': 'name',
        ':readOnly': false,
        ':presence': true,
        ':enabled': true,
        ':id': 'name'
    });
});

test('single field form with default', async () => {
    const form = JSON.parse(JSON.stringify(oneFieldForm));
    form[':items'].name[':default'] = 'john doe';
    const actual = await createFormInstance(form);
    expect(actual.items.name).toEqual({
        ':default': 'john doe',
        ':type': 'text',
        ':constraints' : { ':dataType': 'string' },
        ':name': 'name',
        ':readOnly': false,
        ':presence': true,
        ':enabled': true,
        ':id': 'name',
        ':value': 'john doe'
    });
});

test('form with panel', async () => {
    const actual = await createFormInstance(formWithPanel);
    expect(actual.items.name).toEqual({
        ':type': 'text',
        ':constraints' : { ':dataType': 'string' },
        ':name': 'name',
        ':readOnly': false,
        ':presence': true,
        ':enabled': true,
        ':id': 'name'
    });
    expect(actual.items.address).toEqual({
        ':constraints' : { ':dataType': 'object' },
        ':name': 'address',
        ':id': 'address',
        ':count': 1,
        ':initialCount': 1,
        ':items': {
            'zip': {
                ':type': 'numericEdit',
                ':constraints' : { ':dataType': 'number' },
                ':name': 'zip',
                ':readOnly': false,
                ':presence': true,
                ':enabled': true,
                ':id': 'address.zip'
            }
        }
    });
});

test('nested fields with non form component', async () => {
    const actual = await createFormInstance(nonFormComponent);
    expect(actual.items.name).toEqual({
        ':type': 'text',
        ':constraints' : { ':dataType': 'string' },
        ':name': 'name',
        ':readOnly': false,
        ':presence': true,
        ':enabled': true,
        ':id': 'name'
    });
    expect(actual.items.somekey).toEqual({
        ':count': 1,
        ':initialCount': 1,
        ':items': {
            'zip': {
                ':type': 'numericEdit',
                ':constraints' : { ':dataType': 'number' },
                ':name': 'zip',
                ':readOnly': false,
                ':presence': true,
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
    expect(form.getState().data).toEqual(data);
    expect((form.items.f1 as any)[':value']).toEqual(data['f1']);
    expect((form.items.f2 as any)[':value']).toEqual(data['f2']);
    expect((form.items.f3 as any)[':value']).toEqual(data['f3']);
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

test.todo('Form creation should not fail if prefill url returns wrong data'); /*, async () => {
    let json = create(['f', 'f', 'f']);
    json[':metadata'] = {
        'dataUrl' : `${API_HOST}/my-test-data.json`
    };
    nock(API_HOST)
        .post('/my-test-data.json')
        .reply(200, {
            'some-key' : 'some-value'
        });
    const form = await createFormInstance(json);
    expect(form.getState().data).toEqual({});
});*/