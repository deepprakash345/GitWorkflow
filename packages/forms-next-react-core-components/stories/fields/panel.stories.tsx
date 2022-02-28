import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@aemforms/crispr-react-bindings';
import {ComponentStory} from '@storybook/react';
import {mappings} from '../../src';
import {decorator, formWithSubmit, logAction} from "../template";
import documentation from "./documentation.mdx"

export default {
    title: 'Crispr/Form Components/Panel',
    component: AdaptiveForm,
    decorators: [decorator],
    parameters: {
        docs: {
            page: documentation
        }
    },
    args: {
        onSubmit: logAction("submit")
    }
}

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit}/>
);

const panelJson = formWithSubmit({
    viewType: 'panel',
    name: "personalInfo",
    items : [
        {
            viewType : "text-input",
            name : "firstName",
            label : {
                value  : "First Name"
            }
        },
        {
            viewType : "text-input",
            name : "lastName",
            label : {
                value  : "Last Name"
            }
        }
    ]
})

export const def = Template.bind({});
def.storyName = "Default"
def.args={formJson: panelJson}
