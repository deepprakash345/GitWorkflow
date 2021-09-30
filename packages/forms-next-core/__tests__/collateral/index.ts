import {Action, Controller} from '../../src/controller/Controller';

export const oneFieldForm = {
    ':items': {
        'name': {
            ':constraints': {
                ':dataType': 'string'
            },
            ':type': 'text',
            ':name': 'name'
        }
    }
};

export const numberFieldForm = {
    ':items': {
        'name': {
            ':constraints' : { ':dataType' : 'number' },
            ':type': 'numericEdit',
            ':name': 'name'
        }
    }
};

export const formWithPanel = {
    ':items': {
        'name': {
            ':constraints' : { ':dataType' : 'string' },
            ':type': 'text',
            ':name': 'name'
        },
        'address': {
            ':constraints' : { ':dataType' : 'object' },
            ':name': 'address',
            ':items': {
                'zip': {
                    ':constraints' : { ':dataType' : 'number' },
                    ':type': 'numericEdit',
                    ':name': 'zip'
                }
            }
        }
    }
};

export const nonFormComponent = {
    ':items': {
        'name': {
            ':constraints' : { ':dataType' : 'string' },
            ':type': 'text',
            ':name': 'name'
        },
        'somekey': {
            ':items': {
                'zip': {
                    ':constraints' : { ':dataType' : 'number' },
                    ':type': 'numericEdit',
                    ':name': 'zip'
                }
            }
        }
    }
};


export const formWithRules = {
    ':items': {
        'firstName': {
            ':constraints' : { ':dataType' : 'string' },
            ':type': 'text',
            ':name': 'firstName'
        },
        'lastName': {
            ':constraints' : { ':dataType' : 'string' },
            ':type': 'text',
            ':name': 'lastName'
        },
        'fullName' : {
            ':type' : 'text',
            ':rules' : {
                ':value' : "$form.firstName.value + ' ' + $form.lastName.value"
            },
            ':name' : 'fullName'
        }
    }
};



export const create = (arr: any[], nameMap: any = {p : 1}): any => {
    let newNameMap = {
        ...nameMap
    };

    const createObj = (s: string) => {
        const name = s + newNameMap[s];
        return {
            ':name' : name
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
            obj[':items'] = create(curr, newNameMap)[':items'];
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
        items[':items'][obj[':name']] = obj;
        return items;
    }, {':items': {}});
};

