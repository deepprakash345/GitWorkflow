import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import { action } from '@storybook/addon-actions';
import {Action} from "@aemforms/crispr-core";

const formJson:any = (description) => {
    return {
        'adaptiveform': '0.0.17-pre',
        items: [
            {
                'name' : 'field',
                'description': description,
                'fieldType' : 'text-input'
            }
        ],
        'metadata': {
            'grammar': 'json-formula-1.0.0',
            'version': '1.0.0'
        }
    }
};

const logData = (e: Action) => action('onFieldChanged')(e.target.exportData());

export default {
    title: 'Reference/JSON/Properties/description',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onFieldChanged={logData}/>
    </Spectrum3Provider>
);

export const BasicDescription = Template.bind({});
BasicDescription.args = {formJson:  formJson("Basic description of the Field. Description is applicable for all the fields")};

export const richTextDescription = Template.bind({});
richTextDescription.args = {formJson: formJson("For <strong>rich text</strong> we use sanitize-html package with <a href='https://www.npmjs.com/package/sanitize-html#default-options'> default options</a>")};
