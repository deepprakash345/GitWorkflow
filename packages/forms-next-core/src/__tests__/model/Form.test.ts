import {create, formWithRules} from '../collateral';
import {createFormInstance} from '../../FormInstance';

test('fetch an element from form', () => {
    const formJson = create(['f', 'f', 'f']);
    let form = createFormInstance(formJson);
    const f1 = form.getElement('f1');
    expect(f1[':name']).toEqual('f1');
});

test('fetch a nested element from form', () => {
    const formJson = create(['f', [['f', 'f'], 'f', 'f'], 'f']);
    let form = createFormInstance(formJson);
    const f1 = form.getElement('p1.p2.f2');
    expect(f1[':name']).toEqual('f2');
});

test('form with rules', () => {
    const formJson:any = Object.assign({}, formWithRules);
    formJson[':items'].firstName[':value'] = 'john';
    formJson[':items'].lastName[':value'] = 'doe';
    let form = createFormInstance(formJson);
    form.executeAllRules();
    expect(form.json()[':items'].fullName[':value']).toEqual('john doe');
});