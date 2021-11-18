import {Change, Click, createController, EmptyController} from '../src/controller/Controller';
import {create, randomWord} from './collateral';
import Form from '../src/Form';
import Field from '../src/Field';
import RuleEngine from '../src/rules/RuleEngine';
import EventQueue from '../src/controller/EventQueue';
import {FormModel} from '../src/types';
import {MockForm} from '../src/utils/JsonUtils';

describe('Empty Controller', () => {
    test('should not throw any exception in any of the APIs', async () => {
        const emptyController = new EmptyController();
        // @ts-ignore
        const s =emptyController.subscribe(() => {});
        expect(s).toBeDefined();
        const test = () => {
            emptyController.dispatch(new Click());
            s.unsubscribe();
            emptyController.queueEvent(new Click());
        };
        expect(test).not.toThrow();
        expect(emptyController.getState()).toBeUndefined();
        expect(emptyController.getElementController('x')).toBe(emptyController);
    });

    test('with element should return the state', async () => {
        const testObj = {
            json : () => {
                return {
                    'id' : 'a',
                    'a' : 1
                };
            }
        };
        const emptyController = new EmptyController(testObj);
        // @ts-ignore
        const s = emptyController.subscribe(() => {});
        expect(s).toBeDefined();
        const test = () => {
            emptyController.dispatch(new Click());
            s.unsubscribe();
            emptyController.queueEvent(new Click());
        };
        expect(test).not.toThrow();
        expect(emptyController.getState()).toEqual({a : 1, id: 'a'});
    });

    test('should log an exception on dispatchEvent', async () => {
        const emptyController = new EmptyController();
        console.error = jest.fn();
        emptyController.dispatch(new Click());
        expect(console.error).toHaveBeenCalledWith("invalid action click. element doesn't exist");
    });

});

describe('Field Controller with Form', () => {

    let field:  any, eventQueue: EventQueue<any>, form: FormModel, ruleEngine: RuleEngine;

    beforeEach(() => {
        ruleEngine = new RuleEngine();
        form = MockForm();
        form.ruleEngine = ruleEngine;
        eventQueue = new EventQueue();
        eventQueue.queue = jest.fn();
        form.createController = (elem) => {
            return createController(form, eventQueue)(elem);
        };
        field = new Field({}, {form, parent: form});
    });

    test('getElementController should return an EmptyController', () => {
        const controller = field.controller.getElementController(randomWord(5));
        expect(controller).toBeInstanceOf(EmptyController);
    });

    test('queueEvent should put the event in the queue', () => {
        const controller = field.controller;
        controller.queueEvent(new Click());
        expect(eventQueue.queue).toHaveBeenCalledWith(field, new Click());
    });

    const mockRuleEngine = (ruleEngine: RuleEngine, fn:() => any) => {
        //@ts-ignore
        ruleEngine.node = {
            search : jest.fn().mockImplementation(fn)
        };
        // @ts-ignore
        ruleEngine.compileRule = jest.fn().mockReturnValue(ruleEngine.node);
        return ruleEngine;
    };

    test('dispatchEvent invokes ruleEngine', () => {
        form.ruleEngine = mockRuleEngine(new RuleEngine(), () => {});
        field = new Field({
            events: {
                click : 'some mock rule'
            }
        }, {form, parent: form});
        const controller = field.controller;
        controller.dispatch(new Click());
        expect(form.ruleEngine.compileRule).toHaveBeenCalledWith('some mock rule');
        // @ts-ignore
        // expect(form.ruleEngine.node.search).toHaveBeenCalledWith(field, {
        //     '$form' : form,
        //     '$field' : field,
        //     '$event' : {
        //         'type' : 'click',
        //         'target' : field
        //     }
        // });
    });

    test('dispatchEvent adds dependency if the value field was accessed in the rule', () => {
        form.ruleEngine = mockRuleEngine(new RuleEngine(), () => field.value);
        const dependentField = new Field({
            default: 'text',
            rules : {
                'prop1' : 'some mock rule'
            }
        }, {form, parent: form});
        field = new Field({
            default: 'text'
        }, {form, parent: form});
        field.controller.dispatch = jest.fn();
        dependentField.controller.dispatch(new Change(undefined));
        expect(field.controller.dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: 'AddDependent',
            payload: dependentField
        }));
    });

    test('dispatchEvent puts the dependency in the queue', () => {
        form.ruleEngine = mockRuleEngine(new RuleEngine(), () => field.value);
        field = new Field({
            default: 'text',
            events : {
                click : 'some mock handler'
            }
        }, {form, parent: form});
        const dependentField = new Field({
            default: 'text',
            rules : {
                'prop1' : 'some mock rule'
            }
        }, {form, parent: form});
        dependentField.controller.dispatch(new Change(undefined));
        //mocking again
        form.ruleEngine = mockRuleEngine(ruleEngine, () => {
            return { value : '2'};
        });
        field.controller.dispatch(new Click());
        expect(eventQueue.queue).toHaveBeenCalledTimes(1);
        expect(eventQueue.queue).toHaveBeenCalledWith(dependentField, new Change(undefined));
    });
});