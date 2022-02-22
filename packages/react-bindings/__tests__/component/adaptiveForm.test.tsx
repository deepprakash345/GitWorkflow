import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldsetJson, FormJson, State, Action } from '@aemforms/crispr-core';
import { AdaptiveForm, useRuleEngine } from '../../src';

const formJson: FormJson = {
  "items": [
    {
      "name": "textInput",
      "label": {
        "value": "Text input"
      },
      "type": "string",
      "viewType": "text-input",
      "placeholder": "Please enter text",
      "required": true,
      "events": {
        "change": "dispatch_event($form, 'custom:textChange', $event.payload)"
      }
    },
    {
      "viewType": "button",
      "label": {
        "value": "submit"
      },
      "events": {
        "click": "submit_form()"
      }
    }
  ]
}
const InputField = (fieldset: State<FieldsetJson>) => {
  const [props, handler] = useRuleEngine(fieldset);
  return <div className="t-field">
    <label className="t-field-label" htmlFor="textInput" data-testid="labelId">Text input</label>
    <input className="t-field-input" data-testid="textInput" onInput={handler.dispatchChange}
      type="text" id="textInput" value={props.value} required name="textInput" placeholder="text" />
  </div>
}
const Button = (fieldset: State<FieldsetJson>) => {
  const [props] = useRuleEngine(fieldset);
  return <button className="t-button" type="button" data-testid="buttonID" onClick={props.onClick}>submit</button>
}
const mappings = {
  'text-input': InputField,
  'button': Button
}

describe('AF super component test cases', () => {
  let initializeHandler: any, submitHandler: any, renderResponse: any, changeHandler: any;
  let customEvents: any;
  let currentForm: any, fieldChangeSet: any, customEventPayload: any;
  beforeEach(() => {
    initializeHandler = jest.fn().mockImplementation((action: Action) => {
      currentForm = action;
    })
    submitHandler = jest.fn();
    changeHandler = jest.fn().mockImplementation((action: Action) => {
      fieldChangeSet = action.payload;
    });
    customEvents = jest.fn().mockImplementation((action: Action) => {
      customEventPayload = action.payload;
    });
    renderResponse = render(<AdaptiveForm
      mappings={mappings} formJson={formJson} locale='en'
      onInitialize={initializeHandler}
      onSubmit={submitHandler}
      onFieldChanged={changeHandler}
      onTextChange={customEvents}
    />);
  })

  test('AdaptiveForm should rendered', () => {
    const { container } = renderResponse;
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  test('Should call onInitialize method on rendering', () => {
    expect(initializeHandler).toHaveBeenCalledTimes(1);
  });
  test('Should not call onSubmit method on rendering', () => {
    expect(submitHandler).not.toHaveBeenCalled();
  });

  test('Should test- initializeHandler paylaod', async () => {
    expect(typeof currentForm).toEqual('object');
    const key = Object.keys(currentForm);
    expect(key).toEqual(['type', 'target', 'payload', 'metadata', 'isCustomEvent']);
  });

  test('Should render all child', async () => {
    const { container } = renderResponse;
    const form = container.querySelector('form');
    const state = currentForm.target.getState();
    expect(form.childNodes.length).toEqual(state.items.length);
  });

  test('Should render text field with empty value', async () => {
    const { getByTestId } = renderResponse
    const lebel = getByTestId('labelId') as HTMLElement
    expect(lebel?.innerHTML).toEqual('Text input');
    const input = getByTestId('textInput') as HTMLInputElement;
    expect(input?.value).toEqual('');
  });

  test('Should render button', async () => {
    const { getByTestId } = renderResponse;
    const button = getByTestId('buttonID') as HTMLButtonElement;
    expect(button?.innerHTML).toEqual('submit');
  });

  test('Shoud call onFieldChanged onchange', async () => {
    const { getByTestId } = renderResponse;
    expect(changeHandler).not.toHaveBeenCalled();
    const input = getByTestId('textInput') as HTMLInputElement;
    userEvent.type(input, 'welcome');
    expect(changeHandler).toHaveBeenCalled();
  });

  test('Should test- onFieldChange payload', async () => {
    expect(fieldChangeSet).toHaveProperty('changes');
    expect(typeof fieldChangeSet.changes).toEqual('object');
    expect(fieldChangeSet.changes).toEqual(
      expect.arrayContaining([expect.objectContaining({ propertyName: 'value' })])
    );
  });

  test('Should test-  onTextChange payload', async () => {
    expect(customEventPayload).toHaveProperty('changes');
    expect(typeof customEventPayload.changes).toEqual('object');
    expect(customEventPayload.changes).toEqual(
      expect.arrayContaining([expect.objectContaining({ propertyName: 'value' })])
    );
  });

  test('Shoud call custom event handler', async () => {
    const { getByTestId } = renderResponse;
    expect(customEvents).not.toHaveBeenCalled();
    const input = getByTestId('textInput') as HTMLInputElement;
    userEvent.type(input, 'welcome');
    expect(customEvents).toHaveBeenCalled();
  });

})