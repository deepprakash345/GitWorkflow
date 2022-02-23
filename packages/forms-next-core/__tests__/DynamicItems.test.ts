import {create} from './collateral';
import {createFormInstance, FieldModel, FieldsetModel} from '../src';
import {AddItem, Change, RemoveItem} from '../src/controller/Controller';
import Form from '../src/Form';
import RuleEngine from '../src/rules/RuleEngine';
import Field from '../src/Field';

test('addItem event on non dynamic panel (fixed array) does nothing', async () => {
    const formJson = create(['f', ['f', 'f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElement(state.items[1].id) as FieldsetModel;
    element.dispatch(new AddItem());
    expect(element.getState().items.length).toEqual(2);
});

test('removeItem event on non dynamic panel (fixed array) does nothing', async () => {
    const formJson = create(['f', ['f', 'f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElement(state.items[1].id) as FieldsetModel;
    element.dispatch(new RemoveItem());
    expect(element.getState().items.length).toEqual(2);
});

test('addItem event on non dynamic panel (object) does nothing', async () => {
    const formJson = create(['f', ['f', 'f'], 'f']);
    formJson.items[1].type = 'object';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElement(state.items[1].id) as FieldsetModel;
    element.dispatch(new AddItem());
    expect(element.getState().items.length).toEqual(2);
});

test('removeItem event on non dynamic panel (object) does nothing', async () => {
    const formJson = create(['f', ['f', 'f'], 'f']);
    formJson.items[1].type = 'object';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElement(state.items[1].id) as FieldsetModel;
    element.dispatch(new RemoveItem());
    expect(element.getState().items.length).toEqual(2);
});

test('items are created initially for dynamic panel when minItems is greater than 1', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    formJson.items[1].minItems = 4;
    const form = await createFormInstance(formJson);
    const e = form.getElement(form.getState().items[1].id) as FieldsetModel;
    expect(e.getState().items.length).toEqual(4);
});

test('addItem event on dynamic panel adds an item', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElement(state.items[1].id) as FieldsetModel;
    element.dispatch(new AddItem());
    state = form.getState();
    expect(element.getState().items.length).toEqual(2);
});

test('addItem event on dynamic panel sets the value as well in data', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    formJson.items[1].items[0].default = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElement(state.items[1].id) as FieldsetModel;
    element.dispatch(new AddItem());
    expect(form.exportData()).toEqual({
        p1: ['array', 'array']
    });
});

test('removeItem event on dynamic panel removes an item', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElement(state.items[1].id) as FieldsetModel;
    element.dispatch(new RemoveItem());
    state = form.getState();
    expect(element.getState().items.length).toEqual(0);
});

test('addItem event on dynamic panel honors addition upto maxItems', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    formJson.items[1].maxItems = 5;
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElement(state.items[1].id) as FieldsetModel;
    element.dispatch(new AddItem());
    element.dispatch(new AddItem());
    element.dispatch(new AddItem());
    element.dispatch(new AddItem());
    expect(element.getState().items.length).toEqual(5);

    element.dispatch(new AddItem());
    expect(element.getState().items.length).toEqual(5);

});

test('RemoveItem event on dynamic panel honors removal until minItems', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    formJson.items[1].minItems = 2;
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElement(state.items[1].id) as FieldsetModel;
    element.dispatch(new AddItem());
    element.dispatch(new AddItem());
    state = form.getState();
    expect(element.getState().items.length).toEqual(4);

    element.dispatch(new RemoveItem());
    element.dispatch(new RemoveItem());
    state = form.getState();
    expect(element.getState().items.length).toEqual(2);

    element.dispatch(new RemoveItem());
    state = form.getState();
    expect(element.getState().items.length).toEqual(2);
});

test('addItem event on dynamic panel adds an item at the specified index', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const panel = form.getElement(state.items[1].id) as FieldsetModel;
    panel.dispatch(new AddItem());

    state = panel.getState();
    let field1 = form.getElement(state.items[0].id) as FieldModel;
    field1.value = 'a';
    let field2 = form.getElement(state.items[1].id) as FieldModel;
    field2.value = 'b';

    expect(field1.getState().value).toEqual('a');
    expect(field2.getState().value).toEqual('b');

    panel.dispatch(new AddItem(1));
    const state2 = panel.getState();
    let field3 = form.getElement(state2.items[1].id) as FieldModel;
    expect(field1.getState().value).toEqual('a');
    expect(field2.getState().value).toEqual('b');
    expect(field3.getState().value).toEqual(undefined);

    expect(state.items[0].id).toEqual(state2.items[0].id);
    expect(state.items[1].id).toEqual(state2.items[2].id);
});

