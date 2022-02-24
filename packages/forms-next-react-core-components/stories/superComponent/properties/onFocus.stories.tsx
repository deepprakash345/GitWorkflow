import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import jsonform from '../../example/json';
import React, {useState} from 'react';
import produce from 'immer';
export default {
    title: 'Crispr/SuperComponent/properties',
    component: AdaptiveForm,
    decorators : [(Story) => {
        return (<Spectrum3Provider theme={defaultTheme}>
            <Story />
        </Spectrum3Provider>);
    }]
} as ComponentMeta<typeof AdaptiveForm>;

const App = ({componentMapping = mappings, formJson})=> {
    const [focusOn, setFocusOn] = useState('');
    return <div>
        <AdaptiveForm mappings={componentMapping} formJson={formJson} locale='en'
                      focusOn={focusOn}
                      onValidationComplete={(action: any)=> {
                          const validationCompleteHandlerPayload = action.payload;
                          if (validationCompleteHandlerPayload?.length > 0) {
                              setFocusOn(validationCompleteHandlerPayload[0].fieldName);
                          }
                      }}/>
    </div>;
};

export const onFocus: ComponentStory<typeof AdaptiveForm> = (args) => (
    <App formJson={args.formJson}/>
);

// maintain immutability via immer
const newContactJson: any = produce(jsonform.contactJson, draft => {
    // mutating draft implementation without changing the original object
    draft.items[6].label.value = 'Click me to set focus on invalid field on form submit';
});

onFocus.args = {
    formJson: newContactJson
};