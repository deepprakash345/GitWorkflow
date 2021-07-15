import { FormModel } from '@adobe/forms-next-core';
import { renderItem } from './ItemRenderer';
import { Flex } from "@adobe/react-spectrum"
const Form = function (props: { form: FormModel, mappings: any }) {
    const { form, mappings } = props;
    return (<form>
        <Flex direction="column" width="size-4000" gap="size-100">
            {form.items.map(renderItem(mappings))}
        </Flex>
    </form>);
};

export default Form;