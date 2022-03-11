import { Action } from '@aemforms/forms-core';
import { renderComponent } from './utils';
import formJson from '../../../docs/examples/contact-us.form.json';

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