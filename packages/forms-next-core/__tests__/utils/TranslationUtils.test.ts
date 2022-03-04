import {
    addTranslationId,
    createTranslationObject,
    TRANSLATION_ID,
    CUSTOM_PROPS_KEY
} from '../../src/utils/TranslationUtils';

test('returns form model json with translation id present', () => {
    const actual = addTranslationId({
        'items' : {
            'panel' : {
                'fieldType': 'panel',
                'items' : {
                    'firstName': {
                        'fieldType': 'text-input',
                        'type': 'string',
                        'label': {
                            'value' : 'Hello, world'
                        },
                        'description': "The person's first name.",
                        'name': 'firstName',
                        'required': true
                    },
                    'lastName': {
                        'fieldType': 'text-input',
                        'type': 'string',
                        'label': {
                            'value': 'Hello, world'
                        },
                        'description': "The person's first name.",
                        'name': 'firstName',
                        'required': true
                    }
                }
            }
        }
    });
    expect(actual).toBeDefined();
    expect(Object.keys(actual).length).toBeGreaterThan(0);
    // panel does not have any translatable properties, hence this object would be undefined
    expect(actual.items.panel[CUSTOM_PROPS_KEY]).toBeUndefined();
    expect(actual.items.panel.items.firstName[CUSTOM_PROPS_KEY][TRANSLATION_ID]).toBeDefined();
    //expect(actual.items.panel.items.firstName[TRANSLATION_ID].title).toBeDefined();
    //expect(actual.items.panel.items.lastName[TRANSLATION_ID].title).toBeDefined();
    expect(actual.items.panel.items.lastName[CUSTOM_PROPS_KEY][TRANSLATION_ID].description).toBeDefined();
    expect(actual.items.panel.items.firstName[CUSTOM_PROPS_KEY][TRANSLATION_ID].description).toBeDefined();
});

test('returns translation dictionary with translation keys', () => {
    const actual = {
        'items' : {
            'panel' : {
                'fieldType': 'panel',
                'items' : {
                    'firstName': {
                        'fieldType': 'text-input',
                        'type': 'string',
                        'label': {
                            'value' : 'Hello, world'
                        },
                        'description': "The person's first name.",
                        'name': 'firstName',
                        'required': true
                    },
                    'lastName': {
                        'fieldType': 'text-input',
                        'type': 'string',
                        'label': {
                            'value' : 'Hello, world'
                        },
                        'description': "The person's first name.",
                        'name': 'firstName',
                        'required': true,
                        'enumNames' : ['Yes', 'No']
                    }
                }
            }
        }
    };
    const [newObj, allLangObj] = createTranslationObject(actual);
    expect(newObj).toBeDefined();
    expect(Object.keys(allLangObj).length).toEqual(10);
    //expect(Object.keys(allLangObj['en-US']).length).toEqual(6);
});