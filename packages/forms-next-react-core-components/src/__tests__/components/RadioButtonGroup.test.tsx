import React from 'react';
import {render} from '@testing-library/react';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import {createForm, filterTestTable, InputFieldTestCase, Provider} from '../utils';
import userEvent from '@testing-library/user-event';
import {FieldJson} from '@adobe/forms-next-core/lib';
import Form from '@adobe/forms-next-core/lib/Form';

const field : FieldJson = {
    ':id' : 'field',
    ':name': 'EmploymentStatus',
    ':value': true,
    ':visible' : true,
    ':title': 'Are you Employed',
    ':constraints' : {
        ':options' : [{
            ':value' : true,
            ':text' : 'Yes'
        }, {
            ':value' : false,
            ':text' : 'No'
        }]
    }
};

type Input = {labels: HTMLLabelElement[],
    inputs: HTMLInputElement[],
    group: Element | null,
    container: Element | null}

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
        name : 'html in the title should be handled for non rich text title',
        field: {
            ...field,
            ':title' : '<script>javascript</script><p>title inside p tags</p>'
        },
        expects: ({group}) => {
            expect(group?.innerHTML).toContain('&lt;script&gt;javascript&lt;/script&gt;' +
                '&lt;p&gt;title inside p tags&lt;/p&gt;');
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
            ':constraints': {
                ...field[':constraints'],
                ':required': true
            }
        },
        expects: ({group}) => {
            expect(group?.getAttribute('aria-required')).toEqual('true');
        }
    },
    {
        name: 'label is empty if title is marked as hidden in the field',
        field: {
            ...field,
            ':hideTitle': true
        },
        expects: ({group}) => {
            expect(group?.textContent).not.toContain('Are you Employed');
        }
    },
    {
        name: 'input is marked as aria-invalid when the field is invalid',
        field: {
            ...field,
            ':valid': false
        },
        expects: ({group}) => {
            expect(group?.getAttribute('aria-invalid')).toBe('true');
        }
    },
    {
        name: 'input is not marked as aria-invalid when the field is valid',
        field: {
            ...field,
            ':valid': true
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
            ':value' : false
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
            ':value' : null
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
            ':value' : 'some other option',
            ':constraints' : {
                ':options' : [
                    {
                        ':value' : 'option 1',
                        ':text' : 'option 1'
                    },
                    {
                        ':value' : 'option 2',
                        ':text' : 'option 2'
                    }
                ]
            }
        },
        expects: ({inputs}) => {
            expect(inputs[0]?.checked).toEqual(false);
            expect(inputs[0]?.value).toEqual('option 1');
            expect(inputs[1]?.checked).toEqual(false);
            expect(inputs[1]?.value).toEqual('option 2');
        }
    }
];

type Result = Input & {
    form?: Form,
}

const helper = async (field : any, useProvider = true) : Promise<Result> => {
    const component = <RadioButtonGroup {...field} />;
    let container, form;
    if (useProvider) {
        form = await createForm(field);
        const wrapper = Provider(form);
        container = render(component, {wrapper}).container;
    } else {
        container = render(component).container;
    }
    const group = container.querySelector('[role="radiogroup"]');
    const inputs = Array.from(container.querySelectorAll('input'));
    const labels = Array.from(container.querySelectorAll('label'));
    return {
        inputs,
        labels,
        container,
        group,
        form
    };
};

test.each(filterTestTable(labelInputTests))('$name', async ({field, expects}) => {
    expects(await helper(field));
    expects(await helper(field, true));
});

test('option selected by user is set in the model', async () => {
    const f = {
        ...field,
        ':id' : field[':name']
    };
    f[':value'] = undefined;
    const {inputs, form} = await helper(f);
    let state = form?.getState();
    expect((state?.[':items'].EmploymentStatus as FieldJson)[':value']).toBeUndefined();
    userEvent.click(inputs[0]);
    state = form?.getState();
    expect((state?.[':items'].EmploymentStatus as FieldJson)[':value']).toEqual(true);
    expect(inputs[0]?.checked).toEqual(true);
    expect(inputs[1]?.checked).toEqual(false);
    userEvent.click(inputs[1]);
    state = form?.getState();
    expect((state?.[':items'].EmploymentStatus as FieldJson)[':value']).toEqual(false);
    expect(inputs[0]?.checked).toEqual(false);
    expect(inputs[1]?.checked).toEqual(true);
});

test('it should handle visible property', async () => {
    const f = {
        ...field,
        ':visible' : false
    };

    const {inputs, container} = await helper(f);
    expect(container?.innerHTML).toEqual('');
    expect(inputs.length).toEqual(0);
});


test.todo('it should handle disable property');
test.todo('it should handle richTextTitle property');
test.todo('it should handle screenReaderText property');
test.todo('it should dispatch click event to controller');
