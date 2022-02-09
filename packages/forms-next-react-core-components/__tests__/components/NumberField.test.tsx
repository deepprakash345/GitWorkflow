import React from 'react';
import NumberField from '../../src/components/NumberField';
import {
  elementFetcher,
  filterTestTable,
  InputFieldTestCase,
  jest26CompatibleTable,
  renderComponent
} from '../utils';
import userEvent from '@testing-library/user-event';
import { FieldJson } from '@aemforms/forms-next-core/lib';
import {FieldExpectType} from './TextField.test';
import {DEFAULT_ERROR_MESSAGE} from './RadioButtonGroup.test';

const field = {
  'name': 'birthYear',
  'default': '1992',
  'label': {
    'value': 'birthYear'
  },
  type: 'number',
  viewType: 'number-input',
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
    name: 'default value is honored',
    field: field,
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null) => {
      expect(input?.value).toEqual('1,992');
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
  }];

const helper = renderComponent(NumberField, elementFetcher);


test.each(jest26CompatibleTable(filterTestTable(labelInputTests)))('%s', async (name, { field, expects }) => {
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

test('help text content changes when field becomes invalid', async () => {
  const f = {
    ...field,
    description: 'some description',
    'required' : true
  };

  const {container, input, element} = await helper(f);

  // @ts-ignore
  expect(container.textContent).toContain('some description');
  expect(container.textContent).not.toContain(DEFAULT_ERROR_MESSAGE);
  // @ts-ignore
  userEvent.clear(input);
  // input type=number doesn't trigger change event on type, so tab out to trigger the change event.
  //https://github.com/testing-library/user-event/issues/411#issuecomment-727081538
  userEvent.tab();
  // @ts-ignore
  expect(container.textContent).toContain(DEFAULT_ERROR_MESSAGE);
  expect(container.textContent).not.toContain('some description');
  // @ts-ignore
  userEvent.type(input, '1234');
  userEvent.tab();
  // @ts-ignore
  expect(container.textContent).toContain('some description');
  expect(container.textContent).not.toContain(DEFAULT_ERROR_MESSAGE);
});