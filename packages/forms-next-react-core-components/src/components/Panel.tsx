import { renderItem } from './ItemRenderer';
import { Flex } from '@adobe/react-spectrum';
import Form from '@adobe/forms-next-core/lib/Form';

type Mapping<T> = T & {
    mappings: any
    form: Form
}

const Panel = function (props: Mapping<any>) {
    const {mappings, form } = props;
    const a = Object.values(props[':items']);
    return (
        <Flex direction="column" width="size-2000" gap="size-100">
            {a.map(renderItem(mappings, form))}
        </Flex>);
};

export default Panel;