//@ts-ignore
import * as formJson from './collateral/MultipleEventHandler.form.json';
import {createFormInstance} from '../src';
import {Click} from '../src/controller/Controller';

test('multiple event handlers should get executed', () => {
    const form = createFormInstance(formJson);
    form.items[2].dispatch(new Click());
    expect(form.items[3].value).toEqual('a');
    expect(form.items[4].value).toEqual('b');
});