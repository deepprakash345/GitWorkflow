import React, {useState} from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldsetJson, FormJson, State, Action } from '@aemforms/forms-core';
import { AdaptiveForm, useRuleEngine } from '../../src';
import {useFocus} from '../../src/hooks';

const formJson: FormJson = {
  'items': [
    {
      'name': 'textInput1',
      'label': {
        'value': 'Text input Sample'
      },
      'type': 'string',
      'fieldType': 'text-input',
      'placeholder': 'Please enter text'
    },
    {
      'name': 'textInput',
      'label': {
        'value': 'Text input'
      },
      'type': 'string',
      'fieldType': 'text-input',
      'placeholder': 'Please enter text',
      'required': true,
      'events': {
        'change': "dispatchEvent($form, 'custom:textChange', $event.payload)"
      }
    },
    {
      'fieldType': 'button',
      'label': {
        'value': 'submit'
      },
      'name' : 'submit',
      'events': {
        'click': 'submitForm()'
      }
    }
  ]
};
const InputField = (fieldset: State<FieldsetJson>) => {
  const [props, handler] = useRuleEngine(fieldset);
  const [inputRef, setFocus] = useFocus(fieldset);
  return <div className="t-field">
    <label className="t-field-label" htmlFor="textInput" data-testid={`${props.name}_label`}>Text input</label>
    <input className="t-field-input" data-testid={props.name}  ref={inputRef} onInput={
      // @ts-ignore
      (e)=> handler.dispatchChange(e.target.value)
    }
      type="text" value={props.value} required name={props.name} placeholder="text" />
  </div>;
};
const Button = (fieldset: State<FieldsetJson>) => {
  const [props, handler] = useRuleEngine(fieldset);
  const [inputRef, setFocus] = useFocus(fieldset);
  // @ts-ignore
  return <button className="t-button" type="button" data-testid="buttonID" ref={inputRef} onClick={handler.dispatchClick} onPress={handler.dispatchClick}>submit</button>;
};
const mappings = {
  'text-input': InputField,
  'button': Button
};



describe('AF super component test cases', () => {
  let initializeHandler: any, submitHandler: any, renderResponse: any, renderDivWithForm:any, changeHandler: any, validationCompleteHandler: any;
  let customEvents: any;
  let currentForm: any, fieldChangeSet: any, customEventPayload: any, validationCompleteHandlerPayload: any, TestComp: any;
  beforeEach(() => {
    initializeHandler = jest.fn().mockImplementation((action: Action) => {
      currentForm = action;
    });
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
          onValidationComplete={validationCompleteHandler}
      />);
    TestComp = function () {
      const [focusOn, setFocusOn] = useState('');
      return <div>
        <AdaptiveForm mappings={mappings} formJson={formJson} locale='en'
                      onInitialize={initializeHandler}
                      onSubmit={submitHandler}
                      onFieldChanged={changeHandler}
                      onTextChange={customEvents}
                      focusOn={focusOn}
                      onValidationComplete={(action: any)=> {
                        validationCompleteHandlerPayload = action.payload;
                        setFocusOn(validationCompleteHandlerPayload[0].fieldName);
                      }
                      }/>
        <button className="t-button" type="button" data-testid="buttonOutsideForm" onClick={()=>setFocusOn('someField')}>submit</button>
      </div>;
    };
  });

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
    const { getByTestId } = renderResponse;
    const label = getByTestId('textInput_label') as HTMLElement;
    expect(label?.innerHTML).toEqual('Text input');
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

  test('FocusOn property should work as expected', async () => {
    cleanup();
    renderDivWithForm = render(<TestComp/>);
    let { getByTestId } = renderDivWithForm;
    // check if input is validated
    let input = getByTestId('textInput1') as HTMLInputElement;
    userEvent.type(input, 'welcome');
    let button = getByTestId('buttonOutsideForm') as HTMLButtonElement;
    userEvent.click(button);
    input = getByTestId('textInput1') as HTMLInputElement;
    expect(input.value).toEqual('welcome');

    // click on form submit
    let submit = getByTestId('buttonID') as HTMLButtonElement;
    userEvent.click(submit); // move the focus away from text input
    let input1 = getByTestId('textInput1') as HTMLInputElement;
    let inputOnFOcus = getByTestId('textInput') as HTMLInputElement;
    expect(inputOnFOcus).toBe(document.activeElement);
  });

});