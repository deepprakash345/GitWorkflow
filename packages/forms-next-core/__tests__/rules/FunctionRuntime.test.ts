import {create} from '../collateral';
import {createFormInstance} from '../../src';
import FunctionRuntime from '../../src/rules/FunctionRuntime';
import {Action, Change, Click, Controller, CustomEvent} from '../../src/controller/Controller';
import nock from 'nock';

//todo : remove dupliacate code Form.test.ts
expect.extend({
    matchesAction(received: Action, expected: {action: Action, target: Controller}) {
        const passes = {
            'target': received.target == expected.target,
            'type': received.type === expected.action.type,
            'metadata': JSON.stringify(received.metadata) === JSON.stringify(expected.action.metadata),
            'payload': JSON.stringify(received.payload) == JSON.stringify(expected.action.payload)
        };
        const entries = Object.entries(passes).filter((key) => !key[1]);
        if (entries.length > 0) {
            return {
                message: () => {
                    let msg = `expected ${Object.keys(passes).length} to match but ${entries.length} did not match. `;
                    msg = msg + entries.map((key) => key[0]).join(',') + ' did not match';
                    return msg;
                },
                pass : false
            };
        } else {
            return {
                pass : true,
                message: () => 'actions matched'
            };
        }
    }
});

declare global {
    namespace jest {
        interface Matchers<R> {
            matchesAction(expected: {action: Action, target: Controller}): R;
        }

        interface Expect {
            matchesAction(expected: {action: Action, target: Controller}): void;
        }
    }
}

test('should return all the publically exposed functions', async () => {
    const result = FunctionRuntime.getFunctions();
    expect(result.get_data).toBeInstanceOf(Function);
    expect(result.validate).toBeInstanceOf(Function);
    expect(result.submit_form).toBeInstanceOf(Function);
    expect(result.show_message_box).toBeInstanceOf(Function);
    expect(result.dispatch_event).toBeInstanceOf(Function);
});

test('dispatch_event should invoke dispatch API', async () => {
    const formJson = create(['f', {
        'f' : {
                'events' : {
                    'click': "dispatch_event($form, 'event1', {x : 'y'})"
                }
            }
        },
        {
            'f' : {
                'events': {
                    'click': "dispatch_event('event1', {x : 'y'})"
                }
        }
    }]);
    let form = await createFormInstance(formJson);
    const f = FunctionRuntime;
    form.dispatch = jest.fn();
    form.getElementController('f2')?.dispatch(new Click());
    expect(form.dispatch).toHaveBeenCalledWith(new CustomEvent('event1', {x : 'y'}, false));

    form.getElementController('f3')?.dispatch(new Click());
    expect(form.dispatch).toHaveBeenCalledWith(new CustomEvent('event1', {x : 'y'}, true));
});

test('getData should return the current state of the form data', async () => {
    const formJson = create(['f', 'f', {
        'f' : {
            'events' : {
                'click' : "dispatch_event($form, 'customEvent', get_data())"
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    const f = FunctionRuntime;
    let callback = jest.fn();
    form.subscribe(callback, 'customEvent');
    form.getElementController('f1').dispatch(new Change('value2'));
    form.getElementController('f3').dispatch(new Click());
    expect(callback.mock.calls[0][0]).matchesAction({
        action : new CustomEvent('customEvent', {'f1' : 'value2'}),
        target : form
    });
});

const API_HOST = 'http://api.aem-forms.com';

test('submit should send a request to the url configured', async () => {
    const scope = nock(API_HOST)
        .post('/my-submit-end-point')
        .reply(200, {});
    const formJson = create(['f', 'f', {
        'f' : {
            events : {
                'click' : "submit_form('event1', 'event2')"
            }
        }
    }]);
    formJson.metadata = {
        action:  `${API_HOST}/my-submit-end-point`
    };
    let form = await createFormInstance(formJson);
    const f = FunctionRuntime;
    form.getElementController('f1').dispatch(new Change('value2'));
    form.getElementController('f3').dispatch(new Click());
    await setTimeout(() => {
        // Will throw an assertion error if meanwhile a "GET/POST" was
        // not performed.
        scope.done();
    }, 100);
});

test('submit success event should be dispatched', async () => {
    nock(API_HOST)
        .post('/my-submit-end-point')
        .reply(200, {});
    const formJson = create(['f', 'f', {
        'f' : {
            events : {
                'click' : "submit_form('event1', 'event2')"
            }
        }
    }]);
    formJson.metadata = {
        action:  `${API_HOST}/my-submit-end-point`
    };
    let form = await createFormInstance(formJson);
    const f = FunctionRuntime;
    form.getElementController('f1').dispatch(new Change('value2'));
    form.dispatch = jest.fn();
    form.getElementController('f3').dispatch(new Click());
    await setTimeout(() => {
        // Will throw an assertion error if meanwhile a "GET/POST" was
        // not performed.
        expect(form.dispatch).toHaveBeenCalledWith(new CustomEvent('event1', {}, true));
    }, 100);
});

test('submit success event should get executed', async () => {
    nock(API_HOST)
        .post('/my-submit-end-point')
        .reply(200, {});
    const formJson = create([{'f' : {
            events : {
                'event1' : '{"title" : \'Thank you for submitting the form\'}'
            }
        }}, 'f', 'f']);
    formJson.metadata = {
        action:  `${API_HOST}/my-submit-end-point`
    };
    let form = await createFormInstance(formJson);
    const f = FunctionRuntime;
    form.getElementController('f1').dispatch(new Change('value2'));
    form.getElementController('f3').dispatch(new Click());
    await setTimeout(() => {
        // Will throw an assertion error if meanwhile a "GET/POST" was
        // not performed.
        expect(form.getState().items.f1.title).toEqual('Thank you for submitting the form');
    }, 100);

});

test('submit error event should be dispatched if service returns error', async () => {
    nock(API_HOST)
        .post('/my-submit-end-point')
        .reply(404);
    const formJson = create([{'f' : {
            events : {
                'event1' : '{"title" : \'Thank you for submitting the form\'}'
            }
        }}, 'f', 'f']);
    formJson.metadata = {
        action:  `${API_HOST}/my-submit-end-point`
    };
    let form = await createFormInstance(formJson);
    const f = FunctionRuntime;
    form.getElementController('f1').dispatch(new Change('value2'));
    form.dispatch = jest.fn();
    form.getElementController('f3').dispatch(new Click());
    await setTimeout(() => {
        // Will throw an assertion error if meanwhile a "GET/POST" was
        // not performed.
        expect(false).toEqual(true);
        expect(form.dispatch).toHaveBeenCalledWith(new CustomEvent('event2', {}, true));
    }, 100);
});

test.skip('submit_form should call the submit api', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const f = FunctionRuntime;
    f.submit = jest.fn();
    f.getFunctions().submit_form({'$form' : form},'e1', 'e2');
    expect(f.submit).toHaveBeenCalledWith('e1', 'e2');
});

test.skip('submit_form should return {}', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const f = FunctionRuntime;
    f.submit = jest.fn();
    expect(f.getFunctions().submit_form({'$form' : form},'e1', 'e2')).toEqual({});
});