test('add Item resets the indices of other items', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const panel = form.getElement(state.items[1].id) as FieldsetModel;
    panel.dispatch(new AddItem());

    state = panel.getState();
    let field1 = form.getElement(state.items[0].id) as FieldModel;
    field1.value = 'a';
    let field2 = form.getElement(state.items[1].id) as FieldModel;
    field2.value = 'b';

    state = panel.getState();
    expect(field1.index).toEqual(0);
    expect(field2.index).toEqual(1);

    panel.dispatch(new AddItem(1));
    let field3 = form.getElement(panel.getState().items[1].id) as FieldModel;
    expect(field1.index).toEqual(0);
    expect(field2.index).toEqual(2);
    expect(field3.index).toEqual(1);
});

test('removeItem event can remove an item at the specified index', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const panel = form.getElement(state.items[1].id) as FieldsetModel;
    panel.dispatch(new AddItem());
    panel.dispatch(new AddItem());

    state = panel.getState();
    let field1 = form.getElement(state.items[0].id) as FieldModel;
    field1.value = 'a';
    let field2 = form.getElement(state.items[1].id) as FieldModel;
    field2.value = 'b';
    let field3 = form.getElement(state.items[2].id) as FieldModel;

    panel.dispatch(new RemoveItem(1));
    const state2 = panel.getState();
    expect(state2.items.length).toEqual(2);
    let field11 = form.getElement(state2.items[0].id) as FieldModel;
    let field21 = form.getElement(state2.items[1].id) as FieldModel;
    expect(field11).toBe(field1);
    expect(field21).toBe(field3);
});

test('removeItem event resets the indices as well', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const panel = form.getElement(state.items[1].id) as FieldsetModel;
    panel.dispatch(new AddItem());
    panel.dispatch(new AddItem());
    state = panel.getState();

    let f1 = form.getElement(state.items[0].id);
    let f2 = form.getElement(state.items[1].id);
    let f3 = form.getElement(state.items[2].id);
    expect(f1.index).toEqual(0);
    expect(f3.index).toEqual(2);
    panel.dispatch(new RemoveItem(1));
    expect(f1.index).toEqual(0);
    expect(f3.index).toEqual(1);
});

test('rule node of a dynamic panel gets updated on importData', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    const form = new Form(formJson, new RuleEngine());
    const ruleNode = form.getRuleNode();
    expect(ruleNode.p1.length).toEqual(1);
    expect(ruleNode.p1[0].value).toEqual(null);
    form.importData({
        'f1' : 'a',
        'p1' : ['a1', 'a2', 'a3'],
        'f2' : 'a4'
    });
    expect(ruleNode.p1.length).toEqual(3);
    expect(ruleNode.p1[0].value).toEqual('a1');
    expect(ruleNode.p1[1].value).toEqual('a2');
    expect(ruleNode.p1[2].value).toEqual('a3');
});

test('rule node of a dynamic panel gets updated on addItem', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    formJson.items[1].items[0].default = 'abcd';
    const form = new Form(formJson, new RuleEngine());
    const ruleNode = form.getRuleNode();
    const p1 = form.getElement(ruleNode.p1.id);
    expect(ruleNode.p1.length).toEqual(1);
    expect(ruleNode.p1[0].value).toEqual('abcd');
    form.importData({
        'f1' : 'a',
        'p1' : ['a1', 'a2', 'a3'],
        'f2' : 'a4'
    });

    p1.dispatch(new AddItem());
    expect(ruleNode.p1.length).toEqual(4);
    expect(ruleNode.p1[0].value).toEqual('a1');
    expect(ruleNode.p1[1].value).toEqual('a2');
    expect(ruleNode.p1[2].value).toEqual('a3');
    expect(ruleNode.p1[3].value).toEqual('abcd');
});

