import React from 'react';
import {render, RenderResult} from '@testing-library/react';
import TextField from '../../components/TextField';
import {createForm, filterTestTable, InputFieldTestCase, Provider} from '../utils';
import userEvent from '@testing-library/user-event';

const field = {
    ':name': 'name',
    ':value': 'john doe',
    ':title': 'name'
};

export type FieldExpectType = (l: HTMLLabelElement | null, i: HTMLInputElement | null) => any

const labelInputTests: InputFieldTestCase<FieldExpectType>[] = [
    {
        name: 'field gets rendered without a provider',
        field: field,
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null) => {
            expect(label?.innerHTML).toEqual('name');
            expect(input?.getAttribute('name')).toEqual('name');
            expect(input?.value).toEqual('john doe');
        }
    },
    {
        name : 'html in the title should be handled for non rich text title',
        field: {
            ...field,
            ':title' : '<script>javascript</script><p>title inside p tags</p>'
        },
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null) => {
            expect(label?.innerHTML).toEqual('&lt;script&gt;javascript&lt;/script&gt;' +
                '&lt;p&gt;title inside p tags&lt;/p&gt;');
        }
    },
    {
        name: 'labels and inputs are linked with for and id attribute',
        field: field,
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null) => {
            expect(input?.getAttribute('id')).toEqual(label?.getAttribute('for'));
        }
    },
    {
        name: 'labels and inputs are also linked with aria-labelledBy attribute',
        field: field,
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement | null) => {
            expect(label?.getAttribute('id')).toEqual(input?.getAttribute('aria-labelledBy'));
        }
    },
    {
        name: 'accessibility attributes are properly set for required field',
        field: field,
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null) => {
            expect(label?.getAttribute('id')).toEqual(input?.getAttribute('aria-labelledBy'));
        }
    },
    {
        name: 'accessibility attributes are properly set for required field',
        field: {
            ...field,
            ':constraints': {
                ':required': true
            }
        },
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null) => {
            expect(input?.getAttribute('aria-required')).toEqual('true');
        }
    },
    {
        name: 'label is null if title is marked as hidden in the field',
        field: {
            ...field,
            ':hideTitle': true
        },
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement | null) => {
            expect(label).toBeNull();
        }
    },
    {
        name: 'input is marked as aria-invalid when the field is invalid',
        field: {
            ...field,
            ':valid': false
        },
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null) => {
            expect(input?.getAttribute('aria-invalid')).toBe('true');
        }
    },
    {
        name: 'input is not marked as aria-invalid when the field is valid',
        field: {
            ...field,
            ':valid': true
        },
        expects: (label ?: HTMLLabelElement | null, input?: HTMLInputElement | null) => {
            expect(input?.getAttribute('aria-invalid')).toBeNull();
        }
    },
    {
        name: "input is not marked as aria-invalid when the field's valid state is undefined",
        field,
        expects: (label ?: HTMLLabelElement | null, input?: HTMLInputElement | null) => {
            expect(input?.getAttribute('aria-invalid')).toBeNull();
        }
    }
];

test.each(filterTestTable(labelInputTests))('$name', async ({field, expects}) => {
    const component = <TextField {...field} />;
    const checkExpectations = ({container}: RenderResult) => {
        const label = container.querySelector('label');
        const input = container.querySelector('input');
        expects(label, input);
    };
    checkExpectations(render(component));
    const form = await createForm(field);
    const wrapper = Provider(form);
    checkExpectations(render(component, {wrapper}));
});

test('value entered by user in text field is set in model', async () => {
    const f = {
        ...field,
        ':id' : field[':name']
    };
    const component = <TextField {...f} />;
    const form = await createForm(field);
    const wrapper = Provider(form);
    const {container} = render(component, {wrapper});
    const input = container.querySelector('input');
    // @ts-ignore
    userEvent.clear(input);
    const inputValue = 'hello world';
    // @ts-ignore
    userEvent.type(input, inputValue);
    const state = form.getState();
    expect(state[':items'].name[':value']).toEqual(inputValue);
    expect(input?.value).toEqual(inputValue);
});

test.todo('it should handle disable property');
test.todo('it should handle richTextTitle property');
test.todo('it should handle readOnly property');
test.todo('it should handle visible property');
test.todo('it should handle screenReaderText property');
test.todo('it should handle minLength constraint');
test.todo('it should handle maxLength constraint');
test.todo('it should handle multiline constraint');
test.todo('it should dispatch click event to controller');
