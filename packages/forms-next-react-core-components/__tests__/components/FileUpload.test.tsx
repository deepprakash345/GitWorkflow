import React from 'react';
import {render} from '@testing-library/react';
import FileUpload from '../../src/components/FileUpload';
import userEvent from '@testing-library/user-event';
import {
    createForm,
    elementFetcher,
    filterTestTable,
    ignoredTestTable,
    InputFieldTestCase, jest26CompatibleTable,
    Provider,
    renderComponent
} from '../utils';
import {FieldJson} from '@aemforms/crispr-core/lib';
import {FileObject} from '@aemforms/crispr-core/lib/FileObject';

const fieldWithValueAndMaxFileSize = {
    'name': 'profile_image',
    'type': 'file',
    'maxFileSize': '5MB',
    'label': {
        'value': 'Profile Image'
    },
    'value': {
        'mediaType' : 'application/pdf',
        'name' : 'abc.pdf',
        'size' : 2891829,
        'data' : 'http://abc.com/abc.pdf'
    }
};

const field = {
    'name': 'profile',
    'format': 'data-url',
    'type': 'string',
    'maxFileSize': '8MB',
    'label': {
        'value': 'Profile'
    }
};

const fieldWithMultipleFiles = {
    'name': 'profiles',
    'format': 'data-url',
    'type': 'string[]',
    'maxFileSize': '10MB',
    'viewType': 'file-input',
    'label': {
        'value': 'Multiple Profile'
    },
    'value': [{
        'mediaType' : 'application/pdf',
        'name' : 'abc.pdf',
        'size' : 2891829,
        'data' : 'http://abc.com/abc.pdf'
    },{
        'mediaType' : 'application/pdf',
        'name' : 'def.pdf',
        'size' : 2891829,
        'data' : 'http://def.com/def.pdf'
    }]
};

export type FileUploadExpectType = (l: HTMLLabelElement | null, i: HTMLInputElement | null, c: HTMLElement | null) => any

const labelInputTests: InputFieldTestCase<FileUploadExpectType>[] = [
    {
        name : 'a file input should render with value',
        field : fieldWithValueAndMaxFileSize,
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null, container : HTMLElement | null) => {
            expect(label?.textContent).toEqual('Profile Image');
            expect(input?.getAttribute('name')).toEqual('profile_image');
            expect(container?.querySelector('.file-metadata')?.textContent).toEqual('abc.pdf2892 kb');
        }
    },
    {
        name: 'field gets rendered without a provider',
        field: fieldWithValueAndMaxFileSize,
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null, container : HTMLElement | null) => {
            expect(label?.textContent).toEqual('Profile Image');
            expect(input?.getAttribute('name')).toEqual('profile_image');
        }
    },
    {
        name : 'html in the label should be handled for non rich text label',
        field: {
            ...fieldWithValueAndMaxFileSize,
            'label' : {
                'value' : '<script>javascript</script><p>label inside p tags</p>'
            }
        },
        // eslint-disable-next-line no-unused-vars
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null, container : HTMLElement | null) => {
            expect(label?.innerHTML).toContain('&lt;script&gt;javascript&lt;/script&gt;' +
                '&lt;p&gt;label inside p tags&lt;/p&gt;');
        }
    },
    {
        name: 'labels and inputs are linked with for and id attribute',
        field: fieldWithValueAndMaxFileSize,
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null, container : HTMLElement | null) => {
            expect(input?.getAttribute('id')).toEqual(label?.getAttribute('for'));
        }
    },
    {
        name: 'labels and inputs are also linked with aria-labelledBy attribute',
        field: fieldWithValueAndMaxFileSize,
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement | null, container : HTMLElement | null) => {
            expect(label?.getAttribute('id')).toEqual(input?.getAttribute('aria-labelledBy'));
        }
    },
    {
        name: 'required attribute properly set for required field',
        field: {
            ...fieldWithValueAndMaxFileSize,
            'required' : true
        },
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null, container : HTMLElement | null) => {
            expect(input?.getAttribute('required')).toEqual('');
        }
    },
    {
        name: 'disabled attribute properly set for readonly field',
        field: {
            ...fieldWithValueAndMaxFileSize,
            'readOnly' : true
        },
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null, container : HTMLElement | null) => {
            expect(input?.getAttribute('disabled')).toEqual('');
        }
    },
    {
        name: 'accessibility attributes are properly set for required field',
        field: fieldWithValueAndMaxFileSize,
        x: true,
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null, container : HTMLElement | null) => {
            //expect(label?.getAttribute('id')).toEqual(input?.getAttribute('aria-labelledBy'));
        }
    },
    {
        name: 'accessibility attributes are properly set for required field',
        field: {
            ...fieldWithValueAndMaxFileSize,
            'required' : true
        },
        x :true,
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null, container : HTMLElement | null) => {
            expect(input?.getAttribute('aria-required')).toEqual('true');
        }
    },
    {
        name: 'label is null if label is marked as invisible in the field',
        field: {
            ...fieldWithValueAndMaxFileSize,
            'label' : {
                ...fieldWithValueAndMaxFileSize.label,
                visible: false
            }
        },
        // eslint-disable-next-line no-unused-vars
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement | null, container : HTMLElement | null) => {
            expect(label?.textContent).toEqual('');
        }
    },
    {
        name: 'input is marked as aria-invalid when the field is invalid',
        field: {
            ...field,
            'valid': false
        },
        x : true,
        expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null, container : HTMLElement | null) => {
            expect(input?.getAttribute('aria-invalid')).toBe('true');
        }
    },
    {
        name: 'input is not marked as aria-invalid when the field is valid',
        field: {
            ...field,
            'valid': true
        },
        expects: (label ?: HTMLLabelElement | null, input?: HTMLInputElement | null, container?: HTMLElement | null) => {
            expect(input?.getAttribute('aria-invalid')).toBeNull();
        }
    },
    {
        name: "input is not marked as aria-invalid when the field's valid state is undefined",
        field: fieldWithValueAndMaxFileSize,
        expects: (label ?: HTMLLabelElement | null, input?: HTMLInputElement | null, container?: HTMLElement | null) => {
            expect(input?.getAttribute('aria-invalid')).toBeNull();
        }
    },
    {
        name : 'a file input should have undefined files property set if value is set',
        field : fieldWithValueAndMaxFileSize,
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null, container : HTMLElement | null) => {
            expect(input?.files?.length).toEqual(0);
        }
    },
    {
        name : 'a file input should have undefined file property if data in value is set to web file API',
        field : {
            ...field,
            'value' : {
                'mediaType' : 'application/pdf',
                'name' : 'def.pdf',
                'size' : 2891829,
                'data' : new File([], 'def.pdf')
            }
        },
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null, container : HTMLElement | null) => {
            // @ts-ignore
            expect(input?.files?.length).toEqual(0);
            expect(container?.querySelector('.file-metadata')?.textContent).toEqual('def.pdf2892 kb');
        }
    },
    {
        name : 'a file input should have undefined files property if data in value is set to URL',
        field : {
            ...field,
            'value' : {
                'mediaType' : 'application/pdf',
                'name' : 'def.pdf',
                'size' : 2891829,
                'data' : 'http://def.com/def.pdf'
            }
        },
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null, container : HTMLElement | null) => {
            // @ts-ignore
            expect(input?.files?.length).toEqual(0);
            expect(container?.querySelector('.file-metadata')?.textContent).toEqual('def.pdf2892 kb');
        }
    },
    {
        name : 'a file input should not be set if data is not present',
        field : {
            'name': 'name',
            label : {
                value : 'name'
            },
            'visible' : true
        },
        expects: (label : HTMLLabelElement | null, input: HTMLInputElement|null, container : HTMLElement | null) => {
            expect(input?.files?.length).toEqual(0);
            expect(container?.querySelector('.file-metadata')?.textContent).toBeUndefined();
        }
    }
];

