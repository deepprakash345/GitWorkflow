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

import CheckboxGroup from '../../src/components/CheckboxGroup';
import {filterTestTable, InputFieldTestCase, jest26CompatibleTable, renderComponent} from '../utils';
import userEvent from '@testing-library/user-event';
import { FieldJson } from '@adobe/aem-forms-af-core/lib';
import {DEFAULT_ERROR_MESSAGE} from './RadioButtonGroup.test';

const field: FieldJson = {
  'name': 'checkbox',
  'visible': true,
  label: {
    value: 'Checkbox group'
  },
  fieldType: 'checkbox-group',
  'enum': [1, 2, 3],
  'enumNames': ['checkbox 1', 'checkbox 2', 'checkbox 3']
};

type Input = {
  labels: HTMLLabelElement[],
  inputs: HTMLInputElement[],
  group: Element | null,
  container: Element | null
}

type GroupExpectType = (i: Input) => any

const labelInputTests: InputFieldTestCase<GroupExpectType>[] = [
  {
    name: 'field gets rendered without a provider',
    field: field,
    expects: ({ labels, inputs, group }) => {
      expect(group?.textContent).toContain('Checkbox group');
      expect(labels.length).toEqual(3);
      expect(inputs.length).toEqual(3);
      expect(labels[0]?.textContent).toEqual('checkbox 1');
      expect(labels[1]?.textContent).toEqual('checkbox 2');
      expect(labels[2]?.textContent).toEqual('checkbox 3');
      expect(inputs[0]?.name).toEqual('checkbox');
      expect(inputs[0]?.value).toEqual('1');
      expect(inputs[1]?.value).toEqual('2');
      expect(inputs[2]?.value).toEqual('3');
    }
  },
  {
    name: 'html in the label should be handled for non rich text label',
    field: {
      ...field,
      'label': {
        value: '<script>javascript</script><p>label inside p tags</p>'
      }
    },
    expects: ({ group }) => {
      expect(group?.innerHTML).toContain('&lt;script&gt;javascript&lt;/script&gt;' +
        '&lt;p&gt;label inside p tags&lt;/p&gt;');
    }
  },
  {
    name: 'labels and inputs are linked with for and id attribute',
    field: field,
    expects: ({ labels, inputs }) => {
      expect(inputs[0]?.getAttribute('id')).toEqual(labels[0]?.getAttribute('for'));
      expect(inputs[1]?.getAttribute('id')).toEqual(labels[1]?.getAttribute('for'));
      expect(inputs[2]?.getAttribute('id')).toEqual(labels[2]?.getAttribute('for'));
    }
  },
  {
    name: 'labels and inputs are also linked with aria-labelledBy attribute',
    field: field,
    expects: ({ labels, inputs }) => {
      expect(labels[0]?.getAttribute('id')).toEqual(inputs[0]?.getAttribute('aria-labelledBy'));
      expect(labels[1]?.getAttribute('id')).toEqual(inputs[1]?.getAttribute('aria-labelledBy'));
      expect(labels[2]?.getAttribute('id')).toEqual(inputs[2]?.getAttribute('aria-labelledBy'));
    }
  },
  {
    name: 'label is empty if label is marked as hidden in the field',
    field: {
      ...field,
      label: {
        ...field.label,
        visible: false
      }
    },
    expects: ({ group }) => {
      expect(group?.textContent).not.toContain('Checkbox group');
    }
  },
  {
    name: 'individual labels are present if label is hidden',
    field: {
      ...field,
      'label' : {
        ...field.label,
        visible: false
      }
    },
    expects: ({labels , inputs}) => {
      expect(labels[0]?.getAttribute('id')).toEqual(inputs[0]?.getAttribute('aria-labelledBy'));
      expect(labels[1]?.getAttribute('id')).toEqual(inputs[1]?.getAttribute('aria-labelledBy'));
      expect(labels[2]?.getAttribute('id')).toEqual(inputs[2]?.getAttribute('aria-labelledBy'));
    }
  },
  {
    name: 'input is not marked as aria-invalid when the field is valid',
    field: {
      ...field,
      'valid': true
    },
    expects: ({ group }) => {
      expect(group?.getAttribute('aria-invalid')).toBeNull();
    }
  },
  {
    name: "input is not marked as aria-invalid when the field's valid state is undefined",
    field,
    expects: ({ group }) => {
      expect(group?.getAttribute('aria-invalid')).toBeNull();
    }
  },
  {
    name: "group's label property is accessible",
    field,
    expects: ({ group }) => {
      const labelID = group?.getAttribute('aria-labelledby');
      const glabel = group?.querySelector('#' + labelID);
      expect(glabel?.textContent).toEqual('Checkbox group');
    }
  },
  {
    name: 'no option is selected on initial render case 1',
    field,
    expects: ({ inputs }) => {
      expect(inputs[0]?.checked).toEqual(false);
      expect(inputs[0]?.value).toEqual('1');
      expect(inputs[1]?.checked).toEqual(false);
      expect(inputs[1]?.value).toEqual('2');
      expect(inputs[2]?.checked).toEqual(false);
      expect(inputs[2]?.value).toEqual('3');
    }
  },
  {
    name: 'correct option is selected on initial render case 2',
    field: {
      ...field,
      'default': [2]
    },
    expects: ({ inputs }) => {
      expect(inputs[0]?.checked).toEqual(false);
      expect(inputs[0]?.value).toEqual('1');
      expect(inputs[1]?.checked).toEqual(true);
      expect(inputs[1]?.value).toEqual('2');
      expect(inputs[2]?.checked).toEqual(false);
      expect(inputs[2]?.value).toEqual('3');
    }
  },
  {
    name: 'helpText div doesn\'t exists when there is no error and no description',
    field: {
      ...field
    },
    expects: ({container}) => {
      const err = container?.querySelector('.formField__helpText');
      expect(err).toBeNull();
    }
  },
  {
    name: 'helpText div exists when there is a description',
    field: {
      ...field,
      description: 'some description'
    },
    expects: ({container}) => {
      const err = container?.querySelector('.formField__helpText');
      expect(err).not.toBeNull();
      // @ts-ignore
      expect(err.textContent).toEqual('some description');
    }
  },
  {
    name: 'help text exists when the field is invalid',
    field: {
      ...field,
      'valid': false,
      'errorMessage' : 'there is an error in the field'
    },
    expects: ({container}) => {
      const err = container?.querySelector('.formField__helpText');
      expect(err).not.toBeNull();
      //@ts-ignore
      expect(err.textContent).toEqual('there is an error in the field');
    }
  }
];

