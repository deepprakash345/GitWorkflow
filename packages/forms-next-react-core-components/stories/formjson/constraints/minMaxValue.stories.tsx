import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import minValueForm from '../../../../../docs/examples/constraints/minimum.form.json';
import minValueForm2 from '../../../../../docs/examples/constraints/minimumErrorMessage.form.json';
import maxValueForm from '../../../../../docs/examples/constraints/maxValue.form.json';
import maxValueForm2 from '../../../../../docs/examples/constraints/maxValueErrorMessage.form.json';


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

export const minimumWithErrorMessage = Template.bind({});
minimumWithErrorMessage.args = {formJson: minValueForm2};

export const maximum = Template.bind({});
maximum.args = {formJson: maxValueForm};

export const maximumWithErrorMessage = Template.bind({});
maximumWithErrorMessage.args = {formJson: maxValueForm2};
