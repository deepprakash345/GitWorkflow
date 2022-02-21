import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import minLengthForm2 from '../../../../../docs/examples/constraints/minLengthErrorMessage.form.json';
import maxLengthForm2 from '../../../../../docs/examples/constraints/maxLengthErrorMessage.form.json';
import minValueForm2 from '../../../../../docs/examples/constraints/minimumErrorMessage.form.json';
import maxValueForm2 from '../../../../../docs/examples/constraints/maxValueErrorMessage.form.json';
import patternForm from '../../../../../docs/examples/constraints/patternMessage.form.json';
import formatForm from '../../../../../docs/examples/constraints/formatMessage.form.json';

export default {
    title: 'Form JSON/Constraints/Messages',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const minLength = Template.bind({});
minLength.args = {formJson: minLengthForm2};

export const maxLength = Template.bind({});
maxLength.args = {formJson: maxLengthForm2};

export const minimum = Template.bind({});
minimum.args = {formJson: minValueForm2};

export const maximum = Template.bind({});
maximum.args = {formJson: maxValueForm2};

export const pattern = Template.bind({});
pattern.args = {formJson: patternForm};

export const format = Template.bind({});
format.args = {formJson: formatForm};
