import { renderItem } from './ItemRenderer';
import { Flex } from '@adobe/react-spectrum';
const Form = function (props: { form: any, mappings: any }) {
    const { form, mappings } = props;
    const a = Object.values(form[':items']);
    return (<form>
        <Flex direction="column" width="size-4000" gap="size-100">
            {a.map(renderItem(mappings))}
        </Flex>
    </form>);
};

export default Form;