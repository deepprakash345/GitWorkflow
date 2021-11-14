import React from 'react';
import {render} from '@testing-library/react';
import Checkbox from '../../src/components/Checkbox';
import userEvent from '@testing-library/user-event';
import {createForm, filterTestTable, ignoredTestTable, InputFieldTestCase, Provider} from '../utils';
import {FieldExpectType} from './TextField.test';
import {FieldJson} from '@aemforms/forms-next-core/lib';

const field = {
    'name': 'name',
    'title': 'name',
    'visible' : true,
    'type' : 'boolean',
    'enum' : [true],
    'enumNames' : ['some option title']
};

const labelInputTests: InputFieldTestCase<FieldExpectType>[] = [
    {
        name : 'a checkbox should render if there are no options',
        field : {
            'name': 'name',
            'value': 'john doe',
            'title': 'name',
            'visible' : true
        },
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null) => {
            expect(label?.textContent).toEqual('name');
            expect(input?.getAttribute('name')).toEqual('name');
            expect(input?.value).toEqual('john doe');
        }
    },
    {
        name: 'field gets rendered without a provider',
        field: field,
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null) => {
            expect(label?.textContent).toEqual('name');
            expect(input?.getAttribute('name')).toEqual('name');
            expect(input?.value).toEqual('');
        }
    },
    {
        name : 'html in the title should be handled for non rich text title',
        field: {
            ...field,
            'title' : '<script>javascript</script><p>title inside p tags</p>'
        },
        // eslint-disable-next-line no-unused-vars
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null) => {
            expect(label?.innerHTML).toContain('&lt;script&gt;javascript&lt;/script&gt;' +
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
        x: true,
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null) => {
            //expect(label?.getAttribute('id')).toEqual(input?.getAttribute('aria-labelledBy'));
        }
    },
    {
        name: 'accessibility attributes are properly set for required field',
        field: {
            ...field,
            'required' : true
        },
        x :true,
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null) => {
            expect(input?.getAttribute('aria-required')).toEqual('true');
        }
    },
    {
        name: 'label is null if title is marked as hidden in the field',
        field: {
            ...field,
            'hideTitle': true
        },
        // eslint-disable-next-line no-unused-vars
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement | null) => {
            expect(label?.textContent).toEqual('');
        }
    },
    {
        name: 'input is marked as aria-invalid when the field is invalid',
        field: {
            ...field,
            'valid': false
        },
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null) => {
            expect(input?.getAttribute('aria-invalid')).toBe('true');
        }
    },
    {
        name: 'input is not marked as aria-invalid when the field is valid',
        field: {
            ...field,
            'valid': true
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
    },
    {
        name : 'a checkbox should be selected if value is on',
        field : {
            ...field,
            'value' : true
        },
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null) => {
            expect(input?.checked).toEqual(true);
        }
    },
    {
        name : 'a checkbox should not be selected if value is not on',
        field : {
            ...field,
            'enum' : [false, true],
            'value' : true
        },
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null) => {
            expect(input?.checked).toEqual(false);
        }
    },
    {
        name : 'a checkbox should be selected if value is undefined',
        field : {
            ...field
        },
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null) => {
            expect(input?.checked).toEqual(false);
        }
    },
    {
        name : 'a checkbox should not be selected if both value and options are undefined',
        field : {
            'name': 'name',
            'title': 'name',
            'visible' : true
        },
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null) => {
            expect(input?.checked).toEqual(false);
        }
    }
];

const helper = async (field : any, useProvider = true) => {
    const component = <Checkbox {...field} />;
    let container, form;
    if (useProvider) {
        form = await createForm(field);
        const wrapper = Provider(form);
        container = render(component, {wrapper}).container;
    } else {
        container = render(component).container;
    }
    const input = container.querySelector('input');
    const label = container.querySelector('label');
    return {
        input,
        label,
        container,
        form
    };
};

