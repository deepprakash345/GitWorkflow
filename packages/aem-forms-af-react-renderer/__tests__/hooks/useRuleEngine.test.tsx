/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

import {renderHook} from '@testing-library/react-hooks';
import FormContext from '../../src/component/FormContext';
import React from 'react';
import {useRuleEngine} from '../../src';
import {FormModel, AddItem, Click} from '@adobe/aem-forms-af-core';
import { randomWord } from '@adobe/aem-forms-af-core/lib/utils/FormUtils';
import RuleEngine from "@adobe/aem-forms-af-core/lib/rules/RuleEngine";
import EventQueue from "@adobe/aem-forms-af-core/lib/controller/EventQueue";

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
