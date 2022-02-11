import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-next-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../src/utils/mappings';
import fieldWithLabel from '../../../../docs/examples/starter/fieldWithLabel.form.json';
import fieldWithLabelAndDescription from '../../../../docs/examples/starter/fieldWithLabelAndDescription.form.json';
import withSubmitButton from '../../../../docs/examples/starter/withSubmitButton.form.json';
import withDefaultValue from '../../../../docs/examples/starter/withDefaultValue.form.json';
import withPlaceholder from '../../../../docs/examples/starter/withPlaceholder.form.json';
import withMultipleFields from '../../../../docs/examples/starter/multipleFields.form.json';

export default {
    title: 'Form JSON',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
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

