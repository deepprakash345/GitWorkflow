import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Date from '../../src/components/Date';
import { createForm, filterTestTable, InputFieldTestCase, Provider } from '../utils';

const field = {
  'id': 'field',
  'name': 'birthDate',
  'value': '02-02-2021',
  'label': { 'value': 'date' },
  'visible': true,
  'type': 'date'
};

export type FieldExpectType = (l: HTMLLabelElement | null, i: HTMLInputElement | null) => any

const labelInputTests: InputFieldTestCase<FieldExpectType>[] = [
  {
    name: 'field gets rendered without a provider',
    field: field,
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null) => {
      expect(label?.innerHTML).toEqual('date');
      expect(input?.getAttribute('name')).toEqual('birthDate');
      expect(input?.getAttribute('value')).toEqual('02-02-2021');
    }
  },
  {
    name: 'attribute type should be set to date for date input field',
    field: {
      ...field
    },
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null) => {
      expect(input?.getAttribute('type')).toEqual('date');
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
  }
];

test.each(filterTestTable(labelInputTests))('$name', async ({ field, expects }) => {
  const checkExpectations = ({ container }: RenderResult) => {
    const label = container.querySelector('label');
    const input = container.querySelector('input');
    expects(label, input);
  };
  const form = await createForm(field);
  const wrapper = Provider(form);
  const component = <Date {...field} />;
  checkExpectations(render(component, { wrapper }));
});

test('value entered by user in date field is set in model', async () => {
  const f = {
    ...field,
    'id': 'x'
  };
  const form = await createForm(f);
  const wrapper = Provider(form);
  const component = <Date {...form.getState().items[0]} />;
  const { container } = render(component, { wrapper });
  const input = container.querySelector('input');
  const inputValue = '02-02-2021';
  expect(input?.getAttribute('value')).toEqual(inputValue);
});

test('it should handle visible property', async () => {
  const f = {
    ...field,
    'id': 'x',
    'visible': false
  };

  const component = <Date {...f} />;
  const form = await createForm(field);
  const wrapper = Provider(form);
  const { container } = render(component, { wrapper });
  expect(container.innerHTML).toContain('display: none'); //todo: find a better check
});