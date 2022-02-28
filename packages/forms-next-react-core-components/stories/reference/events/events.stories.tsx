import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {base} from "../../template";

export default {
    title: 'Reference/JSON/events',
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
        "viewType": "button",
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
            "viewType": "button",
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
            "viewType": "checkbox",
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
            "viewType": "text-input",
            "events": {
                "blur": ['{value : upper($field.value)}', 'validate($event.target)']
            }
        }]
}


const template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const click = template.bind({})
click.args = {
    formJson: clickJson
};


export const initialize = template.bind({})
initialize.args = {
    formJson: initializeJson
};

export const change = template.bind({})
change.args = {
    formJson: changeJson
};

export const blur = template.bind({})
blur.args = {
    formJson: blurJson
};