const helper = renderComponent(CheckboxGroup, (container) => {
  return {
    group: container.querySelector('[role="group"]'),
    inputs: Array.from(container.querySelectorAll('input')),
    labels: Array.from(container.querySelectorAll('label'))
  };
});

test.each(jest26CompatibleTable(filterTestTable(labelInputTests)))('%s', async (name, { field, expects }) => {
  expects(await helper(field));
});

test('option selected by user is set in the model', async () => {
  const f = {
    ...field
  };
  const { inputs, element } = await helper(f);
  let state = element?.getState();
  expect(state.value).toBeUndefined();
  userEvent.click(inputs[0]);
  state = element?.getState();
  expect(state.value).toEqual([1]);
  expect(inputs[0]?.checked).toEqual(true);
  expect(inputs[1]?.checked).toEqual(false);
  expect(inputs[2]?.checked).toEqual(false);

  userEvent.click(inputs[1]);
  state = element?.getState();
  expect(state.value).toEqual([1, 2]);
  expect(inputs[0]?.checked).toEqual(true);
  expect(inputs[1]?.checked).toEqual(true);
  expect(inputs[2]?.checked).toEqual(false);
});

test('value set in the model selects the checkbox', async () => {
  const f = {
    ...field
  };
  const { inputs, element } = await helper(f);
  expect(inputs[0]?.checked).toEqual(false);
  expect(inputs[1]?.checked).toEqual(false);
  expect(inputs[2]?.checked).toEqual(false);

  element.value = [1];
  expect(inputs[0]?.checked).toEqual(true);
  expect(inputs[1]?.checked).toEqual(false);
  expect(inputs[2]?.checked).toEqual(false);

  element.value = [2];
  expect(inputs[0]?.checked).toEqual(false);
  expect(inputs[1]?.checked).toEqual(true);
  expect(inputs[2]?.checked).toEqual(false);

  element.value = [1,3];
  expect(inputs[0]?.checked).toEqual(true);
  expect(inputs[1]?.checked).toEqual(false);
  expect(inputs[2]?.checked).toEqual(true);
});

test('clicking a checkbox should set the value', async () => {
  const f = {
    ...field
  };
  const { inputs, element } = await helper(f);
  userEvent.click(inputs[0]);
  expect(element.value).toEqual([1])

  userEvent.click(inputs[1]);
  expect(element.value).toEqual([1, 2])

  userEvent.click(inputs[0]);
  expect(element.value).toEqual([2])
});


test('it should handle visible property', async () => {
  const f = {
    ...field,
    'visible': false
  };
  const { container } = await helper(f);
  expect(container?.innerHTML).toContain('display: none;');

  const x = await helper(field);
  expect(x.container?.innerHTML).not.toContain('display: none;');
});

test('help text content changes when field becomes invalid', async () => {
  const f = {
    ...field,
    description: 'some description',
    'required' : true
  };

  const {container, element} = await helper(f);
  const err = container?.querySelector('.formField__helpText');
  // @ts-ignore
  expect(err.textContent).toEqual('some description');

  //@ts-ignore
  element.value = [1];
  // @ts-ignore
  expect(err.textContent).toEqual('some description');

  element.value = null;
  // @ts-ignore
  expect(err.textContent).toEqual(DEFAULT_ERROR_MESSAGE);
});

test("checkbox group with non array type should allow only single selection", async () => {
  const f = {
    ...field,
    description: 'some description',
    'type' : 'number'
  };
  const {container, element, inputs} = await helper(f);
  userEvent.click(inputs[0]);
  expect(element.value).toEqual(1)

  userEvent.click(inputs[1]);
  expect(element.value).toEqual(2)

  expect(inputs[0].checked).toEqual(false)
  expect(inputs[1].checked).toEqual(true)

  userEvent.click(inputs[1]);
  expect(element.value).toEqual(null)
})

test.todo('it should handle disable property');
test.todo('it should handle richTextTitle property');
test.todo('it should handle screenReaderText property');
test.todo('it should dispatch click event to controller');
