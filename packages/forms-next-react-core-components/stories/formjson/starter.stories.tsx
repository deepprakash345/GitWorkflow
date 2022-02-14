import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-next-react-bindings';
import fieldWithLabel from '../../../../docs/examples/starter/fieldWithLabel.form.json';
import withSubmitButton from '../../../../docs/examples/starter/withSubmitButton.form.json';
import withMultipleFields from '../../../../docs/examples/starter/multipleFields.form.json';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../src/utils/mappings';
import {Action} from '@aemforms/forms-next-core/lib';
import { action } from '@storybook/addon-actions';
import { ComponentStory } from '@storybook/react';

const logData = (e: Action) => action('onFieldChanged')(e.target.exportData());

export default {
    title: 'Form JSON',
    component: AdaptiveForm,
    argTypes: {
        onFieldChanged: {action: 'onFieldChanged'},
        onInitialize: {action: 'onInitialize'}
    }
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson}
                      onFieldChanged={args.onFieldChanged}
                      onInitialize={args.onInitialize}/>
    </Spectrum3Provider>
);

export const oneFieldForm = Template.bind({});
oneFieldForm.args = {formJson: fieldWithLabel};

// export const WithCaptionAndDescription = Template.bind({});
// WithCaptionAndDescription.args = {formJson: fieldWithLabelAndDescription};
//
// export const WithDefaultValue = Template.bind({});
// WithDefaultValue.args = {formJson: withDefaultValue};
//
// export const WithPlaceholder = Template.bind({});
// WithPlaceholder.args = {formJson: withPlaceholder};

export const WithMultipleFields = Template.bind({});
WithMultipleFields.args = {formJson: withMultipleFields};

export const FormWithSubmitButton = Template.bind({});
FormWithSubmitButton.args = {formJson: withSubmitButton};

