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
import { renderComponent } from './utils';
import formJson from '../../forms-headless-sample/public/examples/loan.form.json';

describe('Test contactUs form', () => {
  let renderResponse: any;
  let textFields: any = {};

  beforeEach(() => {

    Object.defineProperty(window, 'screen', {
      writable: true,
      configurable: true,
      value: {
        width: 1000
      }
    });
    renderResponse = renderComponent({ formJson })
    const { container } = renderResponse;
    textFields = {
      province: container.querySelector('input[name="province"]') as HTMLInputElement,
      district: container.querySelector('input[name="district"]') as HTMLInputElement,
      branch: container.querySelector('input[name="branch"]') as HTMLInputElement
    }
  });

  test('Form should rendered', async () => {
    const { container } = renderResponse;
    const form = container.querySelectorAll('form');
    expect(form.length).toEqual(1);
  });

  describe('Should test show/hide field', () => {

    test('province field have empty value', async () => {
      expect(textFields['province'].value).toEqual('');
    });

    test('district field have empty value', async () => {
      expect(textFields['district'].value).toEqual('');
    });

    test('branch field have empty value', async () => {
      expect(textFields['branch'].value).toEqual('');
    });

    test('Set province field value', async () => {
      userEvent.type(textFields['province'], 'DL');
      expect(textFields['province'].value).toEqual('DL');
    });

    test('Set district field value', async () => {
      userEvent.type(textFields['district'], 'A');
      expect(textFields['district'].value).toEqual('A');
    });

    test('Set branch field value', async () => {
      userEvent.type(textFields['branch'], 'X');
      expect(textFields['branch'].value).toEqual('X');
    });

    test('district field should empty if change province field', async () => {
      userEvent.type(textFields['province'], 'DL');
      expect(textFields['district'].value).toEqual('');
    });

    test('branch field should empty if change district field', async () => {
      userEvent.type(textFields['province'], 'DL');
      userEvent.type(textFields['district'], 'Y');
      expect(textFields['branch'].value).toEqual('');
    });

  });

});