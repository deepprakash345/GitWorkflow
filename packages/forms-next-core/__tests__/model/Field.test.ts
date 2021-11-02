import Field from '../../src/Field';
import RuleEngine from '../../src/rules/RuleEngine';
import {Json} from '@adobe/forms-next-expression-parser';
import {create} from '../collateral';
import Form from '../../src/Form';
import EventQueue from '../../src/controller/EventQueue';
import {Change, createController} from '../../src/controller/Controller';
import {Constraints} from '../../src/utils/ValidationUtils';

const ruleEngine = new RuleEngine();

test('a field should add all the default values in its json', () => {
    const f = new Field({id : 'someid'}, ruleEngine);
    expect(f.json()).toEqual({
        id : 'someid',
        visible : true,
        readOnly : false,
        viewType: 'text-input',
        type: 'string',
        enabled : true
    });
});

test('a field should set the value correctly in its json from default value', () => {
    const f = new Field({id : 'someid', default : 'test'}, ruleEngine);
    expect(f.json()).toEqual({
        id : 'someid',
        visible : true,
        readOnly : false,
        enabled : true,
        default : 'test',
        value : 'test',
        viewType : 'text-input',
        type: 'string'
    });
});

test('a boolean field returns proper enum value', () => {
    const f = new Field({id : 'someid', type : 'boolean'}, ruleEngine);
    expect(f.enum).toEqual([true, false]);
});

test('string conversion of field returns  its value', () => {
    const f = new Field({id : 'someid', default : 'boolean'}, ruleEngine);
    expect(f.toString()).toEqual('boolean');
});

test('accessing field value directly works in rules', () => {
    const f = new Field({id : 'someid', default : 'test'}, ruleEngine);
    const ob = {
        '$field' : f
    };
    const rule = "$field + ' a'";
    const node = ruleEngine.compileRule(rule);
    const result = ruleEngine.execute(node, this, ob);
    expect(result).toEqual('test a');
});

describe('Field Validation', () => {
    let form: any, eventQueue: any, ruleEngine: any;

    beforeEach(() => {
        const json = create(['f']);
        const ruleEngine = new RuleEngine();
        const form = new Form(json, ruleEngine);
        eventQueue = new EventQueue();
    });

    test('enum constraint without enforceEnum', () => {
        const mockValidity = [true, false][Math.floor(Math.random() * 2)];
        Constraints.enum = jest.fn().mockImplementation((c, v) => {
            return {
                value: v,
                valid: mockValidity
            };
        });
        const field = new Field({
            id : 'someid',
            type: 'number',
            enum: [1, 2, 3]
        }, ruleEngine, createController(form, eventQueue));
        field.controller().dispatch(new Change(4));
        expect(Constraints.enum).not.toBeCalled();
        expect(field.valid).toEqual(true);
    });

    test('enum constraint without enforceEnum', () => {
        const mockValidity = [true, false][Math.floor(Math.random() * 2)];
        Constraints.enum = jest.fn().mockImplementation((c, v) => {
            return {
                value: v,
                valid: mockValidity
            };
        });
        const field = new Field({
            id : 'someid',
            type: 'number',
            enforceEnum : true,
            enum: [1, 2, 3]
        }, ruleEngine, createController(form, eventQueue));
        field.controller().dispatch(new Change(4));
        expect(Constraints.enum).toBeCalledWith([1, 2, 3], '4');
        expect(field.valid).toEqual(mockValidity);
    });

    test.todo('required constraint');
    test.todo('type constraint');
    test.todo('minimum constraint');
    test.todo('maximum constraint');
    test.todo('minLength constraint');
    test.todo('maxLength constraint');
    test.todo('pattern constraint');
    test.todo('format constraint');
});
