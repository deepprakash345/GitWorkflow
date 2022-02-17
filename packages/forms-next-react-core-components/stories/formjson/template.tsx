import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../src/utils/mappings';
import { action } from '@storybook/addon-actions';
import {Action} from '@aemforms/crispr-core/lib';

//@ts-ignore
export const logData = (e: Action) => action('onFieldChanged')(e.target.exportData());

export const BaseComponent = {
    component: AdaptiveForm,
    args: {
        onFieldChanged: logData
    }
};

export const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onFieldChanged={args.onFieldChanged}/>
    </Spectrum3Provider>
);