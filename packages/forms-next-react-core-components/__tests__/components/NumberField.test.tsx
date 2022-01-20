import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import NumberField from '../../src/components/NumberField';
import {createForm, elementFetcher, filterTestTable, InputFieldTestCase, Provider, renderComponent} from '../utils';
import userEvent from '@testing-library/user-event';
import { FieldJson } from '@aemforms/forms-next-core/lib';
import {FieldExpectType} from './TextField.test';
import Date from '../../src/components/Date';

const field = {
  'name': 'birthYear',
  'value': '1992',
  'label': {
    'value': 'birthYear'
  },
  'visible': true
};


const labelInputTests: InputFieldTestCase<FieldExpectType>[] = [
  {
    name: 'field gets rendered without a provider',
    field: field,
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null) => {
      expect(label?.innerHTML).toEqual('birthYear');
      expect(input?.value).toEqual('1,992');
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
      const err = container.querySelector('.field-errorMessage');
      expect(err).not.toBeNull();
      //@ts-ignore
      expect(err.textContent).toEqual('there is an error in the field');
    }
  },
  {
    name: 'error message doesn\'t exists when there is no error',
    field: {
      ...field,
      'valid': false
    },
    expects: (label : HTMLLabelElement | null, input : HTMLInputElement | null, container: HTMLElement) => {
      const err = container.querySelector('.field-errorMessage');
      expect(err).toBeNull();
    }
  }
];

const helper = renderComponent(NumberField, elementFetcher);


test.each(filterTestTable(labelInputTests))('$name', async ({ field, expects }) => {
  let x = await helper(field);
  expects(x.label, x.input, x.container);
});

test('value entered by user in number field is set in model', async () => {
  const f = {
    ...field,
    'id': 'x'
  };
  const { input, form } = await helper(f);
  // @ts-ignore
  userEvent.clear(input);
  const inputValue = '1992';
  // @ts-ignore
  userEvent.type(input, inputValue);
  expect((form?.items[0] as FieldJson).value).toEqual(inputValue);
  expect(input?.value).toEqual(inputValue);

});

//test.todo('it should handle readOnly property');
test('it should handle visible property', async () => {
  const f = {
    ...field,
    'id': 'x',
    'visible': false
  };
  const { container } = await helper(f);
  expect(container.innerHTML).toContain('display: none'); //todo: find a better check
});
