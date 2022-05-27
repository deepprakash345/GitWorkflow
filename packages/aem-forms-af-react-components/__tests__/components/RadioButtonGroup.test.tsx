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
import RadioButtonGroup from '../../src/components/RadioButtonGroup';
import {
    filterTestTable,
    InputFieldTestCase,
    jest26CompatibleTable,
    renderComponent
} from '../utils';
import userEvent from '@testing-library/user-event';
import {FieldJson} from '@adobe/aem-forms-af-core/lib';

export const DEFAULT_ERROR_MESSAGE = 'There is an error in the field';

const field : FieldJson = {
    'name': 'EmploymentStatus',
    'value': true,
    'visible' : true,
    label : {
        value : 'Are you Employed'
    },
    'fieldType' : 'radio-group',
    'type' : 'boolean',
    'enum' : [true, false],
    'enumNames' : ['Yes',  'No']
};

type Input = {
    labels: HTMLLabelElement[],
    inputs: HTMLInputElement[],
    group: Element | null,
    container: HTMLElement | null
}

type GroupExpectType = (i : Input) => any

const labelInputTests: InputFieldTestCase<GroupExpectType>[] = [
    {
        name: 'field gets rendered without a provider',
        field: field,
        expects: ({labels, inputs, group}) => {
            expect(group?.textContent).toContain('Are you Employed');
            expect(labels.length).toEqual(2);
            expect(inputs.length).toEqual(2);
            expect(labels[0]?.textContent).toEqual('Yes');
            expect(labels[1]?.textContent).toEqual('No');
            expect(inputs[0]?.name).toEqual('EmploymentStatus');
            expect(inputs[0]?.value).toEqual('true');
            expect(inputs[1]?.value).toEqual('false');
        }
    },
    {
        name : 'html in the label should be handled for non rich text label',
        field: {
            ...field,
            'label' : {
                value: '<script>javascript</script><p>label inside p tags</p>'
            }
        },
        expects: ({group}) => {
            expect(group?.innerHTML).toContain('&lt;script&gt;javascript&lt;/script&gt;' +
                '&lt;p&gt;label inside p tags&lt;/p&gt;');
        }
    },
    {
        name: 'labels and inputs are linked with for and id attribute',
        field: field,
        expects: ({labels, inputs}) => {
            expect(inputs[0]?.getAttribute('id')).toEqual(labels[0]?.getAttribute('for'));
            expect(inputs[1]?.getAttribute('id')).toEqual(labels[1]?.getAttribute('for'));
        }
    },
    {
        name: 'labels and inputs are also linked with aria-labelledBy attribute',
        field: field,
        expects: ({labels, inputs}) => {
            expect(labels[0]?.getAttribute('id')).toEqual(inputs[0]?.getAttribute('aria-labelledBy'));
            expect(labels[1]?.getAttribute('id')).toEqual(inputs[1]?.getAttribute('aria-labelledBy'));
        }
    },
    {
        name: 'accessibility attributes are properly set for required field',
        field: {
            ...field,
            'required': true
        },
        expects: ({group}) => {
            expect(group?.getAttribute('aria-required')).toEqual('true');
        }
    },
    {
        name: 'label is empty if label is marked as hidden in the field',
        field: {
            ...field,
            label : {
                ...field.label,
                visible: false
            }
        },
        expects: ({group}) => {
            expect(group?.textContent).not.toContain('Are you Employed');
        }
    },
    {
        name: 'input is marked as aria-invalid when the field is invalid',
        field: {
            ...field,
            'valid': false
        },
        expects: ({group}) => {
            expect(group?.getAttribute('aria-invalid')).toBe('true');
        }
    },
    {
        name: 'input is not marked as aria-invalid when the field is valid',
        field: {
            ...field,
            'valid': true
        },
         expects: ({group}) => {
            expect(group?.getAttribute('aria-invalid')).toBeNull();
        }
    },
    {
        name: "input is not marked as aria-invalid when the field's valid state is undefined",
        field,
        expects: ({group}) => {
            expect(group?.getAttribute('aria-invalid')).toBeNull();
        }
    },
    {
        name: "group's label property is accessible",
        field,
        expects: ({group}) => {
            const labelID = group?.getAttribute('aria-labelledby');
            const glabel = group?.querySelector('#' + labelID);
            expect(glabel?.textContent).toEqual('Are you Employed');
        }
    },
    {
        name: 'correct option is selected on initial render case 1',
        field,
        expects: ({inputs}) => {
            expect(inputs[0]?.checked).toEqual(true);
            expect(inputs[0]?.value).toEqual('true');
            expect(inputs[1]?.checked).toEqual(false);
            expect(inputs[1]?.value).toEqual('false');
        }
    },
    {
        name: 'correct option is selected on initial render case 2',
        field: {
            ...field,
            'value' : false
        },
        expects: ({inputs}) => {
            expect(inputs[1]?.checked).toEqual(true);
            expect(inputs[1]?.value).toEqual('false');
            expect(inputs[0]?.checked).toEqual(false);
            expect(inputs[0]?.value).toEqual('true');
        }
    },
    {
        name: 'no option is selected on initial render when value is null',
        field: {
            ...field,
            'value' : null
        },
        expects: ({inputs}) => {
            expect(inputs[0]?.checked).toEqual(false);
            expect(inputs[0]?.value).toEqual('true');
            expect(inputs[1]?.checked).toEqual(false);
            expect(inputs[1]?.value).toEqual('false');
        }
    },
    {
        name: "no option is selected on initial render when value doesn't belong to any options" ,
        field: {
            ...field,
            'type' : 'string',
            'value' : 'some other option',
            'enum' : ['option 1', 'option 2']
        },
        expects: ({inputs}) => {
            expect(inputs[0]?.checked).toEqual(false);
            expect(inputs[0]?.value).toEqual('option 1');
            expect(inputs[1]?.checked).toEqual(false);
            expect(inputs[1]?.value).toEqual('option 2');
        }
    },
    {
        name: 'helpText div doesn\'t exists when there is no error and no description',
        field: {
            ...field
        },
        expects: ({container}) => {
            const err = container?.querySelector('.formField__helpText');
            expect(err).toBeNull();
        }
    },
    {
        name: 'helpText div exists when there is a description',
        field: {
            ...field,
            description: 'some description'
        },
        expects: ({container}) => {
            const err = container?.querySelector('.formField__helpText');
            expect(err).not.toBeNull();
            // @ts-ignore
            expect(err.textContent).toEqual('some description');
        }
    },
    {
        name: 'help text exists when the field is invalid',
        field: {
            ...field,
            'valid': false,
            'errorMessage' : 'there is an error in the field'
        },
        expects: ({container}) => {
            const err = container?.querySelector('.formField__helpText');
            expect(err).not.toBeNull();
            //@ts-ignore
            expect(err.textContent).toEqual('there is an error in the field');
        }
    }
];

