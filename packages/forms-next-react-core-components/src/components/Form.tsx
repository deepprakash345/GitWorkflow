import { renderItem } from './ItemRenderer';
import { Flex } from '@adobe/react-spectrum';
import {createFormInstance} from '@adobe/forms-next-core/lib';
import {useState} from 'react';
const Form = function (props: { formJson: any, mappings: any }) {
    const { formJson, mappings } = props;
    debugger;
    const fullForm = createFormInstance(formJson);
    fullForm.subscribe('$form', (id, form) => {
        setForm(form);
    });
    const [form, setForm] = useState(fullForm.json());
    return (<form>
        <Flex direction="column" width="size-4000" gap="size-100">
            {Object.values(form[':items']).map(renderItem(mappings, fullForm))}
        </Flex>
    </form>);
};

export default Form;