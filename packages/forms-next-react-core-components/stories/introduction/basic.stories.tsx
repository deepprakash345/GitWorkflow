import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@aemforms/crispr-react-bindings';
import {ComponentStory} from '@storybook/react';
import {mappings} from '../../src';
import {decorator} from "../template";
import documentation from './documentation.mdx'
import fieldWithLabel from '../../../../docs/examples/starter/fieldWithLabel.form.json';
import withSubmitButton from '../../../../docs/examples/starter/withSubmitButton.form.json';
import hierarchy from '../../../../docs/examples/starter/hierarchy.form.json'
import {logAction} from "../template";

export default {
    title: 'Crispr/Introduction',
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

export const Introduction = Template.bind({});
Introduction.args={formJson:fieldWithLabel}

export const formData = Template.bind({});
formData.args={formJson:withSubmitButton, onSubmit: logAction('onSubmit')}
formData.parameters = {
    highlights : ["items.3"]
}

export const nestedData = Template.bind({});
nestedData.args={formJson:hierarchy, onSubmit: logAction('onSubmit')}