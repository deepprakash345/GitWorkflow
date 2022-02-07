import {create} from '../collateral';
import {Action, BaseModel, createFormInstance, FieldModel} from '../../src';
import FunctionRuntime from '../../src/rules/FunctionRuntime';
// @ts-ignore
import nock from 'nock';
import {Click, CustomEvent, Submit} from '../../src/controller/Controller';

//todo : remove dupliacate code Form.test.ts
expect.extend({
    matchesAction(received: Action, expected: { action: Action, target: BaseModel }) {
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
                pass: false
            };
        } else {
            return {
                pass: true,
                message: () => 'actions matched'
            };
        }
    }
});

declare global {
    namespace jest {
        interface Matchers<R> {
            matchesAction(expected: { action: Action, target: BaseModel }): R;
        }

        interface Expect {
            matchesAction(expected: { action: Action, target: BaseModel }): void;
        }
    }
}

const checkAfterTimeout = (callback: () => void) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    expect(result.get_data._func).toBeInstanceOf(Function);
    expect(result.validate._func).toBeInstanceOf(Function);
    expect(result.submit_form._func).toBeInstanceOf(Function);
    expect(result.dispatch_event._func).toBeInstanceOf(Function);
});

test('dispatch_event should invoke dispatch API', async () => {
    const formJson = create(['f', {
        'f': {
            'events': {
                'click': "dispatch_event($form, 'custom:event1', {x : 'y'})"
            }
        }
    },
        {
            'f': {
                'events': {
                    'click': "dispatch_event('custom:event1', {x : 'y'})"
                }
            }
        }]);
    let form = await createFormInstance(formJson);
    form.dispatch = jest.fn();
    const state = form.getState();
    form.getElement(state.items[1].id).dispatch(new Click());
    expect(form.dispatch).toHaveBeenCalledWith(new CustomEvent('event1', {x: 'y'}, false));

    form.getElement(state.items[2].id).dispatch(new Click());
    expect(form.dispatch).toHaveBeenCalledWith(new CustomEvent('event1', {x: 'y'}, true));
});

test('getData should return the current state of the form data', async () => {
    const formJson = create(['f', 'f', {
        'f': {
            'events': {
                'click': "dispatch_event($form, 'custom:customEvent', get_data())"
            }
        }
    }]);
    let form = await createFormInstance(formJson);
    let callback = jest.fn();
    form.subscribe(callback, 'customEvent');
    const state = form.getState();
    form.getElement(state.items[0].id).value = 'value2';
    form.getElement(state.items[2].id).dispatch(new Click());
    await checkAfterTimeout(() => {
        expect(callback.mock.calls[0][0]).matchesAction({
            action: new CustomEvent('customEvent', {'f1': 'value2'}),
            target: form
        });
    });
});

const API_HOST = 'http://api.aem-forms.com';

test('submit should send a request to the url configured', async () => {
    const scope = nock(API_HOST)
        .post('/my-submit-end-point')
        .reply(200, {});
    const formJson = create(['f', 'f', {
        'f': {
            events: {
                'click': "submit_form('event1', 'event2')"
            }
        }
    }]);
    formJson.action = `${API_HOST}/my-submit-end-point`;
    let form = await createFormInstance(formJson);
    const state = form.getState();
    form.getElement(state.items[0].id).value = 'value2';
    form.getElement(state.items[2].id).dispatch(new Click());
    await checkAfterTimeout(() => {
        scope.done();
    });
});

test('submit event should be dispatched on submit_form', async () => {
    nock(API_HOST)
        .post('/my-submit-end-point')
        .reply(200, {});
    const formJson = create(['f', 'f', {
        'f': {
            events: {
                'click': "submit_form('event1', 'event2')"
            }
        }
    }]);
    formJson.metadata = {
        action: `${API_HOST}/my-submit-end-point`
    };
    let form = await createFormInstance(formJson);
    const state = form.getState();
    form.getElement(state.items[0].id).value = 'value2';
    form.dispatch = jest.fn();
    form.getElement(state.items[2].id).dispatch(new Click());
    await checkAfterTimeout(() => {
        expect(form.dispatch).toHaveBeenCalledWith(new Submit({
            'data': null,
            'error': 'event2',
            'submit_as': 'json',
            'success': 'event1'
        }, false));
    });
});

test('submit success event should get executed', async () => {
    nock(API_HOST)
        .post('/my-submit-end-point')
        .reply(200, {});
    const formJson = create([{
        'f': {
            events: {
                'custom:event1': "{label : {value : 'Thank you for submitting the form'}}"
            }
        }
    }, {
        'f': {
            events: {
                'click': "submit_form('event1', 'event2')"
            }
        }
    }, 'f']);
    formJson.action = `${API_HOST}/my-submit-end-point`;

    let form = await createFormInstance(formJson);
    const state = form.getState();
    const elem = form.getElement(state.items[1].id) as FieldModel;
    const elem1 = form.getElement(state.items[0].id) as FieldModel;
    elem.dispatch(new Click());
    await checkAfterTimeout(() => {
        // Will throw an assertion error if meanwhile a "GET/POST" was
        // not performed.
        expect(elem1.getState().label?.value).toEqual('Thank you for submitting the form');
    });
});

test('submit error event should be dispatched if service returns error', async () => {
    nock('http://abc.com')
        .post('/my-submit-end-point')
        .reply(404);
    const formJson = create([{
        'f': {
            events: {
                'custom:event2': "{label : {value : 'Form Submission Failed'}}"
            }
        }
    }, 'f', {
        'f': {
            events: {
                'click': "submit_form('event1', 'event2')"
            }
        }
    }]);
    formJson.metadata = {
        action: 'http://abc.com/my-submit-end-point'
    };
    let form = await createFormInstance(formJson);
    let state = form.getState();
    const elem = form.getElement(state.items[2].id);
    const elem1 = form.getElement(state.items[0].id);
    elem.dispatch(new Click());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await checkAfterTimeout(() => {
        expect(elem1.getState().label?.value).toEqual('Form Submission Failed');
    });
});

test.skip('submit_form should call the submit api', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const f = FunctionRuntime;
    //f.submit = jest.fn();
    f.getFunctions().submit_form._func(['e1', 'e2'], {}, {globals: {'$form': form.getRuleNode()}});

    //expect(f.submit).toHaveBeenCalledWith('e1', 'e2');
});

test.skip('submit_form should return {}', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = await createFormInstance(formJson);
    const f = FunctionRuntime;
    //f.submit = jest.fn();
    expect(f.getFunctions().submit_form._func(['e1', 'e2'], {}, {globals: {'$form': form.getRuleNode()}})).toEqual({});
});