const helper = renderComponent(RadioButtonGroup, (container) => {
    return {
        group : container.querySelector('[role="radiogroup"]'),
        inputs : Array.from(container.querySelectorAll('input')),
        labels : Array.from(container.querySelectorAll('label'))
    };
});

test.each(jest26CompatibleTable(filterTestTable(labelInputTests)))('%s', async (name, {field, expects}) => {
    //expects(await helper(field));
    expects(await helper(field));
});

test('option selected by user is set in the model', async () => {
    const f = {
        ...field
    };
    f.value = undefined;
    const {inputs, element} = await helper(f);
    let state = element?.getState();
    expect(state.value).toBeUndefined();
    userEvent.click(inputs[0]);
    state = element?.getState();
    expect(state.value).toEqual(true);
    expect(inputs[0]?.checked).toEqual(true);
    expect(inputs[1]?.checked).toEqual(false);
    userEvent.click(inputs[1]);
    state = element?.getState();
    expect(state.value).toEqual(false);
    expect(inputs[0]?.checked).toEqual(false);
    expect(inputs[1]?.checked).toEqual(true);
});

test('it should handle visible property', async () => {
    const f = {
        ...field,
        'visible' : false
    };

    const {container} = await helper(f);
    expect(container?.innerHTML).toContain('display: none;');

    const x = await helper(field);
    expect(x.container?.innerHTML).not.toContain('display: none;');
});

test('help text content changes when field becomes invalid', async () => {
    const f = {
        ...field,
        description: 'some description',
        'required' : true
    };

    const {container, element} = await helper(f);
    const err = container?.querySelector('.formField__helpText');
    // @ts-ignore
    expect(err.textContent).toEqual('some description');

    element.value = true;
    // @ts-ignore
    expect(err.textContent).toEqual('some description');

    element.value = null;
    // @ts-ignore
    expect(err.textContent).toEqual(DEFAULT_ERROR_MESSAGE);
});



test.todo('it should handle disable property');
test.todo('it should handle richTextTitle property');
test.todo('it should handle screenReaderText property');
test.todo('it should dispatch click event to controller');
