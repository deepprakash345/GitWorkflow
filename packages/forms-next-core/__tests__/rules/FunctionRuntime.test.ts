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

const checkAfterTimeout = (callback: () => void) => {
    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                callback();
                resolve({});
            },
            100
        );
    });
};

test('should return all the publically exposed functions', async () => {
    const result = FunctionRuntime.getFunctions();
    expect(result.get_data).toBeInstanceOf(Function);
    expect(result.validate).toBeInstanceOf(Function);
    expect(result.submit_form).toBeInstanceOf(Function);
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
    const state = form.getState();
    form.getElementController(state.items[1].id)?.dispatch(new Click());
    expect(form.dispatch).toHaveBeenCalledWith(new CustomEvent('event1', {x : 'y'}, false));

    form.getElementController(state.items[2].id)?.dispatch(new Click());
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
    const state = form.getState();
    form.getElementController(state.items[0].id).dispatch(new Change('value2'));
    form.getElementController(state.items[2].id).dispatch(new Click());
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
    const state = form.getState();
    form.getElementController(state.items[0].id).dispatch(new Change('value2'));
    form.getElementController(state.items[2].id).dispatch(new Click());
    await checkAfterTimeout(() => {
        scope.done();
    });
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
    const state = form.getState();
    form.getElementController(state.items[0].id).dispatch(new Change('value2'));
    form.dispatch = jest.fn();
    form.getElementController(state.items[2].id).dispatch(new Click());
    await checkAfterTimeout(() => {
        expect(form.dispatch).toHaveBeenCalledWith(new CustomEvent('event1', {}, true));
    });
});

test('submit success event should get executed', async () => {
    nock(API_HOST)
        .post('/my-submit-end-point')
        .reply(200, {});
    const formJson = create([{'f' : {
            events : {
                'custom:event1' : "{title : 'Thank you for submitting the form'}"
            }
        }}, {'f' : {
            events : {
                'click' : "submit_form('event1', 'event2')"
            }
        }}, 'f']);
    formJson.metadata = {
        action:  `${API_HOST}/my-submit-end-point`
    };
    let form = await createFormInstance(formJson);
    const f = FunctionRuntime;
    const state = form.getState();
    form.getElementController(state.items[1].id).dispatch(new Click());
    await checkAfterTimeout(() => {
        // Will throw an assertion error if meanwhile a "GET/POST" was
        // not performed.
        expect(form.getState().items[0].title).toEqual('Thank you for submitting the form');
    });
});

test('submit error event should be dispatched if service returns error', async () => {
    nock(API_HOST)
        .post('/my-submit-end-point')
        .reply(404);
    const formJson = create([{'f' : {
            events : {
                'custom:event2' : "{title : 'Form Submission Failed'}"
            }
        }}, 'f', {'f' : {
            events : {
                'click' : "submit_form('event1', 'event2')"
            }
        }}]);
    formJson.metadata = {
        action:  `${API_HOST}/my-submit-end-point`
    };
    let form = await createFormInstance(formJson);
    const f = FunctionRuntime;
    let state = form.getState();
    form.getElementController(state.items[2].id).dispatch(new Click());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state = form.getState();
    await checkAfterTimeout(() => {
        expect(state.items[0].title).toEqual('Form Submission Failed');
    });
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

