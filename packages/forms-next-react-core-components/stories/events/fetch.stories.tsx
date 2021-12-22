import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-next-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../src/utils/mappings';
import formJson from './json';

export default {
  title: 'AdaptiveForm/Form Events',
  component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

export const fetchDataFromApi: ComponentStory<typeof AdaptiveForm> = (args) => (
  <Spectrum3Provider theme={defaultTheme}>
    <AdaptiveForm mappings={mappings} formJson={args.formJson} />
  </Spectrum3Provider>
);

fetchDataFromApi.args = {
  formJson: formJson.initializeJson
};
