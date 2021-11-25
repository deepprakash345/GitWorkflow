import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import { AdaptiveForm } from '@aemforms/forms-next-react-bindings';
import mappings from '../src/utils/mappings';


const Template: ComponentStory<typeof AdaptiveForm> = (args) => <Spectrum3Provider theme={defaultTheme}><AdaptiveForm mappings={mappings} {...args} /></Spectrum3Provider>;

export default Template;
