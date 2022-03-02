
import {TRANSLATION_TOKEN} from '@aemforms/crispr-core/lib/utils/TranslationUtils';
import {getTranslationMessages} from '../../src/component/i18n';

test('i18n getTranslationMessages returns flat react-intl message format', () => {
    const actual = getTranslationMessages({
        'items' : {
            'panel' : {
                'fieldType': 'panel',
                'items' : {
                    'firstName': {
                        'fieldType': 'text-input',
                        'type': 'string',
                        'title': 'Hello, world',
                        'description': "The person's first name.",
                        'props:translationIds' : {
                            'title' : 'panel##firstName##timeStamp##title##timeStamp',
                            'description' : 'panel##firstName##timeStamp##description##timeStamp'
                        },
                        'name': 'firstName',
                        'required': true
                    },
                    'lastName': {
                        'fieldType': 'text-input',
                        'type': 'string',
                        'title': 'Hello, world',
                        'description': "The person's last name.",
                        'props:translationIds' : {
                            'title' : 'panel##lastName##timeStamp##title##timeStamp',
                            'description' : 'panel##lastName##timeStamp##description##timeStamp',
                            'enumNames' : 'panel##lastName##timeStamp##enumNames##timeStamp'
                        },
                        'name': 'firstName',
                        'required': true,
                        'enumNames' : ['Yes', 'No']
                    }
                }
            }
        }
    });
    expect(actual).toBeDefined();
    //expect(Object.keys(actual).length).toEqual(6); //todo : handle labels
    // check if this matches the required react-intl format
    Object.entries(actual).forEach(([key, value])=> {
        // @ts-ignore
        expect(value.id).toBeDefined();
        // @ts-ignore
        expect(value.id).toContain(TRANSLATION_TOKEN);
        // @ts-ignore
        expect(value.defaultMessage).toBeDefined();
    });
});