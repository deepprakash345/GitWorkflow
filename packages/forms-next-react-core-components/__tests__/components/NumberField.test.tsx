import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import NumberField from '../../src/components/NumberField';
import { createForm, filterTestTable, InputFieldTestCase, Provider } from '../utils';
import userEvent from '@testing-library/user-event';
import { FieldJson } from '@aemforms/forms-next-core/lib';

const field = {
  'name': 'birthYear',
  'value': '1992',
  'label': {
    'value': 'birthYear'
  },
  'visible': true
};


export type FieldExpectType = (l: HTMLLabelElement | null, i: HTMLInputElement | null) => any

const labelInputTests: InputFieldTestCase<FieldExpectType>[] = [
  {
    name: 'field gets rendered without a provider',
    field: field,
    expects: (label: HTMLLabelElement | null, input: HTMLInputElement | null) => {
      expect(label?.innerHTML).toEqual('birthYear');
      expect(input?.value).toEqual('1,992');
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
  const component = <NumberField {...field} />;
  checkExpectations(render(component, { wrapper }));
});

test('value entered by user in number field is set in model', async () => {
  const f = {
    ...field,
    'id': 'x'
  };
  const form = await createForm(f);
  const wrapper = Provider(form);
  const component = <NumberField {...form?.items[0]} />;
  const { container } = render(component, { wrapper });
  const input = container.querySelector('input');
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

  const component = <NumberField {...f} />;
  const form = await createForm(field);
  const wrapper = Provider(form);
  const { container } = render(component, { wrapper });
  expect(container.innerHTML).toContain('display: none'); //todo: find a better check
});
