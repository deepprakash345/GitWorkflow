/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

import React from 'react';
import TextField from '../../src/components/TextField';
import {
    elementFetcher,
    filterTestTable,
    InputFieldTestCase,
    jest26CompatibleTable,
    renderComponent
} from '../utils';
import userEvent from '@testing-library/user-event';
import {DEFAULT_ERROR_MESSAGE} from './RadioButtonGroup.test';

const field = {
    'name': 'name',
    'default': 'john doe',
    label: {
        value: 'name'
    },
    'visible' : true
};

export type FieldExpectType = (l: HTMLLabelElement | null, i: HTMLInputElement | null, c: HTMLElement) => any

const labelInputTests: InputFieldTestCase<FieldExpectType>[] = [
    {
        name: 'field gets rendered',
        field: field,
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null) => {
            expect(label?.innerHTML).toEqual('name');
            expect(input?.getAttribute('name')).toEqual('name');
            expect(input?.value).toEqual('john doe');
        }
    },
    {
        name : 'html in the label should be handled for non rich text',
        field: {
            ...field,
            'label' : {
                value: '<script>javascript</script><p>title inside p tags</p>'
            }
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
        field: {
            ...field,
            'required': true
        },
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null) => {
            expect(input?.getAttribute('aria-required')).toEqual('true');
        }
    },
    {
        name: 'label is null if title is marked as hidden in the field',
        field: {
            ...field,
            label : {
                ...field.label,
                visible: false
            }
        },
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement | null) => {
            expect(label).toBeNull();
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
        name: 'description exists when the field is valid',
        field: {
            ...field,
            'valid': true,
            'description' : 'some description'
        },
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null, container: HTMLElement) => {
            //@ts-ignore
            expect(container.textContent).toContain('some description');
        }
    },
    {
        name: 'error message element exists when the field is invalid',
        field: {
            ...field,
            'valid': false,
            'errorMessage' : 'there is an error in the field'
        },
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null, container: HTMLElement) => {
            expect(container.textContent).toContain('there is an error in the field');
        }
    },
    {
        name: 'error message doesn\'t exists when there is no error',
        field: {
            ...field,
            'valid': true,
            'errorMessage' : DEFAULT_ERROR_MESSAGE
        },
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null, container: HTMLElement) => {
            expect(container.textContent).not.toContain(DEFAULT_ERROR_MESSAGE);
        }
    }
];

const helper = renderComponent(TextField, elementFetcher);

test.each(jest26CompatibleTable(filterTestTable(labelInputTests)))('%s', async (name, {field, expects}) => {
    let x = await helper(field);
    expects(x.label, x.input, x.container);
});

test('value entered by user in text field is set in model', async () => {
    const f = {
        ...field
    };
    let {input, element} = await helper(f);
    // @ts-ignore
    userEvent.clear(input);
    const inputValue = 'hello world';
    // @ts-ignore
    userEvent.type(input, inputValue);
    const state = element.getState();
    expect(state.value).toEqual(inputValue);
    expect(input?.value).toEqual(inputValue);
});

test('help text content changes when field becomes invalid', async () => {
    const f = {
        ...field,
        description: 'some description',
        'required' : true
    };

    const {container, input} = await helper(f);

    // @ts-ignore
    expect(container.textContent).toContain('some description');
    expect(container.textContent).not.toContain(DEFAULT_ERROR_MESSAGE);
    // @ts-ignore
    userEvent.clear(input);
    expect(container.textContent).toContain(DEFAULT_ERROR_MESSAGE);
    expect(container.textContent).not.toContain('some description');
    // @ts-ignore
    userEvent.type(input, 'some value');
    // @ts-ignore
    expect(container.textContent).toContain('some description');
    expect(container.textContent).not.toContain(DEFAULT_ERROR_MESSAGE);
});


test.todo('it should handle disable property');
test.todo('it should handle richTextTitle property');
test.todo('it should handle readOnly property');
test('it should handle visible property', async () => {
    const f = {
        ...field,
        'visible' : false
    };

    let {container} = await helper(f);
    expect(container.innerHTML).toContain('display: none'); //todo: find a better check
});
test.todo('it should handle screenReaderText property');
test.todo('it should handle minLength constraint');
test.todo('it should handle maxLength constraint');
test.todo('it should handle multiline constraint');
test.todo('it should dispatch click event to controller');
