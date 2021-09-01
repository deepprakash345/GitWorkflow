import {renderHook, act} from '@testing-library/react-hooks';
import {useRuleEngine} from '../../react-mapper/hooks';
import FormContext from '../../react-mapper/FormContext';
import React from 'react';
import {Controller} from '@adobe/forms-next-core/lib/controller/Controller';
import {Change, Click} from '@adobe/forms-next-core/lib/controller/Actions';
import {testController} from '../utils';

let mockController : Controller;

beforeEach(() => {
    mockController = testController();
});

test('should return the original value', () => {
    const wrapper = (props : any) => {
        return (<FormContext.Provider
            value={{controller: mockController, mappings: {}}}>{props.children}</FormContext.Provider>);
    };
    const {result} = renderHook(() => useRuleEngine({':id' : 'something'}), {wrapper});
    expect(result.current[0]).toEqual({':id' : 'something'});
});

test('should subscribe to the form', () => {
    const wrapper = (props : any) => {
        return (<FormContext.Provider
            value={{controller: mockController, mappings: {}}}>{props.children}</FormContext.Provider>);
    };
    const {result} = renderHook(() => useRuleEngine({':id' : 'id'}), {wrapper});
    expect(mockController.subscribe).toHaveBeenCalledWith('id', expect.anything());
});

test('should trigger the dispatch event of the form', () => {
    const wrapper = (props : any) => {
        return (<FormContext.Provider
            value={{controller: mockController, mappings: {}}}>{props.children}</FormContext.Provider>);
    };
    const {result} = renderHook(() => useRuleEngine({':id' : 'id'}), {wrapper});
    result.current[1]('value');
    expect(mockController.dispatch).toHaveBeenCalledWith(new Change('id', 'value'));
});

test('should trigger the dispatch click event on the form', () => {
    const wrapper = (props : any) => {
        return (<FormContext.Provider
            value={{controller: mockController, mappings: {}}}>{props.children}</FormContext.Provider>);
    };
    const {result} = renderHook(() => useRuleEngine({':id' : 'id'}), {wrapper});
    result.current[2]();
    expect(mockController.dispatch).toHaveBeenCalledWith(new Click('id', null));
});

test('should subscribe to the form', () => {
    const wrapper = (props : any) => {
        return (<FormContext.Provider
            value={{controller: mockController, mappings: {}}}>{props.children}</FormContext.Provider>);
    };
    const {result} = renderHook(() => useRuleEngine({':id' : 'id'}), {wrapper});
    expect(mockController.subscribe).toHaveBeenCalledWith('id', expect.anything());
});
