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

import userEvent from '@testing-library/user-event';
import { Action } from '@adobe/aem-forms-af-core';
import { renderComponent } from './utils';
import formJson from '../../../docs/examples/dependents.form.json';

describe('Test dependents form', () => {
  let renderResponse: any, onInitialize: any, currentForm: any;
  let container: any;

  beforeEach(() => {
    onInitialize = jest.fn().mockImplementation((action: Action) => {
      currentForm = action.target;
    })
    renderResponse = renderComponent({ formJson, onInitialize })
    container = renderResponse.container;
  });

  test('Form should rendered', async () => {
    const { container } = renderResponse;
    const form = container.querySelectorAll('form');
    expect(form.length).toEqual(1);
  });

  test('Dependents(number of dependents) field should rendered', async () => {
    const { getByLabelText } = renderResponse;
    const input = getByLabelText('number of dependents');
    expect(input).not.toEqual(null);
  });

  test('Only one dependent(Dependent Name) field renderd  ', async () => {
    const labels = Array.from(container.querySelectorAll('label')).filter((label: any) => label.innerHTML === 'Dependent Name')
    expect(labels.length).toEqual(1);
  });

  test('Should not add more items', () => {
    const labels = Array.from(container.querySelectorAll('label')).filter((label: any) => label.innerHTML.includes('Dependent Name'));
    expect(labels.length).toEqual(1);

    const button = Array.from(container.querySelectorAll('button')).filter((button: any) => button.innerHTML.includes('Add Dependent'))[0] as HTMLButtonElement;
    userEvent.click(button);

    const updatedLabels = Array.from(container.querySelectorAll('label')).filter((label: any) => label.innerHTML.includes('Dependent Name'));
    expect(updatedLabels.length).toEqual(1);
  })

  test('Should test add more dependent fields', () => {
    const input = container.querySelector('input[inputmode="numeric"]') as HTMLInputElement;
    userEvent.type(input, '2');
    userEvent.tab();
    expect(container.querySelector('input[inputmode="numeric"]').value).toEqual('2');
    expect(currentForm.getState().items[0].value).toEqual(2);

    const button = Array.from(container.querySelectorAll('button')).filter((button: any) => button.innerHTML.includes('Add Dependent'))[0] as HTMLButtonElement;
    userEvent.click(button);
    const updatedLabels = Array.from(container.querySelectorAll('label')).filter((label: any) => label.innerHTML.includes('Dependent Name'));
    expect(updatedLabels.length).toEqual(2);
  });

  test('Dependent fields should not exceed 3', () => {
    const input = container.querySelector('input[inputmode="numeric"]') as HTMLInputElement;
    userEvent.type(input, '3');
    userEvent.tab();
    expect(container.querySelector('input[inputmode="numeric"]').value).toEqual('3');
    expect(currentForm.getState().items[0].value).toEqual(3);

    const button = Array.from(container.querySelectorAll('button')).filter((button: any) => button.innerHTML.includes('Add Dependent'))[0] as HTMLButtonElement;
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    const updatedLabels = Array.from(container.querySelectorAll('label')).filter((label: any) => label.innerHTML.includes('Dependent Name'));
    expect(updatedLabels.length).toEqual(3);
  });

  test('Should test remove dependent fields', () => {
    let updatedLabels = [];
    const input = container.querySelector('input[inputmode="numeric"]') as HTMLInputElement;
    userEvent.type(input, '2');
    userEvent.tab();
    expect(container.querySelector('input[inputmode="numeric"]').value).toEqual('2');
    expect(currentForm.getState().items[0].value).toEqual(2);

    // add fields
    const button = Array.from(container.querySelectorAll('button')).filter((button: any) => button.innerHTML.includes('Add Dependent'))[0] as HTMLButtonElement;
    userEvent.click(button);
    updatedLabels = Array.from(container.querySelectorAll('label')).filter((label: any) => label.innerHTML.includes('Dependent Name'));
    expect(updatedLabels.length).toEqual(2);

    // remove fields
    const removeButton = container.querySelector('button') as HTMLButtonElement;
    userEvent.click(removeButton);
    updatedLabels = Array.from(container.querySelectorAll('label')).filter((label: any) => label.innerHTML.includes('Dependent Name'));
    expect(updatedLabels.length).toEqual(1);

  });

});