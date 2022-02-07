import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-next-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import minLengthForm from '../../../../../docs/examples/constraints/minLength.form.json';
import minLengthForm2 from '../../../../../docs/examples/constraints/minLengthErrorMessage.form.json';
import maxLengthForm from '../../../../../docs/examples/constraints/maxLength.form.json';
import maxLengthForm2 from '../../../../../docs/examples/constraints/maxLengthErrorMessage.form.json';
import exactLengthForm from '../../../../../docs/examples/constraints/exactLength.form.json';


export default {
    title: 'Form JSON/Constraints',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const minLength = Template.bind({});
minLength.args = {formJson: minLengthForm};

export const minLengthWithError = Template.bind({});
minLengthWithError.args = {formJson: minLengthForm2};

export const maxLength = Template.bind({});
maxLength.args = {formJson: maxLengthForm};

export const maxLengthWithError = Template.bind({});
maxLengthWithError.args = {formJson: maxLengthForm2};

export const exactLength = Template.bind({});
exactLength.args = {formJson: exactLengthForm};