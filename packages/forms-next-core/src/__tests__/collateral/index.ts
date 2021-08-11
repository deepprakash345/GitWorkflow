export const oneFieldForm = {
    ':items': {
        'name': {
            ':type': 'string',
            ':viewType': 'text',
            ':name': 'name'
        }
    }
};

export const numberFieldForm = {
    ':items': {
        'name': {
            ':type': 'number',
            ':viewType': 'numericEdit',
            ':name': 'name'
        }
    }
};

export const formWithPanel = {
    ':items': {
        'name': {
            ':type': 'string',
            ':viewType': 'text',
            ':name': 'name'
        },
        'address': {
            ':type': 'object',
            ':name': 'address',
            ':items': {
                'zip': {
                    ':type': 'number',
                    ':viewType': 'numericEdit',
                    ':name': 'zip'
                }
            }
        }
    }
};

export const nonFormComponent = {
    ':items': {
        'name': {
            ':type': 'string',
            ':viewType': 'text',
            ':name': 'name'
        },
        'somekey': {
            ':items': {
                'zip': {
                    ':type': 'number',
                    ':viewType': 'numericEdit',
                    ':name': 'zip'
                }
            }
        }
    }
};
