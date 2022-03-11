import userEvent from '@testing-library/user-event';
import { Action } from '@aemforms/forms-core';
import { renderComponent } from './utils';
import formJson from '../../../docs/examples/bank.form.json';

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