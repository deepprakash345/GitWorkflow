import {create} from '../collateral';
import {createFormInstance, FieldModel} from '../../src';
import {FieldJson} from '../../src/types';
import {Controller, Change, Click, CustomEvent, Action, EmptyController} from '../../src/controller/Controller';
import RuleEngine from '../../src/rules/RuleEngine';
import Form from '../../src/Form';

test('fetch an element from form', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = new Form(formJson, new RuleEngine());
    const f1 = form.getElement(form.items[0].id) as FieldModel;
    expect(f1?.name).toEqual('f1');
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

const changeSpec = [
    {
        'name': 'update on change event for normal field',
        'items': ['f', 'f', 'f'],
        'field': (state: any) => state.items[0].id,
        'event': new Change('value1'),
        'expected': (form: Controller) => {
            expect(form.getState().items[0]).toEqual(expect.objectContaining({
                'name': 'f1',
                'value': 'value1'
            }));
        }
    }
];

test.each(changeSpec)('$name', async ({items, field, event, expected}) => {
    const formJson = create(items);
    let form = await createFormInstance(formJson);
    form.getElementController(field(form.getState())).dispatch(event);
    expected(form);
});

test('dispatching an event on a field without rule should not throw exception', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const state = form.getState();
    const test = () => {
        form.getElementController(state.items[0].id).dispatch(new Click());
    };
    expect(test).not.toThrow();
});

expect.extend({
    matchesAction(received: Action, expected: { action: Action, target: Controller }) {
        const passes = {
            'target': received.target == expected.target,
            'type': received.type === expected.action.type,
            'metadata': JSON.stringify(received.metadata) === JSON.stringify(expected.action.metadata),
            'payload': JSON.stringify(received.payload) == JSON.stringify(expected.action.payload)
        };
        const entries = Object.entries(passes).filter((key) => !key[1]);
        if (entries.length > 0) {
            return {
                message: () => {
                    let msg = `expected ${Object.keys(passes).length} to match but ${entries.length} did not match. `;
                    msg = msg + entries.map((key) => key[0]).join(',') + ' did not match';
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
            matchesAction(expected: { action: Action, target: Controller }): R;
        }

        interface Expect {
            matchesAction(expected: { action: Action, target: Controller }): void;
        }
    }
}

test('default subscription gets invoked only when the state changes', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    //@ts-ignore
    let f1 = form.getElementController(form.getState().items[0].id);
    f1.subscribe(callback);
    const action = new Change('value2');
    f1.dispatch(action);
    f1.dispatch(new Click());
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).matchesAction({action, target: f1});
});

test('change subscription gets invoked only when the change event is triggered', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    //@ts-ignore
    const f1 = form.getElementController(form.getState().items[0].id);
    f1.subscribe(callback, 'change');
    const action = new Change('value2');
    f1.dispatch(action);
    f1.dispatch(new Click());
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).matchesAction({action, target: f1});
});

test('click subscription gets invoked only when that click event is triggered', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    const f1 = form.getElementController(form.getState().items[0].id);
    f1.subscribe(callback, 'click');
    const action = new Change('value2');
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
    const f1 = form.getElementController(form.getState().items[0].id);
    f1.subscribe(callback, 'change');
    f1.subscribe(callback1, 'click');
    const action = new Change('value2');
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
    const f1 = form.getElementController(form.getState().items[0].id);
    let x = f1.subscribe(callback, 'change');
    f1.subscribe(callback1, 'click');
    x.unsubscribe();
    f1.dispatch(new Change('value2'));
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
    const f1 = form.getElementController(form.getState().items[0].id);
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
    form.getElementController(state.items[2].id).subscribe(callback);
    form.getElementController(state.items[0].id).dispatch(new Change('10'));
    expect(callback).toHaveBeenCalled();
});

test('change event subscription gets invoked for dependent fields', async () => {
    const formJson = create(subscriptionCollateral);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    const state = form.getState();
    form.getElementController(state.items[2].id).subscribe(callback, 'change');
    form.getElementController(state.items[0].id).dispatch(new Change('10'));
    expect(callback).toHaveBeenCalled();
});


