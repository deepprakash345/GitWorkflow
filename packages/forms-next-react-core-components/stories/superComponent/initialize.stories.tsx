import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../src/utils/mappings';
import jsonform from '../example/json';
import { action } from '@storybook/addon-actions';
import {Action} from '@aemforms/crispr-core/lib';
export default {
    title: 'AdaptiveForm/SuperComponent',
    component: AdaptiveForm,
    decorators : [(Story) => {
        return (<Spectrum3Provider theme={defaultTheme}>
            <Story />
        </Spectrum3Provider>);
    }]
} as ComponentMeta<typeof AdaptiveForm>;

const logAction = (name: string) => (e: Action) => action(name)({
    target : e.target.getState(),
    payload: e.payload,
    type: e.type
});

export const superComponent: ComponentStory<typeof AdaptiveForm> = (args) => (
    <AdaptiveForm mappings={mappings}
                  formJson={args.formJson}
                  onInitialize={logAction('Initialized')}
                  onFieldChanged={logAction('fieldChanged')}
                  onSubmit={logAction('Submit')}
    />
);

superComponent.args = {
    formJson: jsonform.contactJson
};