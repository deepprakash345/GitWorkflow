import {
    addTranslationId,
    createTranslationObj,
    createTranslationObject,
    TRANSLATION_ID
} from '../../lib/utils/TranslationUtils';

test('returns form model json with translation id present', () => {
    const actual = addTranslationId({
        'items' : {
            'panel' : {
                'viewType': 'panel',
                'items' : {
                    'firstName': {
                        'viewType': 'text-input',
                        'type': 'string',
                        'label': {
                            'value' : 'Hello, world'
                        },
                        'description': "The person's first name.",
                        'name': 'firstName',
                        'required': true
                    },
                    'lastName': {
                        'viewType': 'text-input',
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
    expect(actual.items.panel[TRANSLATION_ID]).toBeUndefined();
    expect(actual.items.panel.items.firstName[TRANSLATION_ID]).toBeDefined();
    //expect(actual.items.panel.items.firstName[TRANSLATION_ID].title).toBeDefined();
    //expect(actual.items.panel.items.lastName[TRANSLATION_ID].title).toBeDefined();
    expect(actual.items.panel.items.lastName[TRANSLATION_ID].description).toBeDefined();
    expect(actual.items.panel.items.firstName[TRANSLATION_ID].description).toBeDefined();
});

test('returns translation dictionary with translation keys', () => {
    const actual = {
        'items' : {
            'panel' : {
                'viewType': 'panel',
                'items' : {
                    'firstName': {
                        'viewType': 'text-input',
                        'type': 'string',
                        'label': {
                            'value' : 'Hello, world'
                        },
                        'description': "The person's first name.",
                        'name': 'firstName',
                        'required': true
                    },
                    'lastName': {
                        'viewType': 'text-input',
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