import Field from '../../src/Field';
import EventQueue from '../../src/controller/EventQueue';
import {Change} from '../../src/controller/Controller';
import {Constraints} from '../../src/utils/ValidationUtils';
import {FormModel} from '../../src/types';
import {create} from '../collateral';
import Form from '../../src/Form';
import RuleEngine from '../../src/rules/RuleEngine';

let form: FormModel;
let options : {parent: FormModel, form: FormModel};
beforeEach(async () => {
    form = new Form(create(['f']), new RuleEngine());
    options = {
        parent: form,
        form
    };
});

test('a field should add all the default values in its json', () => {
    const f = new Field({}, options);
    expect(f.getState()).toMatchObject({
        visible : true,
        readOnly : false,
        viewType: 'text-input',
        type: 'string',
        enabled : true
    });

    expect(f.visible).toEqual(true);
    expect(f.ruleEngine).toEqual(form.ruleEngine);
    expect(f.readOnly).toEqual(false);
    expect(f.enabled).toEqual(true);

});

test('a field should set the value correctly in its json from default value', () => {
    const f = new Field({default : 'test'}, options);
    expect(f.getState()).toMatchObject({
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
    const f = new Field({type : 'boolean'}, options);
    expect(f.enum).toEqual([true, false]);
});

test('string conversion of field returns  its value', () => {
    const f = new Field({default : 'boolean'}, options);
    expect(f.toString()).toEqual('boolean');
});

test('accessing field value directly works in rules', () => {
    const f = new Field({default : 'test'}, {form, parent: form});
    f._initialize();
    const globals = {
        '$field' : f.getRuleNode(),
    };
    const rule = "$field & ' a'";
    const node = form.ruleEngine.compileRule(rule);
    const result = form.ruleEngine.execute(node, {}, globals);
    expect(result).toEqual('test a');
});

describe('Field Validation', () => {
    beforeEach(() => {
        form = new Form(create(['f']), new RuleEngine());
        options = {form, parent: form};
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
            type: 'number',
            enum: [1, 2, 3]
        }, options);
        field.value = 4;
        expect(Constraints.enum).not.toBeCalled();
        expect(field.valid).toEqual(true);
    });

    test('enum constraint with enforceEnum', () => {
        const mockValidity = [true, false][Math.floor(Math.random() * 2)];
        Constraints.enum = jest.fn().mockImplementation((c, v) => {
            return {
                value: v,
                valid: mockValidity
            };
        });
        const field = new Field({
            type: 'number',
            enforceEnum : true,
            enum: [1, 2, 3]
        }, options);
        field.value = '4';
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
