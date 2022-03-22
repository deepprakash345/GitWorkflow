import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@aemforms/forms-super-component';
import {ComponentStory} from '@storybook/react';
import {mappings} from '../../../src';
import {decorator, formWithSubmit} from "../../template";
import React from 'react';

export default {
    title: 'Reference/JSON/Properties/properties',
    component: AdaptiveForm,
    decorators: [decorator]
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>
);

export const customProperties = Template.bind({});
customProperties.args={formJson:formWithSubmit( 'Custom Properties', {
        name: "scale",
        label: {
            value : 'Choose a Metric Scale'
        },
        type: "string",
        fieldType : 'checkbox-group',
        enum: ['pounds', 'kgs'],
        "default" : "kgs",
        "events" : {
            "change" : "{value: if($value == `null`, 'kgs', $value) }"
        }
    }, {
        name: 'field1',
        fieldType : 'text-input',
        type: 'number',
        label : {
            value : "Weight"
        },
        properties: {
            scale: "1"
        },
        rules : {
            properties : "{scale : if(scale == 'pounds', 1.6, 1)}",
            description : "'Maximum allowed weight is '  & ($field.$properties.scale * 100) & ' ' & scale",
            maximum : "$field.$properties.scale * 100"
        }
    })}
