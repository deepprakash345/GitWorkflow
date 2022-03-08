import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/crispr-react-bindings';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import stringCons from '../../../../../docs/examples/constraints/stringConstraintsMessages.form.json';
import numCons from '../../../../../docs/examples/constraints/numberConstraintsMessage.form.json';
import dateCons from '../../../../../docs/examples/constraints/dateConstraintsMessage.form.json';

export default {
    title: 'Reference/JSON/Constraints/Messages/Multiple Constraints',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

export const string = Template.bind({});
string.args = {formJson: stringCons};


export const date = Template.bind({});
date.args = {formJson: dateCons};

export const number = Template.bind({});
number.args = {formJson: numCons};

