import Form from '../../src/Form';
import RuleEngine from '../../src/rules/RuleEngine';

test("Checkbox Group's default type is deduced from enum values", () => {
    const formJson = {
        items: [{
            name: 'f1',
            viewType: 'checkbox-group',
            enum: [1, 0],
            enumNames: ['Option 1', 'Option 2'],
            required: true
        }]
    };
    const form = new Form(formJson, new RuleEngine());
    expect(form.items[0].type).toEqual('number[]');

    const formJson1 = {
        items: [{
            name: 'f1',
            viewType: 'checkbox-group',
            enum: ['1', '0'],
            enumNames: ['Option 1', 'Option 2'],
            required: true
        }]
    };
    const form1 = new Form(formJson1, new RuleEngine());
    expect(form1.items[0].type).toEqual('string[]');
});

