import { Action } from '@aemforms/forms-core';
import { renderComponent } from './utils';
import formJson from '../../../docs/examples/person.form.json';
import localizationMessages from '../../../docs/examples/generated/__localization__/person.i18n.json';

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