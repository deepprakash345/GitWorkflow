import {create} from '../collateral';
import {createFormInstance, FieldJson} from '../../src';
import {Change} from '../../src/controller/Controller';

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