test('rule node of a dynamic panel gets updated on addItem at specific index', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    formJson.items[1].items[0].default = 'abcd';
    const form = new Form(formJson, new RuleEngine());
    const ruleNode = form.getRuleNode();
    const p1 = form.getElement(ruleNode.p1.id);
    expect(ruleNode.p1.length).toEqual(1);
    expect(ruleNode.p1[0].value).toEqual('abcd');
    form.importData({
        'f1' : 'a',
        'p1' : ['a1', 'a2', 'a3'],
        'f2' : 'a4'
    });
    p1.dispatch(new AddItem());
    p1.dispatch(new AddItem(2));
    expect(ruleNode.p1.length).toEqual(5);
    expect(ruleNode.p1[0].value).toEqual('a1');
    expect(ruleNode.p1[1].value).toEqual('a2');
    expect(ruleNode.p1[2].value).toEqual('abcd');
    expect(ruleNode.p1[3].value).toEqual('a3');
    expect(ruleNode.p1[4].value).toEqual('abcd');
});

test('rule node of a dynamic panel gets updated on importData when items are to be removed', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    formJson.items[1].minItems = 1;
    formJson.items[1].initialItems = 5;
    formJson.items[1].items[0].default = 'abcd';
    const form = new Form(formJson, new RuleEngine());
    const ruleNode = form.getRuleNode();
    expect(ruleNode.p1.length).toEqual(5);
    expect(ruleNode.p1[0].value).toEqual('abcd');
    expect(ruleNode.p1[1].value).toEqual('abcd');
    expect(ruleNode.p1[2].value).toEqual('abcd');
    expect(ruleNode.p1[3].value).toEqual('abcd');
    expect(ruleNode.p1[4].value).toEqual('abcd');
    //@ts-ignore
    const ids = ruleNode.p1.map(x => x.id);
    ids.pop();

    form.importData({
        'f1' : 'a',
        'p1' : ['a1', 'a2', 'a3', 'a4'],
        'f2' : 'a4'
    });
    //@ts-ignore
    const ids2 = ruleNode.p1.map(x => x.id);
    expect(ids).toEqual(ids2);
    expect(ruleNode.p1.length).toEqual(4);
    expect(ruleNode.p1[0].value).toEqual('a1');
    expect(ruleNode.p1[1].value).toEqual('a2');
    expect(ruleNode.p1[2].value).toEqual('a3');
    expect(ruleNode.p1[3].value).toEqual('a4');
});

test('rule node of a dynamic panel gets updated on removeItem event', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    formJson.items[1].minItems = 1;
    formJson.items[1].initialItems = 5;
    formJson.items[1].items[0].default = 'abcd';
    const form = new Form(formJson, new RuleEngine());
    const ruleNode = form.getRuleNode();
    const p1 = form.getElement(ruleNode.p1.id);
    form.importData({
        'f1' : 'a',
        'p1' : ['a1', 'a2', 'a3', 'a4'],
        'f2' : 'a4'
    });
    p1.dispatch(new RemoveItem());
    expect(ruleNode.p1.length).toEqual(3);
    expect(ruleNode.p1[0].value).toEqual('a1');
    expect(ruleNode.p1[1].value).toEqual('a2');
    expect(ruleNode.p1[2].value).toEqual('a3');
});

test('rule node of a dynamic panel gets updated on removeItem event at specific index', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    formJson.items[1].minItems = 1;
    formJson.items[1].initialItems = 5;
    formJson.items[1].items[0].default = 'abcd';
    const form = new Form(formJson, new RuleEngine());
    const ruleNode = form.getRuleNode();
    const p1 = form.getElement(ruleNode.p1.id);
    form.importData({
        'f1' : 'a',
        'p1' : ['a1', 'a2', 'a3', 'a4'],
        'f2' : 'a4'
    });
    p1.dispatch(new RemoveItem(2));
    expect(ruleNode.p1.length).toEqual(3);
    expect(ruleNode.p1[0].value).toEqual('a1');
    expect(ruleNode.p1[1].value).toEqual('a2');
    expect(ruleNode.p1[2].value).toEqual('a4');
});

test('modification of items updates the values in the rules', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    formJson.items[2].type = 'number'
    formJson.items[2].rules = {
        'value' : 'length(p1)'
    };
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const panel = form.getElement(state.items[1].id) as FieldsetModel;
    const field = form.getElement(state.items[2].id) as FieldModel;
    expect(field.getState().value).toEqual(1);
    panel.dispatch(new AddItem());
    panel.dispatch(new AddItem());
    expect(field.getState().value).toEqual(3);
    panel.dispatch(new RemoveItem());
    expect(field.getState().value).toEqual(2);
});
