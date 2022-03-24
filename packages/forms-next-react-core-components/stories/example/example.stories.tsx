import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-super-component';
import { ComponentStory } from '@storybook/react';
import mappings from '../../src/utils/mappings';
import formJson from './json';
import {decorator, logAction} from '../template';
import fieldWithLabel from '../../../../docs/examples/starter/fieldWithLabel.form.json';
import withSubmitButton from '../../../../docs/examples/starter/withSubmitButton.form.json';
import hierarchy from '../../../../docs/examples/starter/hierarchy.form.json';
import hierarchyWithDataModel from '../../../../docs/examples/starter/hierarchyWithDataModel.form.json';
import {FormJson} from '@aemforms/forms-core';
import jsonform from "./json";
import produce from 'immer';


export default {
    title: 'Reference/Examples',
    component: AdaptiveForm,
    decorators: [decorator],
        parameters: {
        docs: {
            page: null
        }
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>
);

export const Introduction = Template.bind({});
Introduction.args={formJson:fieldWithLabel};

export const formData = Template.bind({});
formData.args={formJson:withSubmitButton, onSubmit: logAction('onSubmit')};
formData.parameters = {
    highlights : ['items.3']
};

export const nestedData = Template.bind({});
nestedData.args={formJson:hierarchy, onSubmit: logAction('onSubmit')};

export const dataBindings = Template.bind({});
dataBindings.args={formJson:hierarchyWithDataModel, onSubmit: logAction('onSubmit')};

export const Contact = Template.bind({});
Contact.args={formJson: formJson.contactJson as FormJson};

export const PrefillFormWithPersonalisedData = Template.bind({});

// maintain immutability via immer
const contactWithPersonalisedData: any = produce(formJson.contactJson, draft => {
    // mutating draft implementation without changing the original object
    // @ts-ignore
    draft.data = {
        'firstName' : 'abc',
        'lastName' : 'def',
        'email' : 'abc.def@xyz.in'
    };
    // @ts-ignore
    draft.items[0].enabled =  draft.items[1].enabled =  draft.items[2].enabled =  draft.items[3].enabled = false;
});
PrefillFormWithPersonalisedData.args={formJson: contactWithPersonalisedData as FormJson};
