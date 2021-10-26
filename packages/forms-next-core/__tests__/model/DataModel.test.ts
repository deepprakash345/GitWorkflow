import {create} from '../collateral';
import {createFormInstance, FieldJson} from '../../src';

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
    expect((state.items.f1 as FieldJson).value).toEqual(json.data.f1);
    expect((state.items.f2 as FieldJson).value).toEqual(json.data.f2);
    expect((state.items.f3 as FieldJson).value).toEqual(json.data.f3);
});

test.skip('Hierarchical structure should be honored in the data model', async () => {
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
    expect((state.items.f1 as FieldJson).value).toEqual(json.data.f1);
    expect((state.items.p1.items.f2 as FieldJson).value).toEqual(json.data.p1.f2);
    expect((state.items.p1.items.f3 as FieldJson).value).toEqual(json.data.p1.f3);
    expect((state.items.p1.items.p2.items.f4 as FieldJson).value).toEqual(json.data.p1.p2.f4);
    expect((state.items.f2 as FieldJson).value).toEqual(json.data.f2);
});