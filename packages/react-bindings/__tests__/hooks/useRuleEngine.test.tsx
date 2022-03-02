import {renderHook} from '@testing-library/react-hooks';
import FormContext from '../../src/component/FormContext';
import React from 'react';
import {useRuleEngine} from '../../src';
import RuleEngine from '@aemforms/crispr-core/lib/rules/RuleEngine';
import EventQueue from '@aemforms/crispr-core/lib/controller/EventQueue';
import {FormModel} from '@aemforms/crispr-core/lib';
import {randomWord} from '@aemforms/crispr-core/lib/utils/FormUtils';
import {AddItem, Click} from '@aemforms/crispr-core/lib/controller/Controller';

export const MockForm = (ruleEngine: RuleEngine, eventQueue: EventQueue):FormModel => {
    return {
        exportData: jest.fn(),
        getElement: jest.fn(),
        isContainer: true,
        items: [],
        getState: jest.fn(),
        getUniqueId: () => {
            return randomWord(10);
        },
        ruleEngine: ruleEngine,
        index: 0,
        //@ts-ignore
        getDataNode: jest.fn(),
        //@ts-ignore
        parent: null,
        //@ts-ignore
        value: undefined,
        fieldType: '',
        dispatch: jest.fn(),
        getEventQueue: () => {
            return eventQueue;
        },
        indexOf: jest.fn(),
        submit: jest.fn(),
        subscribe: jest.fn(),
        importData: jest.fn(),
        id : '$form',
        getRuleNode: jest.fn(),
        directReferences: jest.fn()
    };
};

let form: FormModel, wrapper: any;

beforeEach(() => {
    form = MockForm(new RuleEngine(), new EventQueue());
    form.getElement = jest.fn().mockReturnValue(form);
    wrapper = (props : any) => {
        return (<FormContext.Provider
            // @ts-ignore
            value={{form, mappings: {}, modelId: '$form', refMap: {}}}>{props.children}</FormContext.Provider>);
    };
});

test('should fetch the field controller', () => {
    renderHook(() => useRuleEngine({'id': 'something', ':type' : 'text-input'}), {wrapper});
    expect(form.getElement).toHaveBeenCalledWith('something');
});

test('should return the original value', () => {
    const {result} = renderHook(() => useRuleEngine({'id': 'something', ':type' : 'text-input'}), {wrapper});
    expect(result.current[0]).toEqual({'id' : 'something', ':type' : 'text-input'});
});

test('should subscribe to the form', () => {
    renderHook(() => useRuleEngine({'id': 'id', ':type' : 'text-input'}), {wrapper});
    expect(form.subscribe).toHaveBeenCalledWith(expect.anything());
});

test('should trigger the dispatch event of the form', () => {
    const {result} = renderHook(() => useRuleEngine({'id': 'id', ':type' : 'text-input'}), {wrapper});
    result.current[1].dispatchAddItem();
    expect(form.dispatch).toHaveBeenCalledWith(new AddItem());
});

test('should trigger the dispatch click event on the form', () => {
    const {result} = renderHook(() => useRuleEngine({'id': 'id', ':type' : 'text-input'}), {wrapper});
    result.current[1].dispatchClick();
    expect(form.dispatch).toHaveBeenCalledWith(new Click(null));
});
