import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-super-component';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {base, decorator} from "../../template";
import documentation from './events.mdx'

export default {
    title: 'Adaptive Form/Events',
    decorators: [decorator],
    parameters: {
        docs: {
            page: documentation
        }
    },
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const clickJson = {
    ...base,
    "items": [
        {
        "name": "button",
        "label": {
            "value": "click me"
        },
        "fieldType": "button",
        "events": {
            "click": "{label: {value : 'You Clicked me'}}",
        }
    }]
}

const initializeJson = {
    ...base,
    "items": [
        {
            "name": "button",
            "label": {
                "value": "click me"
            },
            "fieldType": "button",
            "events": {
                "initialize": "{label: {value : 'I have been initialized. Click me'}}",
                "click": "{label: {value : 'You Clicked me again'}}"
            }
        }]
}

const changeJson = {
    ...base,
    "items": [
        {
            "name": "checkbox",
            "label": {
                "value": "click me"
            },
            "enum" : [1, 2],
            "fieldType": "checkbox",
            "events": {
                "change": "{label: {value : if(value == 1, 'Hurray, I am chosen :-)', 'Please choose me :-|')}}"
            }
        }]
}

const blurJson = {
    ...base,
    "items": [
        {
            "name": "textinput",
            "label": {
                "value": "On focus out, value of text input would be transformed to upper case and validated"
            },
            'required': true,
            'constraintMessages': {
                'required': 'mandatory field'
            },
            "fieldType": "text-input",
            "events": {
                "blur": ['{value : upper($field.value)}', 'validate($event.target)']
            }
        }]
}


const template: ComponentStory<typeof AdaptiveForm> = (args) => (
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
);



export const change = template.bind({})
change.storyName = "change"
change.args = {
    formJson: changeJson
};

export const blur = template.bind({})
blur.storyName = "blur"
blur.args = {
    formJson: blurJson
};


export const initialize = template.bind({})
initialize.storyName = "initialize"
initialize.args = {
    formJson: initializeJson
};


export const click = template.bind({})
click.storyName = "click"
click.args = {
    formJson: clickJson
};


