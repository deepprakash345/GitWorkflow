import Form from '../../src/Form';
import {create} from '../collateral';
import RuleEngine from '../../src/rules/RuleEngine';

test('A required checkbox with explicit off value should be invalid', () => {
    const formJson = {
        items: [{
            name: 'f1',
            viewType: 'checkbox',
            type: 'number',
            enum: [1, 0],
            required: true
        }]
    };
    const form = new Form(formJson, new RuleEngine());
    form.items[0].value = 0;
    expect(form.items[0].valid).toEqual(false);
    form.items[0].value = 1;
    expect(form.items[0].valid).toEqual(true);
});

test("A required checkbox with type boolean value should be invalid when it's value is false", () => {
    const formJson = {
        items: [{
            name: 'f1',
            viewType: 'checkbox',
            type: 'boolean',
            required: true
        }]
    };
    const form = new Form(formJson, new RuleEngine());
    form.items[0].value = false;
    expect(form.items[0].valid).toEqual(false);
    form.items[0].value = true;
    expect(form.items[0].valid).toEqual(true);
});

