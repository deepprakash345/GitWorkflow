import {validateFormInstance} from '../src/FormInstance';

const form = {
    'items': [{
        'viewType': 'panel',
        'name': 'personal',
        'type': 'object',
        'items': [
            {
                'name': 'firstname',
                'viewType': 'text-input',
                'type': 'string',
                'required': true,
                'constraintMessages': {
                    'required': 'The field is required'
                },
                'props:translationIds': {
                    'title': 'personal##9636##firstname##184##title##4993'
                },
                'label': {
                    'value': 'Firstname'
                }
            },
            {
                'name': 'lastname',
                'viewType': 'text-input',
                'type': 'string',
                'required': true,
                'constraintMessages': {
                    'required': 'The field is required'
                },
                'props:translationIds': {
                    'title': 'personal##9636##lastname##5970##title##5962'
                },
                'label': {
                    'value': 'Lastname'
                }
            },
            {
                'name': 'selectone',
                'viewType': 'radio-group',
                'type': 'boolean',
                'enum': [
                    true,
                    false
                ],
                'enumNames': [
                    'Option 1(choose me)',
                    'Option 2'
                ],
                'required': true,
                'constraintMessages': {
                    'required': 'The field is required'
                },
                'props:translationIds': {
                    'title': 'personal##9636##selectone##9252##title##1205',
                    'enumNames': 'personal##9636##selectone##9252##enumNames##1723',
                    'enum': 'personal##2451##selectone##868##enum##2824'
                },
                'label': {
                    'value': 'Select One'
                }
            },
            {
                'name': 'aboutme',
                'viewType': 'multiline-input',
                'default': 'Everything is awesome!',
                'type': 'string',
                'required': true,
                'constraintMessages': {
                    'required': 'The field is required'
                },
                'props:translationIds': {
                    'title': 'personal##9636##aboutme##3552##title##543'
                },
                'label': {
                    'value': 'About me'
                }
            },
            {
                'name': 'submit',
                'viewType': 'button',
                'screenReaderText': 'Enter your message in less than 1000 characters and minimum 50 characters',
                'events': {
                    'click': "dispatch_event($form, 'submit')"
                },
                'props:translationIds': {
                    'title': 'personal##9636##submit##5663##title##8429'
                },
                'label': {
                    'value': 'Submit'
                }
            }
        ],
        'props:translationIds': {
            'title': 'personal##7195##title##8805'
        },
        'label': {
            'value': 'Personal Information'
        }
    }
    ],
    'props:thankyouMessage': 'Thank you for submitting the form',
    'metadata': {
        'grammar': 'json-formula-1.0.0',
        'version': '1.0.0'
    }
};

test('validation with required fields and no data', () => {
    const res = validateFormInstance(form, {});
    expect(res).toEqual(false);
});

test('validation with required fields and data', () => {
    const res = validateFormInstance(form, {
        'personal': {
            'firstname': 'a',
            'lastname': 'b',
            'selectone': true,
            'aboutme': 'Everything is awesome!'
        }
    });
    expect(res).toEqual(true);
});