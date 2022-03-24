import {createFormInstance} from '../src';

test('unnamed panel should not alter structure of data', () => {
    const formJson = {
        items: [
            {
                fieldType: 'panel',
                type: 'object',
                items: [
                    {
                        name : 'price',
                        type: 'number',
                        fieldType: 'text-input'
                    },
                    {
                        name : 'quantity',
                        type: 'number',
                        fieldType: 'text-input'
                    },
                    {
                        name : 'total',
                        type: 'number',
                        fieldType: 'text-input',
                        rules: {
                            value : 'price * quantity'
                        }
                    }
                ]
            }
        ]
    };
    const expectedData = {
        'price' : 100,
        'quantity' : 10,
        'total' : 1000
    };
    const form = createFormInstance(formJson);
    const p = form.items?.[1]; // referring to [1] since [0] points to unnamed panel // ideally get by name
    const q = form.items?.[2];
    const t = form.items?.[3];
    //@ts-ignore
    p.value = '100';
    //@ts-ignore
    q.value = '10';
    expect(t?.value).toEqual(1000);
    const r1 = form.exportData();
    expect(r1).toEqual(expectedData);
});
