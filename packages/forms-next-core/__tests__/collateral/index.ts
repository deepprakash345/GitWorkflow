import {FormJson, FormModel} from '../../src/types';
import RuleEngine from '../../src/rules/RuleEngine';
import EventQueue from '../../src/controller/EventQueue';
export * as siblingAccess from './siblingAccess';

export const oneFieldForm: FormJson = {
    items: [
        {
            type: 'string',
            viewType: 'text-input',
            name: 'name'
        }]
};

export const numberFieldForm : FormJson = {
    items: [
        {
            type : 'number',
            viewType: 'number-input',
            name: 'name'
        }
        ]
};

export const formWithPanel: FormJson = {
    items: [
        {
            type : 'string',
            viewType: 'text-input',
            name: 'name'
        },
        {
            type : 'object',
            name: 'address',
            items: [
                {
                    type : 'number',
                    viewType: 'number-input',
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
            viewType: 'text-input',
            name: 'name'
        },
        {
            name : 'somekey',
            items : [
                {
                    type : 'number',
                    viewType: 'number-input',
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
            viewType: 'text-input',
            name: 'firstName'
        },
        {
            type : 'string',
            viewType: 'text-input',
            name: 'lastName'
        },
        {
            type : 'string',
            viewType : 'text-input',
            rules : {
                value : "$form.firstName.value + ' ' + $form.lastName.value"
            },
            name : 'fullName'
        }
    ]
};


export const randomWord = (l: number) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const ret = [];
    for (let i = 0; i<=l; i++) {
        const randIndex = Math.floor(Math.random()*(chars.length));
        ret.push(chars[randIndex]);
    }
    return ret.join('');
};

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
        viewType: '',
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
