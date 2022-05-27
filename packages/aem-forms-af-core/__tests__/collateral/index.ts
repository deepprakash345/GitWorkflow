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

import {FormJson, FormModel} from '../../src/types';
import RuleEngine from '../../src/rules/RuleEngine';
import EventQueue from '../../src/controller/EventQueue';
export * as siblingAccess from './siblingAccess';


export const oneFieldForm: FormJson = {
    items: [
        {
            type: 'string',
            fieldType: 'text-input',
            name: 'name'
        }]
};

export const numberFieldForm : FormJson = {
    items: [
        {
            type : 'number',
            fieldType: 'number-input',
            name: 'name'
        }
        ]
};

export const formWithPanel: FormJson = {
    items: [
        {
            type : 'string',
            fieldType: 'text-input',
            name: 'name'
        },
        {
            type : 'object',
            name: 'address',
            items: [
                {
                    type : 'number',
                    fieldType: 'number-input',
                    name: 'zip'
                }
            ]
        }
    ]
};

export const nonFormComponent: FormJson = {
    items : [
        {
            type : 'string',
            fieldType: 'text-input',
            name: 'name'
        },
        {
            name : 'somekey',
            items : [
                {
                    type : 'number',
                    fieldType: 'number-input',
                    name: 'zip'
                }
            ]
        }
    ]
};


export const formWithRules = {
    items :[
        {
            type : 'string',
            fieldType: 'text-input',
            name: 'firstName'
        },
        {
            type : 'string',
            fieldType: 'text-input',
            name: 'lastName'
        },
        {
            type : 'string',
            fieldType : 'text-input',
            rules : {
                value : "$form.firstName & ' ' & $form.lastName"
            },
            name : 'fullName'
        }
    ]
};


export const randomWord = (l: number, ex: string = '') => {
    const chars = 'abcdefghijklmnopqrstuvwxyz'.split('').filter(x => !ex.includes(x));
    const ret = [];
    for (let i = 0; i<=l; i++) {
        const randIndex = Math.floor(Math.random()*(chars.length));
        ret.push(chars[randIndex]);
    }
    return ret.join('');
};

export const randomInt = (end: number, beg: number = 0) => {
    if (end < beg) {
        return 0
    }
    return Math.floor(beg + Math.random() * (end - beg))
}

/**
 * Create a Form JSON
 * @param arr
 * @param nameMap
 */
export const create = (arr: any[], nameMap: { [key:string] : number }  = {p : 1}): any => {
    let newNameMap = {
        ...nameMap
    };

    const createObj = (s: string) => {
        const name = s + newNameMap[s];
        const res: any =  {
            name : name
        };
        return res;
    };

    return arr.reduce((items, curr) => {
        let obj:any = {};
        if (curr instanceof  Array) {
            obj = { type: 'object', ...createObj('p')};
            newNameMap = {
                ...newNameMap,
                p : newNameMap.p + 1
            };
            obj.items = create(curr, newNameMap).items;
        } else if (typeof curr === 'string') {
            newNameMap = {
                ...newNameMap,
                [curr]: newNameMap[curr] ? newNameMap[curr] + 1 : 1
            };
            obj = createObj(curr);
        } else if (typeof curr === 'object') {
            const [[name, props]] = Object.entries(curr);
            newNameMap = {
                ...newNameMap,
                [name]: newNameMap[name] ? newNameMap[name] + 1 : 1
            };
            obj = Object.assign(createObj(name), props);
        } else {
            throw `${curr} not support currently`;
        }
        items.items.push(obj);
        return items;
    }, {items: []});
};

export function jest26CompatibleTable<T>(tests: T[], mapper: (x:T) => string) : [string, T][] {
    return tests.map(t => {
        return [mapper(t), t];
    });
}

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
        ruleNodeReference: jest.fn()
    };
};

export const range = function* (start: number, end: number) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

