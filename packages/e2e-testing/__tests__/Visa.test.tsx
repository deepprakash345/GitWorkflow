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

import { Action } from '@adobe/aem-forms-af-core';
import { renderComponent } from './utils';
// @ts-ignore
import formJson from '../../forms-headless-sample/public/examples/visa.form.json';

describe('Test Visa form', () => {
  let renderResponse: any, onInitialize: any, currentForm: any, container: any;

  beforeEach(() => {
    Object.defineProperty(window, 'screen', {
      writable: true,
      configurable: true,
      value: {
        width: 1000
      }
    });

    onInitialize = jest.fn().mockImplementation((action: Action) => {
      currentForm = action.target;
    })
    renderResponse = renderComponent({ formJson, onInitialize })
    container = renderResponse.container
  });

  test('Form should rendered', async () => {
    const form = container.querySelectorAll('form');
    expect(form.length).toEqual(1);
  });

  test('Should rendered all text inputs', async () => {
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toEqual(34);
  });

  test('Should rendered all checkbox inputs', async () => {
    const inputs = container.querySelectorAll('input[type="checkbox"]');
    expect(inputs.length).toEqual(16);
  });

  test('Should rendered all checkbox inputs', async () => {
    const inputs = container.querySelectorAll('input[type="checkbox"]');
    expect(inputs.length).toEqual(16);
  });

  test('Should not require all fields', async () => {
    const inputs = container.querySelectorAll('input[aria-required=true]');
    expect(inputs.length).toEqual(14);
  });

});

