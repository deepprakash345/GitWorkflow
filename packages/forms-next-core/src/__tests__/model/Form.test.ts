import {create, formWithRules} from '../collateral';
import {createFormInstance} from '../../FormInstance';
import {Change} from '../../controller/Actions';
import Form from '../../Form';

test('fetch an element from form', () => {
    const formJson = create(['f', 'f', 'f']);
    let form = createFormInstance(formJson);
    const f1 = form.getElement('f1');
    expect(f1[':name']).toEqual('f1');
});

test('fetch a nested element from form', () => {
    const formJson = create(['f', [['f', 'f'], 'f', 'f'], 'f']);
    let form = createFormInstance(formJson);
    const f1 = form.getElement('p1.p2.f2');
    expect(f1[':name']).toEqual('f2');
});

test('form with rules', () => {
    const formJson: any = Object.assign({}, formWithRules);
    formJson[':items'].firstName[':value'] = 'john';
    formJson[':items'].lastName[':value'] = 'doe';
    let form = createFormInstance(formJson);
    form.executeAllRules();
    expect(form.json()[':items'].fullName[':value']).toEqual('john doe');
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

test.each(changeSpec)('$name', ({items, event, expected}) => {
    const formJson = create(items);
    let form = createFormInstance(formJson);
    form.dispatch(event);
    expected(form);
});

test('dispatching an event on unknown field throws exception', () => {
    const formJson = create(['f', 'f', 'f']);
    let form = createFormInstance(formJson);
    expect(() => {
        form.dispatch(new Change('a1', 'value1'));
    }).toThrow("invalid action change. a1 doesn't exist");
});

test('subscription gets invoked whenever the state changes', () => {
    const formJson = create(['f', 'f', 'f']);
    let form = createFormInstance(formJson);
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

test('subscription gets invoked for dependent fields', () => {
    const formJson = create(subscriptionCollateral);
    let form = createFormInstance(formJson);
    let callback = jest.fn();
    form.subscribe('c1', callback);
    form.dispatch(new Change('a1', '10'));
    expect(callback).toHaveBeenCalled();
});

test("subscription doesn't get invoked after unsubscribing", () => {
    const formJson = create(subscriptionCollateral);
    let form = createFormInstance(formJson);
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

test.each(nonStringRules)('rules with $name type throw an exception', ({name, type, rules}) => {
    const formJson = create([{
        f: {
            ':rules': rules
        }
    }]);
    expect(() => {
        createFormInstance(formJson);
    }).toThrow(`only expression strings are supported. ${type === undefined ? name : type} types are not supported`);

});

test.todo('subscription gets invoked only for dependent fields');/*, () => {
    const formJson = create(subscriptionCollateral);
    let form = createFormInstance(formJson);
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
    let form = createFormInstance(formJson);
    let callback = jest.fn();
    form.subscribe('f1', callback);
    form.dispatch(new Change('f1', 'value2'));
    expect(callback).not.toHaveBeenCalled();
});*/

test('a value change updates the dataDom as well', () => {
    const formJson = create(['f', 'f', 'f']);
    let form = createFormInstance(formJson);
    form.dispatch(new Change('f1', 'value2'));
    expect(form.getState().data).toEqual({
        'f1': 'value2'
    });
});

test('a value change updates the nested dataDom as well', () => {
    const formJson = create([{
        'f': {
            ':dataRef': 'a.b.c.d'
        }
    }, 'f', 'f']);
    let form = createFormInstance(formJson);
    form.dispatch(new Change('f1', 'value2'));
    expect(form.getState().data).toEqual({
        a: {
            b: {
                c: {
                    d: 'value2'
                }
            }
        }
    });
});


test('a value change updates the nested dataDom as well', () => {
    const formJson = create([{
        'f': {
            ':dataRef': 'a.b.c.d'
        }
    }, 'f', 'f']);
    let form = createFormInstance(formJson);
    form.dispatch(new Change('f1', 'value2'));
    expect(form.getState().data).toEqual({
        a: {
            b: {
                c: {
                    d: 'value2'
                }
            }
        }
    });
});

test('multiple field changes also keep the data modified', () => {
    const formJson = create([{
        'f': {
            ':dataRef': 'a.b.c.d'
        }
    }, 'f', 'f']);
    let form = createFormInstance(formJson);
    form.dispatch(new Change('f1', 'value2'));
    form.dispatch(new Change('f2', 'value2'));
    form.dispatch(new Change('f3', 'value2'));
    expect(form.getState().data).toEqual({
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
    let form = createFormInstance(formJson);
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

test.todo('rules should modify the data dom');/*, () => {
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
    let form = createFormInstance(formJson);
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
    let form = createFormInstance(formJson);
    form.dispatch(new Change('f1', '10'));
    form.dispatch(new Change('f2', 'value2'));
    form.dispatch(new Change('f3', 'true'));
    expect(form.getState().data).toEqual({
        number : 10,
        string : 'value2',
        boolean: true
    });
    */