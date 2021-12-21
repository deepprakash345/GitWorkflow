import Tabs from '../../src/components/Tabs';
import React from 'react';
import { render } from '@testing-library/react';
import { createForm, Provider } from '../utils';
import { jsonString } from '@aemforms/forms-next-core/lib/utils/JsonUtils';

const emptyTabs = {
  'id': 'emptyTabs',
  'visible': true,
  'label': { value: 'empty label' },
  'items': []
};

const tabsWithData = {
  'id': 'tabsWithData',
  'visible': true,
  'label': { value: 'tab label' },
  'items': [
    {
      'id': 'field',
      'name': 'f1',
      'viewType': 'text-field',
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

test('tabs children with mapping should render the mapped component', async () => {
  const MyComponent = () => {
    return <div>My Field</div>;
  };

  const form = await createForm(emptyTabs);
  const wrapper = Provider(form, { 'text-field': MyComponent });
  const { container } = render(<Tabs {...tabsWithData} />, { wrapper });
  var expected = '<div><h4>Undefined Element</h4><pre>' + jsonString(tabsWithData.items[0]) + '</pre></div>';
  expect(container.innerHTML).not.toContain(expected);
  expect(container.innerHTML).toContain('<div>My Field</div>');
});

test('vertical tabs children with mapping should render the mapped component', async () => {
  const MyComponent = () => {
    return <div>My Field</div>;
  };

  const form = await createForm(emptyTabs);
  const wrapper = Provider(form, { 'text-field': MyComponent });
  const tabProps = {
    ...tabsWithData,
    'props:orientation': 'vertical'
  };
  const { container } = render(<Tabs {...tabProps} />, { wrapper });
  var expected = '<div><h4>Undefined Element</h4><pre>' + jsonString(tabsWithData.items[0]) + '</pre></div>';
  expect(container.innerHTML).not.toContain(expected);
  expect(container.innerHTML).toContain('vertical');
});