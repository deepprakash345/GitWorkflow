import {create, formWithRules} from '../collateral';
import {createFormInstance} from '../../src/FormInstance';
import {Change, Click, CustomEvent} from '../../src/controller/Actions';
import Form from '../../src/Form';
import {FieldJson} from '../../src/types';

test('fetch an element from form', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const f1 = form.getElement('f1').json() as FieldJson;
    expect(f1?.[':name']).toEqual('f1');
});

test('fetch a nested element from form', async () => {
    const formJson = create(['f', [['f', 'f'], 'f', 'f'], 'f']);
    let form = await createFormInstance(formJson);
    const f1 = form.getElement('p1.p2.f2').json() as FieldJson;
    expect(f1[':name']).toEqual('f2');
});

test('fetch $form from form', async () => {
    const formJson = create(['f', [['f', 'f'], 'f', 'f'], 'f']);
    let form = await createFormInstance(formJson);
    const f1 = form.getElement('$form');
    expect(f1.json()).toEqual(form.getState());
});

test('form with rules', async () => {
    const formJson: any = Object.assign({}, formWithRules);
    formJson[':items'].firstName[':value'] = 'john';
    formJson[':items'].lastName[':value'] = 'doe';
    let form = await createFormInstance(formJson);
    let field = form.json()[':items'].fullName as FieldJson;
    expect(field[':value']).toEqual('john doe');
});

const changeSpec = [
    {
        'name': 'update on change event for normal field',
        'items': ['f', 'f', 'f'],
        'event': new Change('f1', 'value1'),
        'expected': (form: Form) => {
            expect(form.getState()[':items'].f1).toEqual(expect.objectContaining({
                ':name': 'f1',
                ':value': 'value1'
            }));
        }
    }
];

test.each(changeSpec)('$name', async ({items, event, expected}) => {
    const formJson = create(items);
    let form = await createFormInstance(formJson);
    form.dispatch(event);
    expected(form);
});

test('dispatching an event on unknown field throws exception', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    expect(() => {
        form.dispatch(new Change('a1', 'value1'));
    }).toThrow("invalid action change. a1 doesn't exist");
});

test('dispatching an event on a field without rule should not throw exception', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const state = form.getState();
    form.dispatch(new Click('f1', {}));
    expect(state).toEqual(form.getState());
});

test('default subscription gets invoked only when the state changes', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    form.subscribe('f1', callback);
    form.dispatch(new Change('f1', 'value2'));
    form.dispatch(new Click('f1', {}));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('f1', expect.anything(), 'change');

});

test('change subscription gets invoked only when the change event is triggered', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    form.subscribe('f1', callback, 'change');
    form.dispatch(new Change('f1', 'value2'));
    form.dispatch(new Click('f1', {}));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('f1', expect.anything(), 'change');
});

test('click subscription gets invoked only when that click event is triggered', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    form.subscribe('f1', callback, 'click');
    form.dispatch(new Change('f1', 'value2'));
    form.dispatch(new Click('f1', 'value2'));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('f1', expect.anything(), 'click');
});

test('multiple subscription can be registered for a field', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    let callback1 = jest.fn();
    form.subscribe('f1', callback, 'change');
    form.subscribe('f1', callback1, 'click');
    form.dispatch(new Change('f1', 'value2'));
    form.dispatch(new Click('f1', 'value2'));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('f1', expect.anything(), 'change');
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith('f1', expect.anything(), 'click');
});

test('unsubscribing from one event does not affect other subscriptions', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    let callback1 = jest.fn();
    let x = form.subscribe('f1', callback, 'change');
    form.subscribe('f1', callback1, 'click');
    x.unsubscribe();
    form.dispatch(new Change('f1', 'value2'));
    form.dispatch(new Click('f1', 'value2'));
    expect(callback).not.toHaveBeenCalled();
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith('f1', expect.anything(), 'click');
});

