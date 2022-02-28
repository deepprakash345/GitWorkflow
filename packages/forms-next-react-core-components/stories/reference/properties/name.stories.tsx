import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {Action} from "@aemforms/crispr-core/lib";
import { action } from '@storybook/addon-actions';

const formJson:any = (name, label, description) => {
    return {
        'adaptiveform': '0.0.17-pre',
        items: [
            {
                'name' : name,
                'label' : {
                    'value' : label
                },
                'description': description,
                'viewType' : 'text-input'
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
    title: 'Reference/JSON/Properties/name',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} onFieldChanged={logData}/>
    </Spectrum3Provider>
);

export const alphabets = Template.bind({});
alphabets.args = {formJson : formJson("someName", "Field with some name", "The name property determines the key in the json data")};

export const alphaNumeric = Template.bind({});
alphaNumeric.args = {formJson: formJson("specialName123_$", "Field with special characters in name", "The name property can contain numeric and special characters as well")};

export const numeric = Template.bind({});
numeric.args = {formJson: formJson("1234", "Field with numeric name", "The name property can be all numbers")};

export const special = Template.bind({});
special.args = {formJson : formJson("_$!&", "No alphabets and no numbers", "The name property must not begin with $ and :")};

export const noName = Template.bind({});
noName.args = {formJson : formJson(undefined, "Field with no name", "Field without name will not have its data captured")};
