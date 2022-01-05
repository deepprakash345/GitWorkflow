import {Change, Click, ExecuteRule} from '../src/controller/Controller';
import {create, MockForm} from './collateral';
import Form from '../src/Form';
import Field from '../src/Field';
import RuleEngine from '../src/rules/RuleEngine';
import EventQueue from '../src/controller/EventQueue';
import {FormModel} from '../src/types';

describe('Field Controller with Form', () => {

    let field:  any, eventQueue: EventQueue, form: FormModel, ruleEngine: RuleEngine;

    const mockRuleEngine = (ruleEngine: RuleEngine, fn:() => any) => {
        //@ts-ignore
        ruleEngine.node = {
            search : jest.fn().mockImplementation(fn)
        };
        // @ts-ignore
        ruleEngine.compileRule = jest.fn().mockReturnValue(ruleEngine.node);
        return ruleEngine;
    };


    beforeEach(() => {
        eventQueue = new EventQueue();
        ruleEngine = mockRuleEngine(new RuleEngine(), () => {});
        form = MockForm(ruleEngine, eventQueue);
    });

    test('dispatch invokes ruleEngine', () => {
        field = new Field({
            events: {
                click : 'some mock rule'
            }
        }, {form, parent: form});
        field.dispatch(new Click());
        expect(form.ruleEngine.compileRule).toHaveBeenCalledWith('some mock rule');
    });

    test('dispatch adds dependency if the value field was accessed in the rule', () => {
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
        field.dispatch = jest.fn();
        dependentField.dispatch(new ExecuteRule());
        expect(field.dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: 'addDependent',
            payload: dependentField
        }));
    });

    test('dispatch puts the dependency in the queue', () => {
        form.ruleEngine = mockRuleEngine(new RuleEngine(), () => field.value);
        field = new Field({
            default: 'text',
            events : {
                click : 'some mock handler'
            },
            name: 'field'
        }, {form, parent: form});
        const dependentField = new Field({
            default: 'text',
            rules : {
                'prop1' : 'field.value (mock rule)'
            },
            name: 'dependent'
        }, {form, parent: form});
        dependentField.dispatch(new ExecuteRule());
        //mocking
        eventQueue.queue = jest.fn().mockImplementation(eventQueue.queue);
        form.getEventQueue = () => {
            return eventQueue;
        };
        form.ruleEngine = mockRuleEngine(ruleEngine, () => {
            return { value : '2'};
        });
        field.dispatch(new Click());
        //this would call field.value = 2
        expect(eventQueue.queue).toHaveBeenCalledTimes(5);
        //@ts-ignore
        expect(eventQueue.queue.mock.calls[0][0]).toBe(field);
        //@ts-ignore
        expect(eventQueue.queue.mock.calls[0][1]).toMatchObject({
            type: 'click',
            payload: undefined
        });

        //@ts-ignore
        expect(eventQueue.queue.mock.calls[1][0]).toBe(field);
        //@ts-ignore
        expect(eventQueue.queue.mock.calls[1][1]).toMatchObject({
            type: 'valid'
        });

        //@ts-ignore
        expect(eventQueue.queue.mock.calls[2][0]).toBe(field);
        //@ts-ignore
        expect(eventQueue.queue.mock.calls[2][1]).toMatchObject({
            type: 'change',
            payload: {
                'changes': [
                    {
                        'currentValue': '2',
                        'prevValue': 'text',
                        'propertyName': 'value'
                    },
                    {
                        'currentValue': true,
                        'prevValue': undefined,
                        'propertyName': 'valid'
                    },
                    {
                        'currentValue': '',
                        'prevValue': undefined,
                        'propertyName': 'errorMessage'
                    }
                ]
            }
        });

        //@ts-ignore
        expect(eventQueue.queue.mock.calls[3][0]).toBe(dependentField);
        //@ts-ignore
        expect(eventQueue.queue.mock.calls[3][1]).toMatchObject({
            type: 'executeRule',
            payload: {}
        });

        //@ts-ignore
        expect(eventQueue.queue.mock.calls[4][0]).toBe(field);
        //@ts-ignore
        expect(eventQueue.queue.mock.calls[4][1]).toMatchObject({
            type: 'addDependent',
            payload: dependentField
        });
    });
});