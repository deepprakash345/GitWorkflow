import {create, formWithRules} from '../collateral';
import {createFormInstance} from '../../FormInstance';
import {Change, Click, CustomEvent} from '../../controller/Actions';
import Form from '../../Form';
import {FieldJson} from '../../Types';

test('fetch an element from form', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const f1 = form.getElement('f1') as FieldJson;
    expect(f1?.[':name']).toEqual('f1');
});

test('fetch a nested element from form', async () => {
    const formJson = create(['f', [['f', 'f'], 'f', 'f'], 'f']);
    let form = await createFormInstance(formJson);
    const f1 = form.getElement('p1.p2.f2') as FieldJson;
    expect(f1[':name']).toEqual('f2');
});

test('fetch $form from form', async () => {
    const formJson = create(['f', [['f', 'f'], 'f', 'f'], 'f']);
    let form = await createFormInstance(formJson);
    const f1 = form.getElement('$form');
    expect(f1).toEqual(form.getState());
});

test('form with rules', async () => {
    const formJson: any = Object.assign({}, formWithRules);
    formJson[':items'].firstName[':value'] = 'john';
    formJson[':items'].lastName[':value'] = 'doe';
    let form = await createFormInstance(formJson);
    form.executeAllRules();
    let field = form.json()[':items'].fullName as FieldJson;
    expect(field[':value']).toEqual('john doe');
});

const changeSpec = [
    {
        'name': 'update on change event for normal field',
        'items': ['f', 'f', 'f'],
        'event': new Change('f1', 'value1'),
        'expected': (form: Form) => {
            expect(form.items.f1).toEqual(expect.objectContaining({
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

test('subscription gets invoked whenever the state changes', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    form.subscribe('f1', callback);
    form.dispatch(new Change('f1', 'value2'));
    expect(callback).toHaveBeenCalled();
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

test('subscription gets invoked for dependent fields', async () => {
    const formJson = create(subscriptionCollateral);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    form.subscribe('c1', callback);
    form.dispatch(new Change('a1', '10'));
    expect(callback).toHaveBeenCalled();
});

test("subscription doesn't get invoked after unsubscribing", async() => {
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
        e : 'default value'
    });
});

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

test.todo('dataDom is updated as per the dataType of the element'); /*
const formJson = create([{
        'f' : {
            ':constraints' : {
                ':dataType' : 'number'
            }
            ':dataRef' : 'number'
        }
    }, {
        'f' : {
            ':constraints' : {
                ':dataType' : 'string'
            }
            ':dataRef' : 'string'
        }
    }, {
        'f' : {
            ':constraints' : {
                ':dataType' : 'boolean'
            }
            ':dataRef' : 'boolean'
        }
    }]);
    let form = await createFormInstance(formJson);
    form.dispatch(new Change('f1', '10'));
    form.dispatch(new Change('f2', 'value2'));
    form.dispatch(new Change('f3', 'true'));
    expect(form.getState().data).toEqual({
        number : 10,
        string : 'value2',
        boolean: true
    });
    */

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

test('custom event should be executed for all the fields', async () => {
    const formJson = create([{
        'f' : {
            ':events' : {
                'customClick' : '{":value" : 1 + 3}'
            }
        }
    }, {
        'f' : {
            ':events' : {
                'customClick' : '{":value" : 2 + 3}'
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
        'f' : {
            ':events' : {
                'customClick1' : '{":value" : 1 + $event.payload.add}'
            }
        }
    }, {
        'f' : {
            ':title' : 'myfield',
            ':events' : {
                'customClick2' : '{":value" : $event.target.title}'
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