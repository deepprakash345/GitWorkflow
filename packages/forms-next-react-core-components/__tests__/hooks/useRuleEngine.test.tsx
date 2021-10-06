import {renderHook} from '@testing-library/react-hooks';
import {useRuleEngine} from '../../src/react-mapper/hooks';
import FormContext from '../../src/react-mapper/FormContext';
import React from 'react';
import {Controller, Change, Click} from '@adobe/forms-next-core/lib/controller/Controller';
import {testController} from '../utils';

let mockController : Controller;

beforeEach(() => {
    mockController = testController();
});

test('should fetch the field controller', () => {
    const wrapper = (props : any) => {
        return (<FormContext.Provider
            value={{controller: mockController, mappings: {}}}>{props.children}</FormContext.Provider>);
    };
    renderHook(() => useRuleEngine({'id': 'something'}), {wrapper});
    expect(mockController.getElementController).toHaveBeenCalledWith('something');
});

test('should return the original value', () => {
    const wrapper = (props : any) => {
        return (<FormContext.Provider
            value={{controller: mockController, mappings: {}}}>{props.children}</FormContext.Provider>);
    };
    const {result} = renderHook(() => useRuleEngine({'id': 'something'}), {wrapper});
    expect(result.current[0]).toEqual({'id' : 'something'});
});

test('should subscribe to the form', () => {
    mockController.getElementController = jest.fn().mockReturnValue(mockController);
    const wrapper = (props : any) => {
        return (<FormContext.Provider
            value={{controller: mockController, mappings: {}}}>{props.children}</FormContext.Provider>);
    };
    renderHook(() => useRuleEngine({'id': 'id'}), {wrapper});
    expect(mockController.subscribe).toHaveBeenCalledWith(expect.anything());
});

test('should trigger the dispatch event of the form', () => {
    mockController.getElementController = jest.fn().mockReturnValue(mockController);
    const wrapper = (props : any) => {
        return (<FormContext.Provider
            value={{controller: mockController, mappings: {}}}>{props.children}</FormContext.Provider>);
    };
    const {result} = renderHook(() => useRuleEngine({'id': 'id'}), {wrapper});
    result.current[1].dispatchChange('value');
    expect(mockController.dispatch).toHaveBeenCalledWith(new Change('value'));
});

test('should trigger the dispatch click event on the form', () => {
    mockController.getElementController = jest.fn().mockReturnValue(mockController);
    const wrapper = (props : any) => {
        return (<FormContext.Provider
            value={{controller: mockController, mappings: {}}}>{props.children}</FormContext.Provider>);
    };
    const {result} = renderHook(() => useRuleEngine({'id': 'id'}), {wrapper});
    result.current[1].dispatchClick();
    expect(mockController.dispatch).toHaveBeenCalledWith(new Click(null));
});
