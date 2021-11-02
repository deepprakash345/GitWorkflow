import {Change, Click, createController, EmptyController} from '../src/controller/Controller';
import {create, randomWord} from './collateral';
import Form from '../src/Form';
import Field from '../src/Field';
import RuleEngine from '../src/rules/RuleEngine';
import EventQueue from '../src/controller/EventQueue';
import {FormModel} from '../src/types';

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
        expect(emptyController.getState()).toEqual({a : 1});
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
        const json = create(['f']);
        ruleEngine = new RuleEngine();
        form = new Form(json, ruleEngine);
        eventQueue = new EventQueue();
        field = new Field({id : 'someid'}, ruleEngine, createController(form, eventQueue));
    });

    test('getElementController should return an EmptyController', () => {
        const controller = field.controller().getElementController(randomWord(5));
        expect(controller).toBeInstanceOf(EmptyController);
    });

    test('queueEvent should put the event in the queue', () => {
        eventQueue.queue = jest.fn();
        field = new Field({id : 'someid'}, ruleEngine, createController(form, eventQueue));
        const controller = field.controller();
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
        ruleEngine = mockRuleEngine(new RuleEngine(), () => {});
        field = new Field({
            id : 'someid',
            events: {
                click : 'some mock rule'
            }
        }, ruleEngine, createController(form, eventQueue));
        const controller = field.controller();
        controller.dispatch(new Click());
        expect(ruleEngine.compileRule).toHaveBeenCalledWith('some mock rule');
        // @ts-ignore
        expect(ruleEngine.node.search).toHaveBeenCalledWith(field, {
            '$form' : form,
            '$field' : field,
            '$event' : {
                'type' : 'click',
                'target' : field
            }
        });
    });

    test('dispatchEvent adds dependency if the value field was accessed in the rule', () => {
        const json = create([{
            'f' : {
                'rules' : {
                    'prop1' : 'some mock rule'
                }
            }
        }]);
        ruleEngine = mockRuleEngine(new RuleEngine(), () => field.value);
        form = new Form(json, ruleEngine);
        field = new Field({
            id : 'someid',
            default: 'text'
        }, ruleEngine, createController(form, eventQueue));
        field.controller().dispatch = jest.fn();
        const element = form.getElement('f1');
        element?.controller().dispatch(new Change(undefined));
        expect(field.controller().dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: 'AddDependent',
            payload: element
        }));
    });

    test('dispatchEvent puts the dependency in the queue', () => {
        const json = create([{
            'f' : {
                'rules' : {
                    'prop1' : 'some mock rule'
                }
            }
        }]);
        ruleEngine = mockRuleEngine(new RuleEngine(), () => field.value);
        form = new Form(json, ruleEngine);
        eventQueue.queue = jest.fn();
        field = new Field({
            id : 'someid',
            default: 'text',
            events : {
                click : 'some mock handler'
            }
        }, ruleEngine, createController(form, eventQueue));
        const element = form.getElement('f1');
        //adding dependency
        element?.controller().dispatch(new Change(undefined));
        //mocking again
        ruleEngine = mockRuleEngine(ruleEngine, () => {
            return { value : '2'};
        });
        field.controller().dispatch(new Click());
        expect(eventQueue.queue).toHaveBeenCalledTimes(1);
        expect(eventQueue.queue).toHaveBeenCalledWith(element, new Change(undefined));
    });
});