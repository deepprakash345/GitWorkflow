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
import formJson from '../../forms-headless-sample/public/examples/bank.form.json';

describe('Test Bank form', () => {
  let renderResponse: any, onInitialize: any, currentForm: any;
  let container: any;

  beforeEach(() => {
    onInitialize = jest.fn().mockImplementation((action: Action) => {
      currentForm = action.target;
    })
    renderResponse = renderComponent({ formJson, onInitialize });
    container = renderResponse.container;
  });

  test('Form should rendered', () => {
    const form = container.querySelectorAll('form');
    expect(form.length).toEqual(1);
  });

  test('Form should rendered card option (Debit/credit/forex Card)', () => {
    const { container } = renderResponse
    const radios = container.querySelectorAll('input[name="cardOptions"]');
    expect(radios.length).toEqual(3);
  });

  test('should not render card number fields', () => {
    const input = container.querySelector('input[name="cardNumber"]') as HTMLInputElement
    expect(input).toEqual(null);
  });

  test('Should test cardOptions field with debit card & card type', () => {

    const cardOptions = container.querySelectorAll('input[name="cardOptions"]')[0] as HTMLInputElement;
    userEvent.click(cardOptions);
    expect(currentForm.getState().items[0].value).toEqual('1');
    expect(cardOptions.value).toEqual('1')

    expect(container.querySelector('input[name="cardNumber"]')).toEqual(null);

    const cardType = container.querySelectorAll('input[name="cardType"]')[0] as HTMLInputElement;
    userEvent.click(cardType);
    expect(currentForm.getState().items[1].value).toEqual('1');
    expect(cardType.value).toEqual('1')

    expect(container.querySelector('input[name="cardNumber"]')).not.toEqual(null);
  });

  test('Should test cardOptions field with credit card', () => {

    const cardOptions = container.querySelectorAll('input[name="cardOptions"]')[1] as HTMLInputElement;
    userEvent.click(cardOptions);
    expect(currentForm.getState().items[0].value).toEqual('2');
    expect(cardOptions.value).toEqual('2');

    expect(container.querySelector('input[name="cardNumber"]')).not.toEqual(null);
  });

});