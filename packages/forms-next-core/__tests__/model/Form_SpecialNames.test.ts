import RuleEngine from "../../src/rules/RuleEngine";
import {Form} from "../../src";

test('constructor is a valid field name', () => {
    const formJson = {
        items: [
            {
                name: 'f1',
                fieldType: 'panel',
                type: 'object',
                items: [
                    {
                        name: 'constructor',
                        type: 'number',
                        fieldType: "text-input",
                        "default" : 0,
                    }
                ]
            }
        ]
    };
    let form = new Form(formJson, new RuleEngine());
    const r1 = form.getRuleNode();
    expect(r1.f1.$name).toEqual("f1")
    expect(r1.f1.constructor.$name).toEqual("constructor")
});
