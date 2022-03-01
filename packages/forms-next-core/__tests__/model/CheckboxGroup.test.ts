import Form from '../../src/Form';
import RuleEngine from '../../src/rules/RuleEngine';

test("Checkbox Group's default type is deduced from enum values", () => {
    const formJson = {
        items: [{
            name: 'f1',
            fieldType: 'checkbox-group',
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
            fieldType: 'checkbox-group',
            enum: ['1', '0'],
            enumNames: ['Option 1', 'Option 2'],
            required: true
        }]
    };
    const form1 = new Form(formJson1, new RuleEngine());
    expect(form1.items[0].type).toEqual('string[]');

    const formJson2 = {
        items: [{
            name: 'f1',
            fieldType: 'checkbox-group',
            required: true
        }]
    };
    const form2 = new Form(formJson2, new RuleEngine());
    expect(form2.items[0].type).toEqual('string[]');
});

test('Checkbox Group without enum should return an empty array', () => {
    const formJson = {
        items: [{
            name: 'f1',
            fieldType: 'checkbox-group',
            required: true
        }]
    };
    const form = new Form(formJson, new RuleEngine());
    expect(form.items[0].enum).toEqual([]);
});

test('Checkbox Group without enum should be invalid', () => {
    const formJson = {
        items: [{
            name: 'f1',
            fieldType: 'checkbox-group',
            type: 'number[]',
            required: true
        }]
    };
    const form = new Form(formJson, new RuleEngine());
    form.items[0].value = [1];
    expect(form.items[0].valid).toEqual(false);
});

