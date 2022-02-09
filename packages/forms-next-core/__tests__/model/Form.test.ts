import {create} from '../collateral';
import {Action, BaseModel, createFormInstance, FieldModel, FormModel} from '../../src';
import {FieldJson} from '../../src/types';
import {Change, Click, CustomEvent, propertyChange} from '../../src/controller/Controller';
import RuleEngine from '../../src/rules/RuleEngine';
import Form from '../../src/Form';

test('fetch an element from form', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = new Form(formJson, new RuleEngine());
    expect(form.name).toEqual('$form');
    const f1 = form.getElement(form.items[0].id) as FieldModel;
    expect(f1?.name).toEqual('f1');
});

test('fetch a panel from form', async () => {
    const formJson = create(['f', [['f', 'f'], 'f', 'f'], 'f']);
    let form = new Form(formJson, new RuleEngine());
    const f1 = form.getElement(form.items[1].id);
    expect(f1.isContainer).toEqual(true);
});

test('fetch a nested element from form', async () => {
    const formJson = create(['f', [['f', 'f'], 'f', 'f'], 'f']);
    let form = new Form(formJson, new RuleEngine());
    //@ts-ignore
    const f1 = form.getElement(form.items[1].items[0].items[0].id) as FieldModel;
    expect(f1?.name).toEqual('f2');
});

test('fetch $form from form', async () => {
    const formJson = create(['f', [['f', 'f'], 'f', 'f'], 'f']);
    let form = new Form(formJson, new RuleEngine());
    const f1 = form.getElement('$form') as FieldModel;
    expect(f1).toEqual(form);
});

test('fetch a non existing element', async () => {
    const formJson = create(['f', [['f', 'f'], 'f', 'f'], 'f']);
    let form = new Form(formJson, new RuleEngine());
    const f1 = form.getElement('f7');
    expect(f1).toBeUndefined();

    const f2 = form.getElement('p1.p2.f2.f3');
    expect(f2).toBeUndefined();
});

test('update on value change for normal field', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const field = form.getElement(form.getState().items[0].id);
    field.value = 'value 1';
    expect(field.getState()).toEqual(expect.objectContaining({
        'name': 'f1',
        'value': 'value 1'
    }));
});

test('dispatching an event on a field without rule should not throw exception', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const state = form.getState();
    const test = () => {
        form.getElement(state.items[0].id).dispatch(new Click());
    };
    expect(test).not.toThrow();
});

expect.extend({
    matchesAction(received: Action, expected: { action: Action, target: BaseModel }) {
        const passes = {
            'target': [received.target.id, expected.target.id, received.target == expected.target],
            'type': [received.type, expected.action.type, received.type === expected.action.type],
            'metadata': [JSON.stringify(received.metadata), JSON.stringify(expected.action.metadata), JSON.stringify(received.metadata) === JSON.stringify(expected.action.metadata)],
            'payload': [JSON.stringify(received.payload), JSON.stringify(expected.action.payload), JSON.stringify(received.payload) == JSON.stringify(expected.action.payload)]
        };
        const entries = Object.entries(passes).filter((key) => !key[1][2]);
        if (entries.length > 0) {
            return {
                message: () => {
                    let msg = `expected ${Object.keys(passes).length} to match but ${entries.length} did not match. `;
                    msg = msg + entries.map((key) => key[0]).join(',') + ' did not match';
                    msg = msg + '\n ' + entries.map((key) => key[0] + ' : ' + key[1][0] + ' !== ' + key[1][1]).join('\n');
                    return msg;
                },
                pass: false
            };
        } else {
            return {
                pass: true,
                message: () => 'actions matched'
            };
        }
    }
});

declare global {
    namespace jest {
        interface Matchers<R> {
            matchesAction(expected: { action: Action, target: BaseModel }): R;
        }

        interface Expect {
            matchesAction(expected: { action: Action, target: BaseModel }): void;
        }
    }
}

