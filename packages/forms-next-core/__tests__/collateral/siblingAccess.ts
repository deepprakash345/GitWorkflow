const staticForm = {
    items: [
        {
            name: 'field1',
            type: 'string',
            fieldType: 'text-input'
        },
        {
            name: 'field2',
            type: 'string',
            fieldType: 'text-input',
            rules: {
                value : 'field1.value'
            }
        }
    ]
};

const dynamicForm = {
    items: [
        {
            name: 'orders',
            type: 'array',
            fieldType: 'panel',
            minItems : 1,
            maxItems : 10,
            items: [
                {
                    fieldType: 'panel',
                    type: 'object',
                    items: [
                        {
                            name : 'price',
                            type: 'number',
                            fieldType: 'text-input'
                        },
                        {
                            name : 'quantity',
                            type: 'number',
                            fieldType: 'text-input'
                        },
                        {
                            name : 'total',
                            type: 'number',
                            fieldType: 'text-input',
                            rules: {
                                value : 'price * quantity'
                            }
                        }
                    ]
                }
            ]
        }
    ]
};

export default {
    dynamicForm,
    staticForm
};