test("subscription doesn't get invoked after unsubscribing", async () => {
    const formJson = create(subscriptionCollateral);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    const state = form.getState();
    const subscription = form.getElementController(state.items[2].id).subscribe(callback);
    subscription.unsubscribe();
    form.getElementController(state.items[0].id).dispatch(new Change('10'));
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
    form.getElementController(form.getState().items[0].id).dispatch(new Change('value2'));
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
    form.getElementController(form.getState().items[0].id).dispatch(new Change('value2'));
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
    form.getElementController(form.getState().items[0].id).dispatch(new Change('value2'));
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
    form.getElementController(state.items[0].id).dispatch(new Change('value2'));
    form.getElementController(state.items[1].id).dispatch(new Change('value2'));
    form.getElementController(state.items[2].id).dispatch(new Change('value2'));
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
    form.getElementController(state.items[0].id).dispatch(new Change('abcd'));
    expect((form.getState().items[0] as FieldJson).valid).toEqual(false);
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
    form.getElementController(form.getState().items[0].id).dispatch(new Change(''));
    const state = form.getState();
    expect((state.items[0] as FieldJson).valid).toEqual(false);
    expect((state.items[0] as FieldJson).errorMessage).toEqual('The value is required');
});

test('an invalid datatype value should set the correct error message on the field', async () => {
    const formJson = create([{
        'f': {
            type: 'number'
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.getElementController(form.getState().items[0].id).dispatch(new Change('abcd'));
    const state = form.getState();
    expect(state.items[0].valid).toEqual(false);
    expect(state.items[0].errorMessage).toEqual('There is an error in the field');
});

test('an invalid constraint in the field should not throw an exception', async () => {
    const formJson = create([{
        'f': {
            type: 'number',
            'positive': true
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.getElementController(form.getState().items[0].id).dispatch(new Change('-10'));
    expect(await form.getState().data).toEqual({'f1': -10});
});

test.skip('an invalid value change should not update the data dom', async () => {
    const formJson = create([{
        'f': {
            type: 'number'
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.getElementController('f1').dispatch(new Change('abcd'));
    expect(form.getState().data).toEqual({});
});

test.skip('an invalid value should remove the old value from the data dom', async () => {
    const formJson = create([{
        'f': {
            type: 'number'
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    const c = form.getElementController('f1');
    c.dispatch(new Change(1));
    expect(form.getState().data).toEqual({f1 : 1});
    c.dispatch(new Change('abcd'));
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
    form.getElementController('f1').dispatch(new Change(''));
    expect((form.getState().items.f1 as FieldJson).valid).toEqual(false);
    expect((form.getState().items.f1 as FieldJson).errorMessage).toEqual('The value is required');

    form.getElementController('f1').dispatch(new Change('1234'));
    expect((form.getState().items.f1 as FieldJson).valid).toEqual(true);
    expect((form.getState().items.f1 as FieldJson).errorMessage).toEqual('');

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
    }]);
    let form = await createFormInstance(formJson);
    const state = form.getState();
    form.getElementController(state.items[0].id).dispatch(new Change('10'));
    form.getElementController(state.items[1].id).dispatch(new Change('value2'));
    form.getElementController(state.items[2].id).dispatch(new Change('true'));
    expect(await form.getState().data).toEqual({
        number: 10,
        string: 'value2',
        boolean: true
    });
});

test('custom event should be executed for all the fields', async () => {
    const formJson = create([{
        'f': {
            'type' : 'number',
            'events': {
                'custom:customClick': '{"value" : 1 + 3}'
            }
        }
    }, {
        'f': {
            'type' : 'number',
            'events': {
                'custom:customClick': '{"value" : 2 + 3}'
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    form.dispatch(new CustomEvent('customClick', null, true));
    let f: FieldJson = form.getState().items[0];
    expect(f.value).toEqual(4);
    f = form.getState().items[1];
    expect(f.value).toEqual(5);
});

test('custom event should pass the payload to the event', async () => {
    const formJson = create([{
        'f': {
            'type' : 'number',
            'events': {
                'custom:customClick1': '{"value" : 1 + $event.payload.add}'
            }
        }
    }, {
        'f': {
            'label': {
                'value' : 'myfield'
            },
            'events': {
                'custom:customClick2': '{"value" : $event.target.label.value}'
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    form.dispatch(new CustomEvent('customClick1', {add: 3}, true));
    let f: FieldJson = form.getState().items[0];
    expect(f.value).toEqual(4);

    form.dispatch(new CustomEvent('customClick2', null, true));
    f = form.getState().items[1];
    expect(f.value).toEqual('myfield');

});

test('dataRef none should not update the data dom', async () => {
    const formJson = create([{
        'f': {
            'type' : 'number',
            'dataRef' : 'none'
        }
    }]);
    let form = await createFormInstance(formJson);
    form.getElementController(form.getState().items[0].id).dispatch(new Change(5));
    const state = form.getState();
    let f: FieldJson = state.items[0];
    expect(f.value).toEqual(5);
    expect(await state.data).toEqual({});
});

test.todo('if dataRef is is invalid data should not get generated for that field');
test('object returned in event should be applied to the field properties', async () => {
    const formJson = create(['f', {
        'f' : {
            type: 'number',
            'events' : {
                'click' : '{"value" : 2 + 3}'
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    form.getElementController(form.getState().items[1].id).dispatch(new Click());
    expect(form.getState().items[1].value).toEqual(5);
});

test('object returned in custom event should be applied to the field properties', async () => {
    const formJson = create(['f', {
        'f' : {
            'type' : 'number',
            'events' : {
                'custom:Click' : '{"value" : 2 + $event.payload}'
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    form.getElementController(form.getState().items[1].id).dispatch(new CustomEvent('Click', 3));
    expect(form.getState().items[1].value).toEqual(5);
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
    form.getElementController(state.items[2].id).subscribe( callbackC1);
    form.getElementController(state.items[1].id).subscribe( callbackB1);
    form.getElementController(state.items[0].id).dispatch(new Change( '10'));
    expect(callbackC1).toHaveBeenCalled();
    expect(callbackB1).not.toHaveBeenCalled();
});

test('subscription gets invoked only if the state changes', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    const state = form.getState();
    const f1 = form.getElementController(state.items[0].id);
    f1.subscribe( callback);
    f1.dispatch(new Change( undefined));
    expect(callback).toHaveBeenCalled();
});

test('fetching element without passing id', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    // @ts-ignore
    const emptyController = form.getElementController();
    expect(emptyController).toBeDefined();
    expect(emptyController).toBeInstanceOf(EmptyController);
});

test('Rule Node for a Form should have correct hierarchy', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = new Form(formJson, new RuleEngine());
    const r1 = form.getRuleNode();
    expect(r1.f1.$name).toEqual('f1');
    expect(r1.f2.$name).toEqual('f2');
    expect(r1.f3.$name).toEqual('f3');
});

test('Rule Node for a Panel should have correct hierarchy', async () => {
    const formJson = create(['f', ['f', 'f'], 'f']);
    let form = new Form(formJson, new RuleEngine());
    const r1 = form.getRuleNode();
    expect(r1.f1.$name).toEqual('f1');
    expect(r1.p1.f2.$name).toEqual('f2');
    expect(r1.p1.f3.$name).toEqual('f3');
    expect(r1.f2.$name).toEqual('f2');
});

test('Rule Node for a Panel with type array should have correct hierarchy', async () => {
    const formJson = {
        items : [
            {
                name : 'panel',
                type : 'array',
                items: [
                    {
                        name:  'field',
                        type : 'number'
                    }
                ]
            }
        ]
    };
    let form = new Form(formJson, new RuleEngine());
    const r1 = form.getRuleNode();
    expect(r1.panel).toBeInstanceOf(Array);
});