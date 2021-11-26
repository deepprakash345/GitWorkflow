import {create} from './collateral';
import {createFormInstance} from '../src';
import {AddItem, Change, RemoveItem} from '../src/controller/Controller';
import Form from '../src/Form';
import RuleEngine from '../src/rules/RuleEngine';

test('addItem event on non dynamic panel (fixed array) does nothing', async () => {
    const formJson = create(['f', ['f', 'f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElementController(state.items[1].id);
    element.dispatch(new AddItem());
    state = form.getState();
    expect(state.items[1].items.length).toEqual(2);

});

test('removeItem event on non dynamic panel (fixed array) does nothing', async () => {
    const formJson = create(['f', ['f', 'f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElementController(state.items[1].id);
    element.dispatch(new RemoveItem());
    state = form.getState();
    expect(state.items[1].items.length).toEqual(2);
});

test('addItem event on non dynamic panel (object) does nothing', async () => {
    const formJson = create(['f', ['f', 'f'], 'f']);
    formJson.items[1].type = 'object';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElementController(state.items[1].id);
    element.dispatch(new AddItem());
    state = form.getState();
    expect(state.items[1].items.length).toEqual(2);
});

test('removeItem event on non dynamic panel (object) does nothing', async () => {
    const formJson = create(['f', ['f', 'f'], 'f']);
    formJson.items[1].type = 'object';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElementController(state.items[1].id);
    element.dispatch(new RemoveItem());
    state = form.getState();
    expect(state.items[1].items.length).toEqual(2);
});

test('items are created initially for dynamic panel when minItems is greater than 1', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    formJson.items[1].minItems = 4;
    const form = await createFormInstance(formJson);
    let state = form.getState();
    expect(state.items[1].items.length).toEqual(4);
});

test('addItem event on dynamic panel adds an item', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElementController(state.items[1].id);
    element.dispatch(new AddItem());
    state = form.getState();
    expect(state.items[1].items.length).toEqual(2);
});

test('removeItem event on dynamic panel removes an item', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElementController(state.items[1].id);
    element.dispatch(new RemoveItem());
    state = form.getState();
    expect(state.items[1].items.length).toEqual(0);
});

test('addItem event on dynamic panel honors addition upto maxItems', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    formJson.items[1].maxItems = 5;
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElementController(state.items[1].id);
    element.dispatch(new AddItem());
    element.dispatch(new AddItem());
    element.dispatch(new AddItem());
    element.dispatch(new AddItem());
    state = form.getState();
    expect(state.items[1].items.length).toEqual(5);

    element.dispatch(new AddItem());
    state = form.getState();
    expect(state.items[1].items.length).toEqual(5);

});

test('RemoveItem event on dynamic panel honors removal until minItems', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    formJson.items[1].minItems = 2;
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const element = form.getElementController(state.items[1].id);
    element.dispatch(new AddItem());
    element.dispatch(new AddItem());
    state = form.getState();
    expect(state.items[1].items.length).toEqual(4);

    element.dispatch(new RemoveItem());
    element.dispatch(new RemoveItem());
    state = form.getState();
    expect(state.items[1].items.length).toEqual(2);

    element.dispatch(new RemoveItem());
    state = form.getState();
    expect(state.items[1].items.length).toEqual(2);
});

test('addItem event on dynamic panel adds an item at the specified index', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const panel = form.getElementController(state.items[1].id);
    panel.dispatch(new AddItem());

    state = panel.getState();
    let field1 = form.getElementController(state.items[0].id);
    field1.dispatch(new Change('a'));
    let field2 = form.getElementController(state.items[1].id);
    field2.dispatch(new Change('b'));

    state = panel.getState();
    expect(state.items[0].value).toEqual('a');
    expect(state.items[1].value).toEqual('b');

    panel.dispatch(new AddItem(1));
    const state2 = panel.getState();
    expect(state2.items[0].value).toEqual('a');
    expect(state2.items[1].value).toEqual(undefined);
    expect(state2.items[2].value).toEqual('b');

    expect(state.items[0].id).toEqual(state2.items[0].id);
    expect(state.items[1].id).toEqual(state2.items[2].id);
});

