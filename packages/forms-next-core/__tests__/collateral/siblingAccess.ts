const staticForm = {
    items: [
        {
            name: 'field1',
            type: 'string',
            viewType: 'text-input'
        },
        {
            name: 'field2',
            type: 'string',
            viewType: 'text-input',
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
            viewType: 'panel',
            minItems : 1,
            maxItems : 10,
            items: [
                {
                    viewType: 'panel',
                    type: 'object',
                    items: [
                        {
                            name : 'price',
                            type: 'number',
                            viewType: 'text-input'
                        },
                        {
                            name : 'quantity',
                            type: 'number',
                            viewType: 'text-input'
                        },
                        {
                            name : 'total',
                            type: 'number',
                            viewType: 'text-input',
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