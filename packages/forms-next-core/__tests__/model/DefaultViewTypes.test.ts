import Field from '../../src/Field';
import RuleEngine from '../../src/rules/RuleEngine';

const ruleEngine = new RuleEngine();

test('date types should default to date-input', () => {
    const f = new Field({
        id: 'someid',
        type: 'string',
        format: 'date'
    }, ruleEngine);
    expect(f.json().viewType).toEqual('date-input');
});

test('fields with boolean type should default to checkbox', () => {
    const f = new Field({
        id: 'someid',
        type: 'boolean'
    }, ruleEngine);
    expect(f.json().viewType).toEqual('checkbox');
});

test('fields with boolean type should have enum set to true, false', () => {
    const f = new Field({
        id: 'someid',
        type: 'boolean'
    }, ruleEngine);
    expect(f.json().enum).toEqual([true, false]);
});

test('fields with enum of length less than 3 should default to checkbox', () => {
    let f = new Field({
        id: 'someid',
        enum: ['a', 'b']
    }, ruleEngine);
    expect(f.json().viewType).toEqual('checkbox');

    f = new Field({
        id: 'someid',
        enum: ['a']
    }, ruleEngine);
    expect(f.json().viewType).toEqual('checkbox');
});

test('fields with enum of length greater than 2 should default to checkbox', () => {
    let f = new Field({
        id: 'someid',
        enum: Array(3 + Math.floor(Math.random() * 10)).fill('a')
    }, ruleEngine);
    expect(f.json().viewType).toEqual('drop-down');
});