test('default subscription gets invoked when value changes', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    //@ts-ignore
    let f1 = form.getElement(form.getState().items[0].id);
    f1.subscribe(callback);
    f1.value = 'change2';
    f1.dispatch(new Click());
    const action = new Change({
        changes: [
            {propertyName: 'value', currentValue: 'change2'},
            {propertyName: 'valid', currentValue: true},
            {propertyName: 'errorMessage', currentValue: ''}
        ]
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).matchesAction({action, target: f1});
});

test('default subscription gets invoked only when state changes via events', async () => {
    const formJson = create([{
        'f': {
            'default': '2',
            'events': {
                'custom:event1': "{prop1 : '1'}",
                'custom:event2': "{value : '1'}"
            }
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    //@ts-ignore
    let f1 = form.getElement(form.getState().items[0].id);
    f1.subscribe(callback);
    f1.dispatch(new CustomEvent('event1'));
    f1.dispatch(new CustomEvent('event2'));
    const action = new Change({
        changes: [
            {'propertyName':'value','currentValue':'1','prevValue':'2'},
            {'propertyName':'valid','currentValue':true},
            {'propertyName':'errorMessage','currentValue':''}
        ]
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).matchesAction({action, target: f1});
});

test('default subscription gets invoked when the change event is triggered', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    //@ts-ignore
    const f1 = form.getElement(form.getState().items[0].id);
    f1.subscribe(callback);
    const action = propertyChange('value', 'value2', undefined);
    f1.dispatch(action);
    f1.dispatch(new Click());
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).matchesAction({action, target: f1});
});

test('click subscription gets invoked only when that click event is triggered', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    const f1 = form.getElement(form.getState().items[0].id);
    f1.subscribe(callback, 'click');
    const action = propertyChange('value', 'something');
    f1.dispatch(action);
    f1.dispatch(new Click());
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).matchesAction({action: new Click(), target: f1});
});

test('multiple subscription can be registered for a field', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    let callback1 = jest.fn();
    const f1 = form.getElement(form.getState().items[0].id);
    f1.subscribe(callback, 'change');
    f1.subscribe(callback1, 'click');
    const action = propertyChange('value', 'value2');
    f1.dispatch(action);
    f1.dispatch(new Click());
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).matchesAction({action, target: f1});
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1.mock.calls[0][0]).matchesAction({action: new Click(), target: f1});
});

test('unsubscribing from one event does not affect other subscriptions', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    let callback1 = jest.fn();
    const f1 = form.getElement(form.getState().items[0].id);
    let x = f1.subscribe(callback, 'change');
    f1.subscribe(callback1, 'click');
    x.unsubscribe();
    f1.value = 'value2';
    f1.dispatch(new Click());
    expect(callback).not.toHaveBeenCalled();
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1.mock.calls[0][0]).matchesAction({action: new Click(), target: f1});
});

