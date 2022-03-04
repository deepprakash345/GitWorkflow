import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import { mappings } from '../../src';
import { decorator, logAction } from "../template";
import { examples } from "./json";
import documentation from './documentation.mdx'

export default {
  title: 'Crispr/Form Components/Radio Group',
  component: AdaptiveForm,
  decorators: [decorator],
  parameters: {
    docs: {
      page: documentation
    }
  }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
  <AdaptiveForm mappings={mappings} formJson={args.formJson} onSubmit={args.onSubmit} />
);

export const radioGroup = Template.bind({})
radioGroup.args = { formJson: examples['radio-group'] }
radioGroup.storyName = "Default"
radioGroup.parameters = {
  highlights: ["items.0"]
}

export const Horizontal = Template.bind({})
Horizontal.args = { formJson: examples['radio-group-horizontal'] }
Horizontal.parameters = {
  highlights: ["items.0"]
}