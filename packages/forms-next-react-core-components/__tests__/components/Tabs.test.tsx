import Tabs from '../../src/components/tabs/Tabs';
import VerticalTab from '../../src/components/tabs/VerticalTabs';
import HorizontalTab from '../../src/components/tabs/HorizontalTabs';
import React from 'react';
import { render } from '@testing-library/react';
import { createForm, Provider } from '../utils';
import { jsonString } from '@aemforms/crispr-core;

const emptyTabs = {
  'id': 'emptyTabs',
  ':type' : "custom:tabs",
  'visible': true,
  'label': { value: 'empty label' },
  'items': []
};

const tabsWithData = {
  'id': 'tabsWithData',
  ':type' : "custom:tabs",
  'visible': true,
  'label': { value: 'tab label' },
  'items': [
    {
      'id': 'field',
      'name': 'f1',
      'fieldType': 'text-field',
      ':type' : "text-field",
      'title': 'name',
      'visible': true,
      'label': { value: 'text field label' }
    }
  ]
};

test('Tabs should not rendered if item length is zero', () => {
  const { container } = render(<Tabs {...emptyTabs} />);
  expect(container.innerHTML.length).toEqual(0);
});

test('Tabs should not rendered if visible false', () => {
  const { container } = render(<Tabs {...emptyTabs} visible={false} />);
  expect(container.innerHTML.length).toEqual(0);
});


test('tabs should get rendered if no mapping is defined', async () => {
  const form = await createForm(emptyTabs);
  const wrapper = Provider(form, {});
  const { container } = render(<Tabs {...tabsWithData} />, { wrapper });
  expect(container.innerHTML.length).toBeGreaterThan(0);
});

test('horizontal tabs children with mapping should render the mapped component', async () => {
  const MyComponent = () => {
    return <div>My Field</div>;
  };

  const form = await createForm(emptyTabs);
  const wrapper = Provider(form, { 'text-field': MyComponent });
  const { container } = render(<HorizontalTab {...tabsWithData} />, { wrapper });
  var expected = '<div><h4>Undefined Element</h4><pre>' + jsonString(tabsWithData.items[0]) + '</pre></div>';
  expect(container.innerHTML).not.toContain(expected);
  expect(container.innerHTML).toContain('<div>My Field</div>');
  expect(container.innerHTML).toContain('aria-orientation="horizontal"');
});

test('vertical tabs children with mapping should render the mapped component', async () => {
  const MyComponent = () => {
    return <div>My Field</div>;
  };

  const form = await createForm(emptyTabs);
  const wrapper = Provider(form, { 'text-field': MyComponent });
  const { container } = render(<VerticalTab {...tabsWithData} />, { wrapper });
  var expected = '<div><h4>Undefined Element</h4><pre>' + jsonString(tabsWithData.items[0]) + '</pre></div>';
  expect(container.innerHTML).not.toContain(expected);
  expect(container.innerHTML).toContain('aria-orientation="vertical"');
});