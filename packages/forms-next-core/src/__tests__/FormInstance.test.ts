import {formWithPanel, numberFieldForm, oneFieldForm, nonFormComponent} from './collateral/index';
import {createFormInstance} from '../FormInstance';

test('single field form', () => {
    const actual = createFormInstance(oneFieldForm);
    expect(actual.items.name).toEqual({
        ':viewType': 'text',
        ':type': 'string',
        ':name': 'name',
        ':readOnly': false,
        ':presence': true,
        ':enabled': true,
        ':id': 'name'
    });
});

test('single field form with number type', () => {
    const actual = createFormInstance(numberFieldForm);
    expect(actual.items.name).toEqual({
        ':viewType': 'numericEdit',
        ':type': 'number',
        ':name': 'name',
        ':readOnly': false,
        ':presence': true,
        ':enabled': true,
        ':id': 'name'
    });
});

test('single field form with default', () => {
    const form = JSON.parse(JSON.stringify(oneFieldForm));
    form[':items'].name[':default'] = 'john doe';
    const actual = createFormInstance(form);
    expect(actual.items.name).toEqual({
        ':default': 'john doe',
        ':viewType': 'text',
        ':type': 'string',
        ':name': 'name',
        ':readOnly': false,
        ':presence': true,
        ':enabled': true,
        ':id': 'name',
        ':value': 'john doe'
    });
});

test('form with panel', () => {
    const actual = createFormInstance(formWithPanel);
    expect(actual.items.name).toEqual({
        ':viewType': 'text',
        ':type': 'string',
        ':name': 'name',
        ':readOnly': false,
        ':presence': true,
        ':enabled': true,
        ':id': 'name'
    });
    expect(actual.items.address).toEqual({
        ':type': 'object',
        ':name': 'address',
        ':id': 'address',
        ':count': 1,
        ':initialCount': 1,
        ':items': {
            'zip': {
                ':viewType': 'numericEdit',
                ':type': 'number',
                ':name': 'zip',
                ':readOnly': false,
                ':presence': true,
                ':enabled': true,
                ':id': 'address.zip'
            }
        }
    });
});

test('nested fields with non form component', () => {
    const actual = createFormInstance(nonFormComponent);
    expect(actual.items.name).toEqual({
        ':viewType': 'text',
        ':type': 'string',
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
                ':viewType': 'numericEdit',
                ':type': 'number',
                ':name': 'zip',
                ':readOnly': false,
                ':presence': true,
                ':enabled': true,
                ':id': 'zip'
            }
        }
    });
});
