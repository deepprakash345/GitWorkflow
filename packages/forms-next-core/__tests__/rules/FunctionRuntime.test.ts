import {create} from '../collateral';
import {createFormInstance} from '../../src';
import FunctionRuntime from '../../src/rules/FunctionRuntime';
import {Change, CustomEvent} from '../../src/controller/Actions';
import nock from 'nock';

test('should return all the publically exposed functions', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const f = new FunctionRuntime(form);
    const result = f.getFunctions();
    expect(result.get_data).toBeInstanceOf(Function);
    expect(result.validate).toBeInstanceOf(Function);
    expect(result.submit_form).toBeInstanceOf(Function);
    expect(result.show_message_box).toBeInstanceOf(Function);
    expect(result.dispatch_event).toBeInstanceOf(Function);
});

test('getData should return the current state of the form data', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const f = new FunctionRuntime(form);
    form.dispatch(new Change('f1', 'value2'));
    expect(f.getFunctions().get_data()).toEqual({'f1' : 'value2'});
});

test('getData should return the current state of the data', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const f = new FunctionRuntime(form);
    form.dispatch(new Change('f1', 'value2'));
    expect(f.getFunctions().get_data()).toEqual({'f1' : 'value2'});
});

const API_HOST = 'http://api.aem-forms.com';

test('submit should send a request to the url configured', async () => {
    const scope = nock(API_HOST)
        .post('/my-submit-end-point')
        .reply(200, {});
    const formJson = create(['f', 'f', 'f']);
    formJson[':metadata'] = {
        ':action':  `${API_HOST}/my-submit-end-point`
    };
    let form = await createFormInstance(formJson);
    const f = new FunctionRuntime(form);
    form.dispatch(new Change('f1', 'value2'));
    await f.submit('event1', 'event2');
    expect(scope.isDone()).toEqual(true);
});

test('submit success event should be dispatched', async () => {
    nock(API_HOST)
        .post('/my-submit-end-point')
        .reply(200, {});
    const formJson = create(['f', 'f', 'f']);
    formJson[':metadata'] = {
        ':action':  `${API_HOST}/my-submit-end-point`
    };
    let form = await createFormInstance(formJson);
    const f = new FunctionRuntime(form);
    form.dispatch(new Change('f1', 'value2'));
    form.dispatch = jest.fn();
    await f.submit('event1', 'event2');
    expect(form.dispatch).toHaveBeenCalledWith(new CustomEvent('event1', {}, '$all'));
});

test('submit success event should be dispatched', async () => {
    nock(API_HOST)
        .post('/my-submit-end-point')
        .reply(200, {});
    const formJson = create([{'f' : {
            ':events' : {
                'event1' : '{":title" : \'Thank you for submitting the form\'}'
            }
        }}, 'f', 'f']);
    formJson[':metadata'] = {
        ':action':  `${API_HOST}/my-submit-end-point`
    };
    let form = await createFormInstance(formJson);
    const f = new FunctionRuntime(form);
    form.dispatch(new Change('f1', 'value2'));
    await f.submit('event1', 'event2');
    expect(form.getState()[':items'].f1[':title']).toEqual('Thank you for submitting the form');
});

test('submit error event should be dispatched if service returns error', async () => {
    nock(API_HOST)
        .post('/my-submit-end-point')
        .reply(404);
    const formJson = create([{'f' : {
            ':events' : {
                'event1' : '{":title" : \'Thank you for submitting the form\'}'
            }
        }}, 'f', 'f']);
    formJson[':metadata'] = {
        ':action':  `${API_HOST}/my-submit-end-point`
    };
    let form = await createFormInstance(formJson);
    const f = new FunctionRuntime(form);
    form.dispatch(new Change('f1', 'value2'));
    form.dispatch = jest.fn();
    await f.submit('event1', 'event2');
    expect(form.dispatch).toHaveBeenCalledWith(new CustomEvent('event2', {}, '$all'));
});

test('submit_form should call the submit api', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const f = new FunctionRuntime(form);
    f.submit = jest.fn();
    f.getFunctions().submit_form('e1', 'e2');
    expect(f.submit).toHaveBeenCalledWith('e1', 'e2');
});

test('submit_form should return {}', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const f = new FunctionRuntime(form);
    f.submit = jest.fn();
    expect(f.getFunctions().submit_form('e1', 'e2')).toEqual({});
});

test('dispatch_event should invoke dispatch API', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const f = new FunctionRuntime(form);
    form.dispatch = jest.fn();
    f.getFunctions().dispatch_event('event1', {x: 'y'});
    expect(form.dispatch).toHaveBeenCalledWith(new CustomEvent('event1', {x : 'y'}, '$all'));

    f.getFunctions().dispatch_event({':id'  : '$form'}, 'event1', {x: 'y'});
    expect(form.dispatch).toHaveBeenCalledWith(new CustomEvent('event1', {x : 'y'}, '$form'));
});