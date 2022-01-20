import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-next-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import formJson from '../json';

export default {
  title: 'AdaptiveForm/Layout/Tabs',
  component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

export const Horizontal: ComponentStory<typeof AdaptiveForm> = (args) => (
  <Spectrum3Provider theme={defaultTheme}>
    <AdaptiveForm mappings={mappings} formJson={args.formJson} />
  </Spectrum3Provider>
);


Horizontal.args = {
  formJson: formJson.horizontalTabsJson
};