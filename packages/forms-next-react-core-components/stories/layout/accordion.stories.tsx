import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@aemforms/forms-super-component';
import {ComponentStory} from '@storybook/react';
import {mappings} from '../../src';
import {decorator} from "../template";
import documentation from "./documentation.mdx"
import layouts from './json';
import React from 'react';

export default {
    title: 'Adaptive Form/Layouts/Accordion',
    component: AdaptiveForm,
    decorators: [decorator],
    parameters: {
        docs: {
            page: documentation
        }
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>
);

export const def = Template.bind({});
def.storyName = "Default";
def.args = { formJson: layouts.accordionJson };

export const Multiselectable = Template.bind({});
Multiselectable.args = { formJson: layouts.accordionMutiSelectJson };

export const selectedIndex = Template.bind({});
selectedIndex.storyName = "Default Selected Index";
selectedIndex.args = { formJson: layouts.accordionDeafultSelectedJson };