test.each(filterTestTable(labelInputTests))('$name', async ({field, expects}) => {
    //let x = await helper(field, false);
    //expects(x.label, x.input);
    let x = await helper(field);
    expects(x.label, x.input);
});

ignoredTestTable(labelInputTests).forEach((v) => {
    test.todo(v.name);
});

test('if no options are defined then value cannot be selected', async () => {
    const f = {
        'name' : 'name',
        'title' : 'name',
        'id' : 'name',
        'visible' : true
    };
    const {input, form} = await helper(f);
    // @ts-ignore
    userEvent.click(input);
    const state = form?.getState();
    expect((state?.items.name as FieldJson).value).toEqual(undefined);
    expect(input?.checked).toEqual(false);
    expect(input?.value).toEqual('');
    // @ts-ignore
    userEvent.click(input);
    expect(input?.checked).toEqual(false);
});

test('selection made by the user sets the value', async () => {
    const f = {
        ...field,
        'id' : field.name
    };
    const {input, form, label} = await helper(f);
    // @ts-ignore
    userEvent.click(label);
    const state = form?.getState();
    expect((state?.items.name as FieldJson).value).toEqual(true);
    expect(input?.checked).toEqual(true);
    expect(input?.value).toEqual('true');
});

test('clicking on checkbox twice resets the value', async () => {
    const f = {
        ...field,
        'enum' : [false, true],
        'id' : field.name,
        'value' : [true, false][Math.round(Math.random())]
    };
    const {input, form} = await helper(f);
    const value = input?.value;
    const checked = input?.checked;
    // @ts-ignore
    userEvent.click(input);
    // @ts-ignore
    userEvent.click(input);
    const state = form?.getState();
    expect((state?.items.name as FieldJson).value).toEqual(f.value);
    expect(input?.checked).toEqual(checked);
    expect(input?.value).toEqual(`${value}`);
});


test('deselecting the checkbox sets the value to off value', async () => {
    const f = {
        ...field,
        'enum' : [false, true],
        'id' : field.name,
        'value' : false
    };
    const {input, form} = await helper(f);
    // @ts-ignore
    userEvent.click(input);
    const state = form?.getState();
    expect((state?.items.name as FieldJson).value).toBe(true);
    expect(input?.checked).toEqual(false);
    expect(input?.value).toEqual('true');
});

test('it should handle visible property', async () => {
    const f = {
        ...field,
        'visible' : false
    };

    const {label} = await helper(f);
    expect(label?.getAttribute('style')).toEqual('display: none;');
});

test('a checkbox with no off value should get its value undefined when not selected', async () => {
    const f = {
        ...field,
        'id' : field.name
    };

    const {input, form} = await helper(f);
    expect(input?.checked).toEqual(false);
    expect(input?.value).toEqual('');
    // @ts-ignore
    userEvent.click(input);
    let state = form?.getState();
    expect((state?.items.name as FieldJson).value).toBe(true);
    expect(input?.checked).toEqual(true);
    expect(input?.value).toEqual('true');

    // @ts-ignore
    userEvent.click(input);
    expect(input?.checked).toEqual(false);
    expect(input?.value).toEqual('');
    state = form?.getState();
    expect((state?.items.name as FieldJson).value).toBe(undefined);
});

test('a checkbox with no off value should not be invalid when not required', async () => {
    const f = {
        ...field,
        'id' : field.name
    };

    const {input, form} = await helper(f);
    // @ts-ignore
    userEvent.click(input);
    let state = form?.getState();
    expect(state.data.name).toEqual(true);
    // @ts-ignore
    userEvent.click(input);
    state = form?.getState();
    expect((state?.items.name as FieldJson).valid).not.toBe(false);

});

test('a required checkbox with null value should be invalid', async () => {
    const f = {
        ...field,
        required: true,
        'id' : field.name
    };

    const {input, form} = await helper(f);
    // @ts-ignore
    userEvent.click(input);
    // @ts-ignore
    userEvent.click(input);
    let state = form?.getState();
    expect((state?.items.name as FieldJson).valid).toBe(false);
});
