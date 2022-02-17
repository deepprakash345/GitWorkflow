import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import dynamicValueForm from '../../../../../docs/examples/rules/dynamicValue.form.json';
import dynamicOptionsForm from '../../../../../docs/examples/rules/dynamicOptions.form.json';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import rules from './rules.mdx';
import mappings from '../../../src/utils/mappings';

/**
 * Adaptive Form allows changing the properties of a field dynamically using JSON Formula expressions.
 * To do that in your form, one can use the rules property in the Field.
 */
export default {
    title: 'Form JSON/Rules',
    component: AdaptiveForm,
    parameters: {
        docs: {
            page: rules
        }
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const value = Template.bind({});
value.args = {formJson: dynamicValueForm};

export const options = Template.bind({});
options.args = {formJson: dynamicOptionsForm};