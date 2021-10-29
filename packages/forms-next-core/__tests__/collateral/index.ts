import {FormJson} from '../../src/types';

export const oneFieldForm: FormJson = {
    items: {
        'name': {
            type: 'string',
            viewType: 'text-input',
            name: 'name'
        }
    }
};

export const numberFieldForm : FormJson = {
    items: {
        'name': {
            type : 'number',
            viewType: 'number-input',
            name: 'name'
        }
    }
};

export const formWithPanel: FormJson = {
    items: {
        'name': {
            type : 'string',
            viewType: 'text-input',
            name: 'name'
        },
        'address': {
            type : 'object',
            name: 'address',
            items: {
                'zip': {
                    type : 'number',
                    viewType: 'number-input',
                    name: 'zip'
                }
            }
        }
    }
};

export const nonFormComponent: FormJson = {
    items: {
        'name': {
            type : 'string',
            viewType: 'text-input',
            name: 'name'
        },
        'somekey': {
            items: {
                'zip': {
                    type : 'number',
                    viewType: 'number-input',
                    name: 'zip'
                }
            }
        }
    }
};


export const formWithRules = {
    items: {
        'firstName': {
            type : 'string',
            viewType: 'text-input',
            name: 'firstName'
        },
        'lastName': {
            type : 'string',
            viewType: 'text-input',
            name: 'lastName'
        },
        'fullName' : {
            type : 'string',
            viewType : 'text-input',
            rules : {
                value : "$form.firstName.value + ' ' + $form.lastName.value"
            },
            name : 'fullName'
        }
    }
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

export const create = (arr: any[], nameMap: any = {p : 1}): any => {
    let newNameMap = {
        ...nameMap
    };

    const createObj = (s: string) => {
        const name = s + newNameMap[s];
        return {
            name : name
        };
    };

    return arr.reduce((items, curr) => {
        let obj:any = {};
        if (curr instanceof  Array) {
            obj = createObj('p');
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
        items.items[obj.name] = obj;
        return items;
    }, {items: {}});
};

