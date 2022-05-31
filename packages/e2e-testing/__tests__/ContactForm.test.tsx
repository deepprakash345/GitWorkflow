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
import formJson from '../../forms-headless-sample/public/examples/contact-us.form.json';

describe('Test contactUs form', () => {
  let renderResponse: any, onInitialize: any, currentForm: any;

  beforeEach(() => {
    onInitialize = jest.fn().mockImplementation((action: Action) => {
      currentForm = action.target;
    })
    renderResponse = renderComponent({ formJson, onInitialize })
  });

  test('Form should rendered', () => {
    const { container } = renderResponse;
    const form = container.querySelectorAll('form');
    expect(form.length).toEqual(1);
  });

  test('Should rendere all fields', () => {
    const { container } = renderResponse;
    const form = container.querySelector('form');
    expect(form.childNodes.length).toEqual(8);
  });

  describe('Render in same order', () => {
    let formChild: any, state: any;
    beforeEach(() => {
      const { container } = renderResponse;
      formChild = container.querySelector('form').childNodes;
      state = currentForm.getState();
    });

    test('have same length in dom and state', () => {
      expect(formChild.length).toEqual(state.items.length);
    });

    test('check checkbox postion', () => {
      const { getByLabelText } = renderResponse;
      const checkbox = getByLabelText('Remain Anonymous');
      expect(checkbox).not.toEqual(null);
    });

    test('check textarea postion', () => {
      const textarea = formChild[6].querySelector('textarea');
      expect(textarea.name).toEqual(state.items[6].name);
    });

    test('check button postion', () => {
      expect(formChild[7].type).toEqual(state.items[7].fieldType);
    });

  });

});