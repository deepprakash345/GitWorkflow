import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@aemforms/crispr-react-bindings';
import {ComponentStory} from '@storybook/react';
import {mappings} from '../../src';
import {decorator} from "../template";
import documentation from "./documentation.mdx"
import layouts from "./json";

export default {
    title: 'Adaptive Form/Layouts/Tabs',
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

export const horizontal = Template.bind({});
horizontal.args={formJson: layouts.horizontalTabsJson}

export const vertical = Template.bind({});
vertical.args={formJson: layouts.verticalTabsJson}
