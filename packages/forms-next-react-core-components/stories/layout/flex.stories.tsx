import {ComponentMeta} from '@storybook/react';
import {AdaptiveForm} from '@aemforms/crispr-react-bindings';
import {ComponentStory} from '@storybook/react';
import {mappings} from '../../src';
import {decorator} from "../template";
import documentation from "./documentation.mdx"
import layouts from './json';

export default {
    title: 'Crispr/Form Layouts/Flex',
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

export const horizontalFlex = Template.bind({});
horizontalFlex.args={formJson: layouts.horizontalFlex}

export const NestingFlex = Template.bind({});
NestingFlex.args={formJson: layouts.nestingFlex}

export const verticalFlex = Template.bind({});
verticalFlex.args={formJson:layouts.verticalFlex}
