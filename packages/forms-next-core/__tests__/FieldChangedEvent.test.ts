import {create} from './collateral';
import Form from '../src/Form';
import RuleEngine from '../src/rules/RuleEngine';
import customMatchers from './collateral/actions';
import {ActionImpl} from '../src/controller/Controller';

expect.extend(customMatchers);
test('changes to a field\'s value triggers a FieldChanged Event', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = new Form(formJson, new RuleEngine());
    const callback = jest.fn();
    form.subscribe(callback, 'fieldChanged');
    const f1 = form.items[0];
    f1.value = 'something';
    const action = new ActionImpl({
        field: form.items[0].getState(),
        changes : [{
            propertyName: 'value',
            currentValue: 'something'
        },
        {
            propertyName: 'valid',
            currentValue: true
        },
        {
            propertyName: 'errorMessage',
            currentValue: ''
        }]
    }, 'fieldChanged');
    expect(callback).toBeCalled();
    expect(callback.mock.calls[0][0]).matchesAction({action, target: form});
});

test('changes to a field\'s property triggers a FieldChanged Event', async () => {
    const formJson = create(['f', 'f', 'f']);
    let form = new Form(formJson, new RuleEngine());
    const callback = jest.fn();
    form.subscribe(callback, 'fieldChanged');
    const f1 = form.items[0];
    f1.enum = ['something'];
    const action = new ActionImpl({
        field: form.items[0].getState(),
        changes : [{
            propertyName: 'enum',
            currentValue: ['something']
        }]
    }, 'fieldChanged');
    expect(callback).toBeCalled();
    expect(callback.mock.calls[0][0]).matchesAction({action, target: form});
});