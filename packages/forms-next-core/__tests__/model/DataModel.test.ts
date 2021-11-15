import {create} from '../collateral';
import {createFormInstance, FieldJson} from '../../src';
import {Change} from '../../src/controller/Controller';

test('Form should be prefilled from data', async () => {
    let json = create(['f', 'f', 'f']);
    json.data = {
        'f1' : 'x',
        'f2' : 'y',
        'f3' : 'z'
    };
    const form = await createFormInstance(json);
    const state= form.getState();
    expect(state.data).toEqual(json.data);
    expect(state.items[0].value).toEqual(json.data.f1);
    expect(state.items[1].value).toEqual(json.data.f2);
    expect(state.items[2].value).toEqual(json.data.f3);
});

test('Hierarchical structure should be honored in the data model', async () => {
    let json = create(['f', ['f', 'f', ['f']], 'f']);
    json.data = {
        'f1' : 'x',
        'p1' : {
            'f2' : 'y',
            'f3' : 'z',
            'p2' : {
                'f4' : 'a'
            }
        },
        'f2' : 'b'
    };
    const form = await createFormInstance(json);
    const state= form.getState();
    expect(state.data).toEqual(json.data);
    expect(state.items[0].value).toEqual(json.data.f1);
    expect(state.items[1].items[0].value).toEqual(json.data.p1.f2);
    expect(state.items[1].items[1].value).toEqual(json.data.p1.f3);
    expect(state.items[1].items[2].items[0].value).toEqual(json.data.p1.p2.f4);
    expect(state.items[2].value).toEqual(json.data.f2);
});

test('dataRef none does not create hierarchy', async () => {
    let json = create(['f', ['f', 'f', ['f']], {'f5' : {'name' : 'f5'}}]);
    json.items[1].dataRef = 'none';
    json.data = {
        'f1' : 'x',
        'f2' : 'y',
        'f3' : 'z',
        'p2' : {
            'f4' : 'a'
        },
        'f5' : 'b'
    };
    const form = await createFormInstance(json);
    const state= form.getState();
    expect(state.data).toEqual(json.data);
    expect(state.items[0].value).toEqual(json.data.f1);
    expect(state.items[1].items[0].value).toEqual(json.data.f2);
    expect(state.items[1].items[1].value).toEqual(json.data.f3);
    expect(state.items[1].items[2].items[0].value).toEqual(json.data.p2.f4);
    expect(state.items[2].value).toEqual(json.data.f5);
});

test('explicit dataRef can create separate data hierarchy', async () => {
    let json = create(['f', ['f', 'f', ['f']], {'f5' : {'name' : 'f5', 'dataRef' : 'x.a.b.c'}}]);
    json.items[1].dataRef = 'none';
    json.data = {
        'f1' : 'x',
        'f2' : 'y',
        'f3' : 'z',
        'p2' : {
            'f4' : 'a'
        },
        'x' : {
            'a' : {
                'b' : {
                    'c' : 'f5'
                }
            }
        }
    };
    const form = await createFormInstance(json);
    const state= form.getState();
    expect(state.data).toEqual(json.data);
    expect(state.items[0].value).toEqual(json.data.f1);
    expect(state.items[1].items[0].value).toEqual(json.data.f2);
    expect(state.items[1].items[1].value).toEqual(json.data.f3);
    expect(state.items[1].items[2].items[0].value).toEqual(json.data.p2.f4);
    expect(state.items[2].value).toEqual(json.data.x.a.b.c);
});

test('panel with explicit dataRef', async () => {
    let json = create(['f', ['f', 'f', ['f']], 'f']);
    json.items[1].dataRef = 'a.b.c';
    json.data = {
        'f1' : 'x',
        'a' : {
            'b' : {
                'c' : {
                    'f2' : 'y',
                    'f3' : 'z',
                    'p2' : {
                        'f4' : 'a'
                    }
                }
            }
        },
        'f2' : 'b'
    };
    const form = await createFormInstance(json);
    const state= form.getState();
    expect(state.data).toEqual(json.data);
    expect(state.items[0].value).toEqual(json.data.f1);
    expect(state.items[1].items[0].value).toEqual(json.data.a.b.c.f2);
    expect(state.items[1].items[1].value).toEqual(json.data.a.b.c.f3);
    expect(state.items[1].items[2].items[0].value).toEqual(json.data.a.b.c.p2.f4);
    expect(state.items[2].value).toEqual(json.data.f2);
});

test('data model should be created on change events', async () => {
    let json = create(['f', ['f', 'f', ['f']], 'f']);
    json.items[1].dataRef = 'a.b.c';
    const expectedData = {
        'f1' : 'x',
        'a' : {
            'b' : {
                'c' : {
                    'f2' : 'y',
                    'f3' : 'z',
                    'p2' : {
                        'f4' : 'a'
                    }
                }
            }
        },
        'f2' : 'b'
    };
    const form = await createFormInstance(json);
    const initialState = form.getState();
    form.getElementController(initialState.items[0].id).dispatch(new Change('x'));
    form.getElementController(initialState.items[2].id).dispatch(new Change('b'));
    form.getElementController(initialState.items[1].items[0].id).dispatch(new Change('y'));
    form.getElementController(initialState.items[1].items[1].id).dispatch(new Change('z'));
    form.getElementController(initialState.items[1].items[2].items[0].id).dispatch(new Change('a'));
    const state= form.getState();
    expect(state.data).toEqual(expectedData);
    expect(state.items[0].value).toEqual(expectedData.f1);
    expect(state.items[1].items[0].value).toEqual(expectedData.a.b.c.f2);
    expect(state.items[1].items[1].value).toEqual(expectedData.a.b.c.f3);
    expect(state.items[1].items[2].items[0].value).toEqual(expectedData.a.b.c.p2.f4);
    expect(state.items[2].value).toEqual(expectedData.f2);

    expect(state.items[0].value).toEqual(expectedData.f1);
    expect(state.items[1].items[0].value).toEqual(expectedData.a.b.c.f2);
    expect(state.items[1].items[1].value).toEqual(expectedData.a.b.c.f3);
    expect(state.items[1].items[2].items[0].value).toEqual(expectedData.a.b.c.p2.f4);
    expect(state.items[2].value).toEqual(expectedData.f2);
});