test('custom event subscription can be registered', async () => {
    const formJson = create([{
        f: {
            ':events': {
                'customEvent': 'f2.value > 20'
            }
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    form.subscribe('f1', callback, 'customEvent');
    form.dispatch(new CustomEvent('customEvent', 'value2', 'f1'));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('f1', expect.anything(), 'customEvent');
});

const subscriptionCollateral = ['a',
    {
        b: {
            ':rules': {
                ':required': 'd.value > 20'
            }
        }
    },
    {
        c:
            {
                ':rules': {
                    ':value': 'a1.value + b1.value'
                }
            }
    }, 'd'];

test('default subscription gets invoked for dependent fields', async () => {
    const formJson = create(subscriptionCollateral);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    form.subscribe('c1', callback);
    form.dispatch(new Change('a1', '10'));
    expect(callback).toHaveBeenCalled();
});

test('change event subscription gets invoked for dependent fields', async () => {
    const formJson = create(subscriptionCollateral);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    form.subscribe('c1', callback, 'change');
    form.dispatch(new Change('a1', '10'));
    expect(callback).toHaveBeenCalled();
});


test("subscription doesn't get invoked after unsubscribing", async () => {
    const formJson = create(subscriptionCollateral);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    const subscription = form.subscribe('c1', callback);
    subscription.unsubscribe();
    form.dispatch(new Change('a1', '10'));
    expect(callback).not.toHaveBeenCalled();
});

const nonStringRules = [
    {
        name: 'object',
        rules: {
            ':prop': {}
        }
    },
    {
        name: 'boolean',
        rules: {
            ':prop': true
        }
    },
    {
        name: 'number',
        rules: {
            ':prop': 1
        }
    },
    {
        name: 'array',
        type: 'object',
        rules: {
            ':prop': []
        }
    },
    {
        name: 'null',
        type: 'object',
        rules: {
            ':prop': null
        }
    }];

test.each(nonStringRules)('rules with $name type throw an exception', async ({name, type, rules}) => {
    const formJson = create([{
        f: {
            ':rules': rules
        }
    }]);
    await expect(createFormInstance(formJson)).rejects.toThrow(`only expression strings are supported. ${type === undefined ? name : type} types are not supported`);

});

test('a value change updates the dataDom as well', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.dispatch(new Change('f1', 'value2'));
    expect(form.getState()[':data']).toEqual({
        'f1': 'value2'
    });
});

test('a value change updates the nested dataDom as well', async () => {
    const formJson = create([{
        'f': {
            ':dataRef': 'a.b.c.d'
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.dispatch(new Change('f1', 'value2'));
    expect(form.getState()[':data']).toEqual({
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
            ':dataRef': 'a.b.c.d'
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.dispatch(new Change('f1', 'value2'));
    expect(form.getState()[':data']).toEqual({
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
            ':dataRef': 'a.b.c.d'
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.dispatch(new Change('f1', 'value2'));
    form.dispatch(new Change('f2', 'value2'));
    form.dispatch(new Change('f3', 'value2'));
    expect(form.getState()[':data']).toEqual({
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
        'f' : {
            ':constraints' : {
                ':dataType' : 'number'
            }
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.dispatch(new Change('f1', 'abcd'));
    expect((form.getState()[':items'].f1 as FieldJson)[':valid']).toEqual(false);
});

test('an invalid value change should set the correct error message on the field', async () => {
    const formJson = create([{
        'f' : {
            ':constraints' : {
                ':required' : 'true'
            },
            ':constraintMessages' : {
                ':required' : 'The value is required'
            }
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.dispatch(new Change('f1', ''));
    expect((form.getState()[':items'].f1 as FieldJson)[':valid']).toEqual(false);
    expect((form.getState()[':items'].f1 as FieldJson)[':errorMessage']).toEqual('The value is required');
});

test('an invalid datatype value should set the correct error message on the field', async () => {
    const formJson = create([{
        'f' : {
            ':constraints' : {
                ':dataType' : 'number'
            }
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.dispatch(new Change('f1', 'abcd'));
    expect((form.getState()[':items'].f1 as FieldJson)[':valid']).toEqual(false);
    expect((form.getState()[':items'].f1 as FieldJson)[':errorMessage']).toEqual('There is an error in the field');
});

test('an invalid constraint in the field should not throw an exception', async () => {
    const formJson = create([{
        'f' : {
            ':constraints' : {
                ':dataType' : 'number',
                ':positive' : true
            }
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.dispatch(new Change('f1', '-10'));
    expect(form.getState()[':data']).toEqual({'f1' : -10});
});

test('an invalid value change should not update the data dom', async () => {
    const formJson = create([{
        'f' : {
            ':constraints' : {
                ':dataType' : 'number'
            }
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.dispatch(new Change('f1', 'abcd'));
    expect(form.getState()[':data']).toEqual({});
});

test('making a value valid resets the valid state and removes the errorMessage', async () => {
    const formJson = create([{
        'f' : {
            ':constraints' : {
                ':required' : 'true'
            },
            ':constraintMessages' : {
                ':required' : 'The value is required'
            }
        }
    }, 'f', 'f']);
    let form = await createFormInstance(formJson);
    form.dispatch(new Change('f1', ''));
    expect((form.getState()[':items'].f1 as FieldJson)[':valid']).toEqual(false);
    expect((form.getState()[':items'].f1 as FieldJson)[':errorMessage']).toEqual('The value is required');

    form.dispatch(new Change('f1', '1234'));
    expect((form.getState()[':items'].f1 as FieldJson)[':valid']).toEqual(true);
    expect((form.getState()[':items'].f1 as FieldJson)[':errorMessage']).toEqual('');

});

test('rules should modify the data dom', async () => {
    const formJson = create(['f', 'f', {
        'f': {
            ':dataRef': 'e',
            ':rules': {
                ':value': "'default value'"
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    expect(form.getState()[':data']).toEqual({
        e: 'default value'
    });
});

test('dataDom is updated as per the dataType of the element', async () => {
    const formJson = create([{
        'f': {
            ':constraints': {
                ':dataType': 'number'
            },
            ':dataRef': 'number'
        }
    }, {
        'f': {
            ':constraints': {
                ':dataType': 'string'
            },
            ':dataRef': 'string'
        }
    }, {
        'f': {
            ':constraints': {
                ':dataType': 'boolean'
            },
            ':dataRef': 'boolean'
        }
    }]);
    let form = await createFormInstance(formJson);
    form.dispatch(new Change('f1', '10'));
    form.dispatch(new Change('f2', 'value2'));
    form.dispatch(new Change('f3', 'true'));
    expect(form.getState()[':data']).toEqual({
        number: 10,
        string: 'value2',
        boolean: true
    });
});

test('custom event should be executed for all the fields', async () => {
    const formJson = create([{
        'f': {
            ':events': {
                'customClick': '{":value" : 1 + 3}'
            }
        }
    }, {
        'f': {
            ':events': {
                'customClick': '{":value" : 2 + 3}'
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    form.dispatch(new CustomEvent('customClick', null));
    let f: FieldJson = form.getState()[':items'].f1;
    expect(f[':value']).toEqual(4);
    f = form.getState()[':items'].f2;
    expect(f[':value']).toEqual(5);
});

test('custom event should pass the payload to the event', async () => {
    const formJson = create([{
        'f': {
            ':events': {
                'customClick1': '{":value" : 1 + $event.payload.add}'
            }
        }
    }, {
        'f': {
            ':title': 'myfield',
            ':events': {
                'customClick2': '{":value" : $event.target.title}'
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    form.dispatch(new CustomEvent('customClick1', {add: 3}));
    let f: FieldJson = form.getState()[':items'].f1;
    expect(f[':value']).toEqual(4);

    form.dispatch(new CustomEvent('customClick2', null));
    f = form.getState()[':items'].f2;
    expect(f[':value']).toEqual('myfield');

});

test.todo('if dataRef is is invalid data should not get generated for that field');
test.todo('object returned in event should be applied to the field properties');/*, async () => {
    const formJson = create(['f', {
        'f' : {
            ':events' : {
                ':click' : '{":value" : 2 + 3}'
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    form.dispatch(new Click('f2', null));
    expect(form.getState()[':items'].f2[':value']).toEqual(5);
});*/

test.todo('object returned in custom event should be applied to the field properties');/*, async () => {
    const formJson = create(['f', {
        'f' : {
            ':events' : {
                'customClick' : '{":value" : 2 + 3}'
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    form.dispatch(new CustomEvent('customClick', null, 'f2'));
    expect(form.getState()[':items'].f2[':value']).toEqual(5);
});*/

test.todo('rules using default values should modify the data dom');/*, () => {
    const formJson = create([{
        'f': {
            ':dataRef': 'a.b.c.d',
            ':default': 'john'
        }
    }, {
        'f': {
            ':default': 'doe'
        }
    }, {
        'f': {
            ':dataRef': 'e',
            ':rules': {
                ':value': '$form.f1.value + $form.f2.value'
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
            ':dataRef' : 'a.b.c.d'
        }
    }, {
       'f' : {
            ':dataRef' : 'a.b'
       }
    }, 'f']);*/

test.todo('default values should also modify the data dom');/* () => {
    const formJson = create([{
        'f': {
            ':dataRef': 'a.b.c.d',
            ':defaultValue': 'test'
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

test.todo('subscription gets invoked only for dependent fields');/*, () => {
    const formJson = create(subscriptionCollateral);
    let form = await createFormInstance(formJson);
    let callbackc1 = jest.fn();
    let callbackb1 = jest.fn();
    form.subscribe('c1', callbackc1);
    form.subscribe('b1', callbackb1);
    form.dispatch(new Change('a1', '10'));
    expect(callbackc1).toHaveBeenCalled();
    expect(callbackb1).not.toHaveBeenCalled();
});*/

test.todo('subscription gets invoked only if the state changes');/*, () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    form.subscribe('f1', callback);
    form.dispatch(new Change('f1', 'value2'));
    expect(callback).not.toHaveBeenCalled();
});*/

test.todo('dispatching a click action should trigger the click rule of the field');
