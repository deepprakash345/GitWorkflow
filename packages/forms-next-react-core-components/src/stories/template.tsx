import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import AdaptiveForm from '../components/AdaptiveForm';
import mappings from '../mappings';


const Template: ComponentStory<typeof AdaptiveForm> = (args) => <Spectrum3Provider theme={defaultTheme}><AdaptiveForm mappings={mappings} {...args} /></Spectrum3Provider>;

export default Template;
