import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import minValueForm from '../../../../../docs/examples/constraints/minimum.form.json';
import maxValueForm from '../../../../../docs/examples/constraints/maxValue.form.json';
import minLengthForm from '../../../../../docs/examples/constraints/minLength.form.json';
import maxLengthForm from '../../../../../docs/examples/constraints/maxLength.form.json';
import exactLengthForm from '../../../../../docs/examples/constraints/exactLength.form.json';
import patternForm from '../../../../../docs/examples/constraints/pattern.form.json';

export default {
    title: 'Form JSON/Constraints',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const minimum = Template.bind({});
minimum.args = {formJson: minValueForm};

export const maximum = Template.bind({});
maximum.args = {formJson: maxValueForm};

export const minLength = Template.bind({});
minLength.args = {formJson: minLengthForm};

export const maxLength = Template.bind({});
maxLength.args = {formJson: maxLengthForm};

export const exactLength = Template.bind({});
exactLength.args = {formJson: exactLengthForm};

export const pattern = Template.bind({});
pattern.args = {formJson: patternForm};
