import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import {mappings} from '../../src';
import {decorator, logAction} from "../template";
import {examples} from "./json";
import documentation from './documentation.mdx'

export default {
    title: 'Crispr/Form Components/DropDown',
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

export const def = Template.bind({})
def.storyName="default"
def.args = {formJson: examples['drop-down'], onSubmit : logAction('data')}

export const enumNames = Template.bind({})
enumNames.args = {formJson: examples['drop-down-enumNames'], onSubmit : logAction('data')}