const helper = renderComponent(FileUpload, elementFetcher);

test.each(jest26CompatibleTable(filterTestTable(labelInputTests)))('%s', async (name, {field, expects}) => {
    //let x = await helper(field, false);
    //expects(x.label, x.input);
    let x = await helper(field);
    expects(x.label, x.input, x.container);
});

ignoredTestTable(labelInputTests).forEach((v) => {
    test.todo(v.name);
});

test('file input with type file[] or string[] should have correct data and model value', async () => {
    const f = {
        ...fieldWithMultipleFiles
    };

    const {input, form, element} = await helper(f);
    let data = form.exportData();
    expect(data.profiles).toEqual(['http://abc.com/abc.pdf', 'http://def.com/def.pdf']);
    let state = element?.getState();
    let value = state.value;
    expect(value).not.toBeUndefined();
    expect(value).toBeInstanceOf(Array);
    // @ts-ignore
    expect(value.length).toEqual(2);
    // @ts-ignore
    expect(value[0]).toBeInstanceOf(FileObject);
    let file = new File(['(⌐□_□)'], 'chucknorris.pdf', { type: 'application/pdf' });
    // simulate upload event
    userEvent.upload(input as HTMLInputElement, file);
    state = element?.getState();
    value = state.value;
    // @ts-ignore
    expect(value.length).toEqual(3);
    // @ts-ignore
    expect(value[2]).toBeInstanceOf(FileObject);
});

test('file input with type file should have correct data and model value', async () => {
    const f = {
        ...fieldWithValueAndMaxFileSize
    };

    const {input, form, element} = await helper(f);
    let data = form.exportData();
    expect(data.profile_image).toEqual({'data': 'http://abc.com/abc.pdf', 'mediaType': 'application/pdf', 'name': 'abc.pdf', 'size': 2891829});
    let state = element?.getState();
    let fieldJson = state;
    let value = fieldJson.value;
    expect(value).not.toBeUndefined();
    // @ts-ignore
    let controller = form?.getElement(fieldJson?.id);
    // in json, max file size is not serialized and is stored as a string
    expect(fieldJson.maxFileSize).toEqual('5MB');
    // in model, maxFileSize should be as number and in bytes so that it can be used in rules
    expect(controller.maxFileSize).toEqual(5242880);
    expect(value).toBeInstanceOf(FileObject);
});

test('file input with change in view should update model', async () => {
    const f = {
        ...field,
        required: true
    };

    const {input, form, element} = await helper(f);
    let file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    // in case of png this is called
    global.URL.createObjectURL = jest.fn();
    // simulate upload event
    userEvent.upload(input as HTMLInputElement, file);
    let state = element?.getState();
    expect(state.value).toBeInstanceOf(FileObject);
    // @ts-ignore
    expect(state.value?.data).toBeInstanceOf(File);
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    // check attachments which is to be sent during submit
    //@ts-ignore
    let attachments = form?.getState().attachments;
    expect(Object.keys(attachments).length).toEqual(1);
});

test.todo('file input with minItems');
test.todo('file input with maxItems');
test.todo('file input with multipleMaxFilSize');