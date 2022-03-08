import Flex from '../../src/components/flex/Flex';
import HorizontalFlex from '../../src/components/flex/HorizontalFlex';
import VerticalFlex from '../../src/components/flex/VerticalFlex';
import React from 'react';
import { render } from '@testing-library/react';
import { createForm, Provider } from '../utils';
import { jsonString } from '@aemforms/crispr-core';

const emptyFLex = {
  'id': 'emptyFlex',
  'visible': true,
  'label': { value: 'empty label' },
  'items': []
};

const flexWithData = {
  'id': 'flexWithData',
  ':type' : 'custom:flex',
  'visible': true,
  'label': { value: 'flex label' },
  'items': [
    {
      'id': 'field',
      'name': 'f1',
      'fieldType': 'text-field',
      ':type' : "text-field",
      'title': 'name',
      'visible': true,
      'label': { value: 'text field label' }
    },
    {
      'id': 'field',
      'name': 'f2',
      'fieldType': 'text-field',
      ':type' : "text-field",
      'title': 'name',
      'visible': true,
      'label': { value: 'text field label 2' }
    }
  ]
};

test('Flex should not rendered if item length is zero', () => {
  const { container } = render(<Flex {...emptyFLex} />);
  expect(container.innerHTML.length).toEqual(0);
});

test('Flex should not rendered if visible false', () => {
  const { container } = render(<Flex {...emptyFLex} visible={false} />);
  expect(container.innerHTML.length).toEqual(0);
});


test('Flex should get rendered if no mapping is defined', async () => {
  const form = await createForm(emptyFLex);
  const wrapper = Provider(form, {});
  const { container } = render(<Flex {...flexWithData} />, { wrapper });
  expect(container.innerHTML.length).toBeGreaterThan(0);
});

test('Flex children with mapping should render the mapped component', async () => {
  const MyComponent = () => {
    return <div>My Field</div>;
  };
  const form = await createForm(emptyFLex);
  const wrapper = Provider(form, { 'text-field': MyComponent });
  const { container } = render(<Flex {...flexWithData} />, { wrapper });
  var expected = '<div><h4>Undefined Element</h4><pre>' + jsonString(flexWithData.items[0]) + '</pre></div>';
  expect(container.innerHTML).not.toContain(expected);
  expect(container.innerHTML).toContain('<div>My Field</div>');
});

test('Horizontal Flex children with mapping should render the mapped component', async () => {
  const MyComponent = () => {
    return <div>My Field</div>;
  };

  const form = await createForm(emptyFLex);
  const wrapper = Provider(form, { 'text-field': MyComponent });
  const { container } = render(<HorizontalFlex {...flexWithData} />, { wrapper });
  var expected = '<div><h4>Undefined Element</h4><pre>' + jsonString(flexWithData.items[0]) + '</pre></div>';
  expect(container.innerHTML).not.toContain(expected);
  expect(container.innerHTML).toContain('<div>My Field</div>');
  expect(container.innerHTML).toContain('grid-template-columns: 50.00% 50.00%;');
});

test('Vertical Flex children with mapping should render the mapped component', async () => {
  const MyComponent = () => {
    return <div>My Field</div>;
  };

  const form = await createForm(emptyFLex);
  const wrapper = Provider(form, { 'text-field': MyComponent });
  const { container } = render(<VerticalFlex {...flexWithData} />, { wrapper });
  var expected = '<div><h4>Undefined Element</h4><pre>' + jsonString(flexWithData.items[0]) + '</pre></div>';
  expect(container.innerHTML).not.toContain(expected);
  expect(container.innerHTML).toContain('<div>My Field</div>');
  expect(container.innerHTML).toContain('grid-template-columns: 100%;');
});