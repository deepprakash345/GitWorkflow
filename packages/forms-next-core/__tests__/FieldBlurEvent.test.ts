import {create} from './collateral';
import { createFormInstance} from '../src';
import {Blur} from '../src';
// @ts-ignore


test('blur event should execute as expected', async () => {
    const formJson = create(['f',
        {
            'f': {
                'type' : 'string',
                'view-type' : 'text-input',
                'required': true,
                'constraintMessages': {
                    'required': 'mandatory field'
                },
                'events' : {
                    'blur' : ['{value : upper($field.$value)}', 'validate($event.target)']
                }
            }
        }]);
    let form = await createFormInstance(formJson);
    // @ts-ignore
    form.items[1].dispatch(new Blur());
    expect(form.items[1].valid).toEqual(false);
    // set a value
    form.items[1].value= 'a';
    // @ts-ignore
    form.items[1].dispatch(new Blur());
    expect(form.items[1].valid).toEqual(true);
    expect(form.items[1].value).toEqual('A');
});