test('add Item resets the indices of other items', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const panel = form.getElementController(state.items[1].id);
    panel.dispatch(new AddItem());

    state = panel.getState();
    let field1 = form.getElementController(state.items[0].id);
    field1.dispatch(new Change('a'));
    let field2 = form.getElementController(state.items[1].id);
    field2.dispatch(new Change('b'));

    state = panel.getState();
    expect(state.items[0].index).toEqual(0);
    expect(state.items[1].index).toEqual(1);

    panel.dispatch(new AddItem(1));
    const state2 = panel.getState();
    expect(state2.items[0].index).toEqual(0);
    expect(state2.items[1].index).toEqual(1);
    expect(state2.items[2].index).toEqual(2);
});

test('removeItem event can remove an item at the specified index', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const panel = form.getElementController(state.items[1].id);
    panel.dispatch(new AddItem());
    panel.dispatch(new AddItem());

    state = panel.getState();
    let field1 = form.getElementController(state.items[0].id);
    field1.dispatch(new Change('a'));
    let field2 = form.getElementController(state.items[2].id);
    field2.dispatch(new Change('b'));

    state = panel.getState();
    expect(state.items[0].value).toEqual('a');
    expect(state.items[1].value).toEqual(undefined);
    expect(state.items[2].value).toEqual('b');

    panel.dispatch(new RemoveItem(1));
    const state2 = panel.getState();
    expect(state2.items[0].value).toEqual('a');
    expect(state2.items[1].value).toEqual('b');

    expect(state.items[0].id).toEqual(state2.items[0].id);
    expect(state.items[2].id).toEqual(state2.items[1].id);
});

test('removeItem event resets the indices as well', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const panel = form.getElementController(state.items[1].id);
    panel.dispatch(new AddItem());
    panel.dispatch(new AddItem());
    panel.dispatch(new RemoveItem(1));
    state = panel.getState();
    expect(state.items[0].index).toEqual(0);
    expect(state.items[1].index).toEqual(1);
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
    expect(ruleNode.p1.length).toEqual(1);
    expect(ruleNode.p1[0].value).toEqual('abcd');
    form.importData({
        'f1' : 'a',
        'p1' : ['a1', 'a2', 'a3'],
        'f2' : 'a4'
    });
    ruleNode.p1.controller.dispatch(new AddItem());
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
    expect(ruleNode.p1.length).toEqual(1);
    expect(ruleNode.p1[0].value).toEqual('abcd');
    form.importData({
        'f1' : 'a',
        'p1' : ['a1', 'a2', 'a3'],
        'f2' : 'a4'
    });
    ruleNode.p1.controller.dispatch(new AddItem());
    ruleNode.p1.controller.dispatch(new AddItem(2));
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
    form.importData({
        'f1' : 'a',
        'p1' : ['a1', 'a2', 'a3', 'a4'],
        'f2' : 'a4'
    });
    ruleNode.p1.controller.dispatch(new RemoveItem());
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
    form.importData({
        'f1' : 'a',
        'p1' : ['a1', 'a2', 'a3', 'a4'],
        'f2' : 'a4'
    });
    ruleNode.p1.controller.dispatch(new RemoveItem(2));
    expect(ruleNode.p1.length).toEqual(3);
    expect(ruleNode.p1[0].value).toEqual('a1');
    expect(ruleNode.p1[1].value).toEqual('a2');
    expect(ruleNode.p1[2].value).toEqual('a4');
});

test('modification of items updates the values in the rules', async () => {
    const formJson = create(['f', ['f'], 'f']);
    formJson.items[1].type = 'array';
    formJson.items[2].rules = {
        'value' : 'length(p1)'
    };
    const form = await createFormInstance(formJson);
    let state = form.getState();
    const panel = form.getElementController(state.items[1].id);
    const field = form.getElementController(state.items[2].id);
    state = field.getState();
    expect(state.value).toEqual(1);
    panel.dispatch(new AddItem());
    panel.dispatch(new AddItem());
    state = field.getState();
    expect(state.value).toEqual(3);
    panel.dispatch(new RemoveItem());
    state = field.getState();
    expect(state.value).toEqual(2);
});
