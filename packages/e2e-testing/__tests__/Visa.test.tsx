import { Action } from '@aemforms/forms-core';
import { renderComponent } from './utils';
import formJson from '../../../docs/examples/visa.form.json';

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

