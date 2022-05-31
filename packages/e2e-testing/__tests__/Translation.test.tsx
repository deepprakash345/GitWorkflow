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
import formJson from '../../forms-headless-sample/public/examples/person.form.json';
import localizationMessages from '../../forms-headless-sample/public/examples/generated/__localization__/person.i18n.json';

describe('Translation', () => {
  let renderResponse: any, onInitialize: any, currentForm: any;
  let container: any;

  beforeEach(async () => {
    onInitialize = jest.fn().mockImplementation((action: Action) => {
      currentForm = action.target;
    })
    renderResponse = renderComponent({ formJson, onInitialize, localizationMessages, locale: 'de-DE' });
    container = renderResponse.container;
  });

  test('Form should rendered', () => {
    const form = container.querySelectorAll('form');
    expect(form.length).toEqual(1);
  });

  test('Description of first name should render in de-DE', () => {
    expect(container.querySelector('form').innerHTML).toContain('Der Vorname der Person.');
    expect(container.querySelector('form').innerHTML).not.toContain("The person's first name.");
  });

  test('Description of last name should render in de-DE', () => {
    expect(container.querySelector('form').innerHTML).toContain('Der Nachname der Person.');
  });

  test('Description of full name should render in de-DE', () => {
    expect(container.querySelector('form').innerHTML).toContain('Der vollständige Name der Person');
  });

});