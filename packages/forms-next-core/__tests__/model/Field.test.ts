import Field from '../../src/Field';
import RuleEngine from '../../src/rules/RuleEngine';
import {Json} from '@adobe/forms-next-expression-parser';

const ruleEngine = new RuleEngine();

test('a field should add all the default values in its json', () => {
    const f = new Field({id : 'someid'}, ruleEngine);
    expect(f.json()).toEqual({
        id : 'someid',
        visible : true,
        readOnly : false,
        viewType: 'text-input',
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
        viewType : 'text-input'
    });
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