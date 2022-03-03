import React from 'react';
import Password from '../../src/components/Password';
import {
  elementFetcher,
  filterTestTable,
  InputFieldTestCase,
  jest26CompatibleTable,
  renderComponent
} from '../utils';
import { FieldExpectType } from './TextField.test';
import userEvent from '@testing-library/user-event';
import { DEFAULT_ERROR_MESSAGE } from './RadioButtonGroup.test';

const field = {
  'id': 'field',
  'name': 'password',
  'label': { 'value': 'password label' },
  'visible': true,
  'type': 'string',
  'fieldType': 'password-input'
};

const labelInputTests: InputFieldTestCase<FieldExpectType>[] = [
  {
    name: 'field gets rendered without a provider',
    field: field,
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null) => {
      expect(label?.innerHTML).toEqual('password label');
      expect(input?.getAttribute('name')).toEqual('password');
      expect(input?.getAttribute('value')).toEqual('');
    }
  },
  {
    name: 'attribute type should be set to password for password input field',
    field: {
      ...field
    },
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null) => {
      expect(input?.getAttribute('type')).toEqual('password');
    }
  },
  {
    name: 'labels and inputs are linked with for and id attribute',
    field: field,
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null) => {
      expect(input?.getAttribute('id')).toEqual(label?.getAttribute('for'));
    }
  },
  {
    name: 'labels and inputs are also linked with aria-labelledBy attribute',
    field: field,
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null) => {
      expect(label?.getAttribute('id')).toEqual(input?.getAttribute('aria-labelledBy'));
    }
  },
  {
    name: 'accessibility attributes are properly set for required field',
    field: field,
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null) => {
      expect(label?.getAttribute('id')).toEqual(input?.getAttribute('aria-labelledBy'));
    }
  },
  {
    name: 'accessibility attributes are properly set for required field',
    field: {
      ...field,
      'required': true
    },
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null) => {
      expect(input?.getAttribute('aria-required')).toEqual('true');
    }
  },
  {
    name: 'label is null if title is marked as hidden in the field',
    field: {
      ...field,
      label: {
        ...field.label,
        visible: false
      }
    },
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null) => {
      expect(label).toBeNull();
    }
  },
  {
    name: 'aria-label property is present if label is hidden',
    field: {
      ...field,
      'label': {
        ...field.label,
        visible: false
      }
    },
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null) => {
      expect(input?.getAttribute('aria-label')).toEqual(field.label.value);
    }
  },
  {
    name: 'input is marked as aria-invalid when the field is invalid',
    field: {
      ...field,
      'valid': false
    },
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null) => {
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    }
  },
  {
    name: 'input is not marked as aria-invalid when the field is valid',
    field: {
      ...field,
      'valid': true
    },
    expects: (label?: HTMLLabelElement | null, input?: HTMLInputElement | null) => {
      expect(input?.getAttribute('aria-invalid')).toBeNull();
    }
  },
  {
    name: "input is not marked as aria-invalid when the field's valid state is undefined",
    field,
    expects: (label?: HTMLLabelElement | null, input?: HTMLInputElement | null) => {
      expect(input?.getAttribute('aria-invalid')).toBeNull();
    }
  },
  {
    name: 'description exists when the field is valid',
    field: {
      ...field,
      'valid': true,
      'description': 'some description'
    },
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null, container: HTMLElement) => {
      //@ts-ignore
      expect(container.textContent).toContain('some description');
    }
  },
  {
    name: 'error message element exists when the field is invalid',
    field: {
      ...field,
      'valid': false,
      'errorMessage': 'there is an error in the field'
    },
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null, container: HTMLElement) => {
      expect(container.textContent).toContain('there is an error in the field');
    }
  },
  {
    name: 'error message doesn\'t exists when there is no error',
    field: {
      ...field,
      'valid': true,
      'errorMessage': DEFAULT_ERROR_MESSAGE
    },
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null, container: HTMLElement) => {
      expect(container.textContent).not.toContain(DEFAULT_ERROR_MESSAGE);
    }
  }
];

const helper = renderComponent(Password, elementFetcher);

test.each(jest26CompatibleTable(filterTestTable(labelInputTests)))('%s', async (name, { field, expects }) => {
  //let x = await helper(field, false);
  //expects(x.label, x.input);
  let x = await helper(field);
  expects(x.label, x.input, x.container);
});

test('value entered by user in password field is set in model', async () => {
  const f = {
    ...field,
    'id': 'x'
  };
  let { input, element } = await helper(f);
  const inputValue = 'welcome';
  //@ts-ignore
  userEvent.type(input, inputValue);
  expect(element.value).toEqual(inputValue);
});

test('it should handle visible property', async () => {
  const f = {
    ...field,
    'id': 'x',
    'visible': false
  };
  let { container } = await helper(f);
  expect(container.innerHTML).toContain('display: none'); //todo: find a better check
});

test('help text content changes when field becomes invalid', async () => {
  const f = {
    ...field,
    description: 'some description',
    'required': true,
    default: 'password'
  };

  const { container, input } = await helper(f);

  expect(container.textContent).toContain('some description');
  expect(container.textContent).not.toContain(DEFAULT_ERROR_MESSAGE);
  // @ts-ignore
  userEvent.clear(input);
  expect(container.textContent).toContain(DEFAULT_ERROR_MESSAGE);
  expect(container.textContent).not.toContain('some description');
  // @ts-ignore
  userEvent.type(input, 'welcome');
  // @ts-ignore
  expect(container.textContent).toContain('some description');
  expect(container.textContent).not.toContain(DEFAULT_ERROR_MESSAGE);
});