import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@aemforms/crispr-react-bindings';
import {ComponentStory} from '@storybook/react';
import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum';
import {mappings} from '../../src';
import {decorator, logAction} from "../template";
import documentation from './doc/chapter1.mdx'
import {examples} from "./json";

export default {
    title: 'Crispr/Form Components/Checkbox Group',
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
def.storyName="Default"
def.args={formJson:examples['checkbox-group'], onSubmit : logAction('data')}

export const singleSelection = Template.bind({});
singleSelection.args={formJson:examples['checkbox-group-single'], onSubmit : logAction('data')}
