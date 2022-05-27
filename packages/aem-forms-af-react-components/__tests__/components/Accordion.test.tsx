/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

import Accordion from '../../src/components/Accordion';
import React from 'react';
import { render } from '@testing-library/react';
import { createForm, Provider } from '../utils';
import { jsonString } from '@adobe/aem-forms-af-core';

const emptyAccordion = {
  'id': 'emptyAccordion',
  'visible': true,
  'label': { value: 'empty label' },
  'items': []
};

const accordionWithData = {
  'id': 'accordionWithData',
  'visible': true,
  'label': { value: 'accordion label' },
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

test('Accordion should  rendered if item length is zero', () => {
  const { container } = render(<Accordion {...emptyAccordion} />);
  expect(container.innerHTML.length).toBeGreaterThan(0);
});

test('Accordion should not rendered if visible false', () => {
  const { container } = render(<Accordion {...emptyAccordion} visible={false} />);
  expect(container.innerHTML.length).toEqual(0);
});


test('Accordion should get rendered if no mapping is defined', async () => {
  const form = await createForm(emptyAccordion);
  const wrapper = Provider(form, {});
  const { container } = render(<Accordion {...accordionWithData} />, { wrapper });
  expect(container.innerHTML.length).toBeGreaterThan(0);
});

test('Accordion children with mapping should render the mapped component', async () => {
  const MyComponent = () => {
    return <div>My Field</div>;
  };

  const form = await createForm(emptyAccordion);
  const wrapper = Provider(form, { 'text-field': MyComponent });
  const { container } = render(<Accordion {...accordionWithData} />, { wrapper });
  var expected = '<div><h4>Undefined Element</h4><pre>' + jsonString(accordionWithData.items[0]) + '</pre></div>';
  expect(container.innerHTML).not.toContain(expected);
  expect(container.innerHTML).toContain('text field label');
});