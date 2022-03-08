import { ComponentMeta } from '@storybook/react';
import { AdaptiveForm } from '@aemforms/forms-super-component';
import { ComponentStory } from '@storybook/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import mappings from '../../../src/utils/mappings';
import {base} from "../../template";
import {max} from "lodash";

export default {
    title: 'Reference/JSON/Constraints/file',
    component: AdaptiveForm
} as ComponentMeta<typeof AdaptiveForm>;

const Template: ComponentStory<typeof AdaptiveForm> = (args) => (
    <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} formJson={args.formJson} />
    </Spectrum3Provider>
);

const range = function* (start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}
//@ts-ignore
const x = [...range(1, 5)]

const form = {
    ...base,
    items: [
        {
            "name": "profile_image",
            "type": "file",
            "maxFileSize": "2MB",
            "fieldType": "file-input",
            "label": {
                "value": "Profile Image"
            },
            description: "Select a file less than 2 MB in size"
        },
    ]
}

const form2 = {
    ...base,
    items: [
        {
            "name": "profile_image",
            "type": "file",
            "accept": "image/*",
            "fieldType": "file-input",
            "label": {
                "value": "Profile Image"
            },
            description: "Only images can be selected"
        },
    ]
}

export const maxFileSize = Template.bind({});
maxFileSize.storyName = "maxFileSize"
maxFileSize.args = {formJson: form};

export const accept = Template.bind({});
accept.storyName = "accept"
accept.args = {formJson: form2};