test('custom event subscription can be registered', async () => {
    const formJson = create([{
        f: {
            'events': {
                'customEvent': 'f2.value > 20'
            }
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    const f1 = form.getElement(form.getState().items[0].id);
    f1.subscribe(callback, 'customEvent');
    const action = new CustomEvent('customEvent', 'value2');
    f1.dispatch(action);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).matchesAction({action, target: f1});
});

const subscriptionCollateral = ['a',
    {
        b: {
            'rules': {
                'value': '$form.d1.value'
            }
        }
    },
    {
        c:
            {
                'rules': {
                    'value': '$form.a1.value + $form.b1.value'
                }
            }
    }, 'd'];

test('default subscription gets invoked for dependent fields', async () => {
    const formJson = create(subscriptionCollateral);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    const state = form.getState();
    form.getElement(state.items[2].id).subscribe(callback);
    form.getElement(state.items[0].id).value = '10';
    expect(callback).toHaveBeenCalled();
});

test('change event subscription gets invoked for dependent fields', async () => {
    const formJson = create(subscriptionCollateral);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    const state = form.getState();
    form.getElement(state.items[2].id).subscribe(callback, 'change');
    form.getElement(state.items[0].id).value = '10';
    expect(callback).toHaveBeenCalled();
});


test("subscription doesn't get invoked after unsubscribing", async () => {
    const formJson = create(subscriptionCollateral);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    const state = form.getState();
    const subscription = form.getElement(state.items[2].id).subscribe(callback);
    subscription.unsubscribe();
    form.getElement(state.items[0].id).value = '10';
    expect(callback).not.toHaveBeenCalled();
});

/*
const nonStringRules = [
    {
        name: 'object',
        rules: {
            'prop': {}
        }
    },
    {
        name: 'boolean',
        rules: {
            'prop': true
        }
    },
    {
        name: 'number',
        rules: {
            'prop': 1
        }
    },
    {
        name: 'array',
        type: 'object',
        rules: {
            'prop': []
        }
    },
    {
        name: 'null',
        type: 'object',
        rules: {
            'prop': null
        }
    }];

test.each(nonStringRules)('rules with $name type throw an exception', async ({name, type, rules}) => {
    const formJson = create([{
        f: {
            'rules': rules
        }
    }]);
    await expect(createFormInstance(formJson)).rejects.toThrow(`only expression strings are supported. ${type === undefined ? name : type} types are not supported`);

});*/

test('a value change updates the dataDom as well', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.getElement(form.getState().items[0].id).value = 'value2';
    expect(await form.getState().data).toEqual({
        'f1': 'value2'
    });
});

test('a value change updates the nested dataDom as well', async () => {
    const formJson = create([{
        'f': {
            'dataRef': 'a.b.c.d'
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.getElement(form.getState().items[0].id).value = 'value2';
    expect(await form.getState().data).toEqual({
        a: {
            b: {
                c: {
                    d: 'value2'
                }
            }
        }
    });
});

test('a value change updates the nested dataDom as well', async () => {
    const formJson = create([{
        'f': {
            'dataRef': 'a.b.c.d'
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.getElement(form.getState().items[0].id).value = 'value2';
    expect(await form.getState().data).toEqual({
        a: {
            b: {
                c: {
                    d: 'value2'
                }
            }
        }
    });
});

test('multiple field changes also keep the data modified', async () => {
    const formJson = create([{
        'f': {
            'dataRef': 'a.b.c.d'
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    const state = form.getState();
    form.getElement(state.items[0].id).value = 'value2';
    form.getElement(state.items[1].id).value = 'value2';
    form.getElement(state.items[2].id).value = 'value2';
    expect(await form.getState().data).toEqual({
        a: {
            b: {
                c: {
                    d: 'value2'
                }
            }
        },
        f2: 'value2',
        f3: 'value2'
    });
});

test('an invalid value change should set the invalid state of the field', async () => {
    const formJson = create([{
        'f': {
            'type': 'number'
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    const state = form.getState();
    const elem = form.getElement(state.items[0].id) as FieldModel;
    elem.value = 'abcd';
    expect(elem.getState().valid).toEqual(false);
});

test('an invalid value change should set the correct error message on the field', async () => {
    const formJson = create([{
        'f': {
            'required': 'true',
            'constraintMessages': {
                'required': 'The value is required'
            }
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    const element = form.getElement(form.getState().items[0].id) as FieldModel;
    element.value = '';
    const state = element.getState();
    expect(state.valid).toEqual(false);
    expect(state.errorMessage).toEqual('The value is required');
});

test('an invalid datatype value should set the correct error message on the field', async () => {
    const formJson = create([{
        'f': {
            type: 'number'
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    const element = form.getElement(form.getState().items[0].id) as FieldModel;
    element.value = 'abcd';
    const state = element.getState();
    expect(state.valid).toEqual(false);
    expect(state.errorMessage).toEqual('There is an error in the field');
});

test('an invalid constraint in the field should not throw an exception', async () => {
    const formJson = create([{
        'f': {
            type: 'number',
            'positive': true
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.getElement(form.getState().items[0].id).value = '-10';
    expect(await form.getState().data).toEqual({'f1': -10});
});

test.skip('an invalid value change should not update the data dom', async () => {
    const formJson = create([{
        'f': {
            type: 'number'
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.getElement('f1').value = 'abcd';
    expect(form.getState().data).toEqual({});
});

test.skip('an invalid value should remove the old value from the data dom', async () => {
    const formJson = create([{
        'f': {
            type: 'number'
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    const c = form.getElement('f1');
    c.value = 1;
    expect(form.getState().data).toEqual({f1: 1});
    c.value = 'abcd';
    expect(form.getState().data).toEqual({});
});

test.skip('making a value valid resets the valid state and removes the errorMessage', async () => {
    const formJson = create([{
        'f': {
            'required': 'true',
            'constraintMessages': {
                'required': 'The value is required'
            }
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    const field = form.getElement('f1') as FieldModel;
    field.value = '';
    let state = field.getState();
    expect(state.valid).toEqual(false);
    expect(state.errorMessage).toEqual('The value is required');

    field.value = '1234';
    state = field.getState();
    expect(state.valid).toEqual(true);
    expect(state.errorMessage).toEqual('');

});

test('rules should modify the data dom', async () => {
    const formJson = create(['f', 'f', {
        'f': {
            'dataRef': 'e',
            'rules': {
                'value': "'default value'"
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    expect(await form.getState().data).toEqual({
        e: 'default value'
    });
});

test('dataDom is updated as per the dataType of the element', async () => {
    const formJson = create([{
        'f': {
            type: 'number',
            'dataRef': 'number'
        }
    }, {
        'f': {
            type: 'string',
            'dataRef': 'string'
        }
    }, {
        'f': {
            type: 'boolean',
            'dataRef': 'boolean'
        }
    }, {
        'f': {
            type: 'string[]',
            'dataRef': '"string[]"'
        }
    }, {
        'f': {
            type: 'number[]',
            'dataRef': '"number[]"'
        }
    }, {
        'f': {
            type: 'boolean[]',
            'dataRef': '"boolean[]"'
        }
    }]);
    let form = await createFormInstance(formJson);
    const state = form.getState();
    form.getElement(state.items[0].id).value = '10';
    form.getElement(state.items[1].id).value = 'value2';
    form.getElement(state.items[2].id).value = 'true';
    form.items[3].value = 'value2';
    form.items[4].value = '10';
    form.items[5].value = 'true';
    expect(await form.getState().data).toEqual({
        number: 10,
        string: 'value2',
        boolean: true,
        'number[]': [10],
        'string[]': ['value2'],
        'boolean[]': [true]
    });
});

test('custom event should be executed for all the fields when dispatched', async () => {
    const formJson = create([{
        'f': {
            'type': 'number',
            'events': {
                'custom:customClick': '{"value" : 1 + 3}'
            }
        }
    }, {
        'f': {
            'type': 'number',
            'events': {
                'custom:customClick': '{"value" : 2 + 3}'
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    form.dispatch(new CustomEvent('customClick', null, true));
    let f = form.getElement(form.getState().items[0].id).getState() as FieldJson;
    expect(f.value).toEqual(4);
    f = form.getElement(form.getState().items[1].id).getState() as FieldJson;
    expect(f.value).toEqual(5);
});

test('custom event should pass the payload to the event', async () => {
    const formJson = create([{
        'f': {
            'type': 'number',
            'events': {
                'custom:customClick1': '{"value" : 1 + $event.payload.add}'
            }
        }
    }, {
        'f': {
            'label': {
                'value': 'myfield'
            },
            'events': {
                'custom:customClick2': '{"value" : $event.target.label.value}'
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    form.dispatch(new CustomEvent('customClick1', {add: 3}, true));
    let f = form.getElement(form.getState().items[0].id).getState() as FieldJson;
    expect(f.value).toEqual(4);

    form.dispatch(new CustomEvent('customClick2', null, true));
    f = form.getElement(form.getState().items[1].id).getState() as FieldJson;
    expect(f.value).toEqual('myfield');

});

test('dataRef null should not update the data dom', async () => {
    const formJson = create([{
        'f': {
            'type': 'number',
            'dataRef': null
        }
    }]);
    let form = await createFormInstance(formJson);
    const elem = form.getElement(form.getState().items[0].id) as FieldModel;
    elem.value = 5;
    const state = elem.getState();
    expect(state.value).toEqual(5);
    expect(await form.getState().data).toEqual({});
});

test.todo('if dataRef is is invalid data should not get generated for that field');
test('object returned in event should be applied to the field properties', async () => {
    const formJson = create(['f', {
        'f': {
            type: 'number',
            'events': {
                'click': '{"value" : 2 + 3}'
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    const elem = form.getElement(form.getState().items[1].id) as FieldModel;
    elem.dispatch(new Click());
    expect(elem.getState().value).toEqual(5);
});

test('object returned in custom event should be applied to the field properties', async () => {
    const formJson = create(['f', {
        'f': {
            'type': 'number',
            'events': {
                'custom:Click': '{"value" : 2 + $event.payload}'
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    const elem = form.getElement(form.getState().items[1].id) as FieldModel;
    elem.dispatch(new CustomEvent('Click', 3));
    expect(elem.getState().value).toEqual(5);
});

test.todo('rules using default values should modify the data dom');/*, () => {
    const formJson = create([{
        'f': {
            'dataRef': 'a.b.c.d',
            'default': 'john'
        }
    }, {
        'f': {
            'default': 'doe'
        }
    }, {
        'f': {
            'dataRef': 'e',
            'rules': {
                'value': '$form.f1.value + $form.f2.value'
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    expect(form.getState().data).toEqual({
        a: {
            b: {
                c: {
                    d: 'test'
                }
            }
        },
        f1 : 'doe',
        e : 'johndoe'
    });
});*/

test.todo('conflicting dataRefs should throw an exception'); /* const formJson = create([{
        'f' : {
            'dataRef' : 'a.b.c.d'
        }
    }, {
       'f' : {
            'dataRef' : 'a.b'
       }
    }, 'f']);*/

test.todo('default values should also modify the data dom');/* () => {
    const formJson = create([{
        'f': {
            'dataRef': 'a.b.c.d',
            'defaultValue': 'test'
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    expect(form.getState().data).toEqual({
        a: {
            b: {
                c: {
                    d: 'test'
                }
            }
        }
    });
});*/

test('subscription gets invoked only for dependent fields', async () => {
    const formJson = create(subscriptionCollateral);
    let form = await createFormInstance(formJson);
    let callbackC1 = jest.fn();
    let callbackB1 = jest.fn();
    const state = form.getState();
    form.getElement(state.items[2].id).subscribe(callbackC1);
    form.getElement(state.items[1].id).subscribe(callbackB1);
    form.getElement(state.items[0].id).value = '10';
    expect(callbackC1).toHaveBeenCalled();
    expect(callbackB1).not.toHaveBeenCalled();
});

test('fetching element without passing id', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    // @ts-ignore
    const emptyController = form.getElement();
    expect(emptyController).toBeUndefined();
});

test('Rule Node for a Form should have correct hierarchy', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = new Form(formJson, new RuleEngine());
    const r1 = form.getRuleNode();
    expect(r1.f1.name).toEqual('f1');
    expect(r1.f2.name).toEqual('f2');
    expect(r1.f3.name).toEqual('f3');
});

test('Rule Node for a Panel should have correct hierarchy', async () => {
    const formJson = create(['f', ['f', 'f'], 'f']);
    let form = new Form(formJson, new RuleEngine());
    const r1 = form.getRuleNode();
    expect(r1.f1.name).toEqual('f1');
    expect(r1.p1.f2.name).toEqual('f2');
    expect(r1.p1.f3.name).toEqual('f3');
    expect(r1.f2.name).toEqual('f2');
});

test('Rule Node for a Panel with type array should have correct hierarchy', async () => {
    const formJson = {
        items: [
            {
                name: 'panel',
                type: 'array',
                items: [
                    {
                        name: 'field',
                        type: 'number'
                    }
                ]
            }
        ]
    };
    let form = new Form(formJson, new RuleEngine());
    const r1 = form.getRuleNode();
    expect(r1.panel).toBeInstanceOf(Array);
});