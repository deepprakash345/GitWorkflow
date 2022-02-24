import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../src/utils/mappings';
import { action } from '@storybook/addon-actions';
import {Action} from '@aemforms/crispr-core';
import Example from "./Example";

//@ts-ignore
export const logData = (e: Action) => action('onFieldChanged')(e.target.exportData());

export const logAction = (name:string) => (e: Action) => action(name)(e.target.exportData());

export const base = {
    'adaptiveform': '0.0.17-pre',
    'metadata': {
        'grammar': 'json-formula-1.0.0',
        'version': '1.0.0'
    }
}

export const decorator = (Story, context) => {
    const {args, viewMode} = context
    console.log(context)
    return (<Spectrum3Provider theme={defaultTheme}>
        {args.wrap === false || viewMode === "story" ? <Story /> :
            (<Example args={args} Component={Story} />)}
    </Spectrum3Provider>)
}

export const argTypes = {
    formJson: {
        control: {
            type: 'object'
        }
    }
}