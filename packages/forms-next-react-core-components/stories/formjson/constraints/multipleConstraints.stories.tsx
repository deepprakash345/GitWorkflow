import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import stringCons from '../../../../../docs/examples/constraints/stringConstraints.form.json';
import numCons from '../../../../../docs/examples/constraints/numberConstraints.form.json';
import dateCons from '../../../../../docs/examples/constraints/dateConstraints.form.json';


export default {
    title: 'Form JSON/Constraints/Multiple Constraints',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const stringConstraints = Template.bind({});
stringConstraints.args = {formJson: stringCons};

export const dateConstraints = Template.bind({});
dateConstraints.args = {formJson: dateCons};

export const numberConstraints = Template.bind({});
numberConstraints.args = {formJson: numCons};