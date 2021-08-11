import { renderItem } from './ItemRenderer';
import { Flex } from '@adobe/react-spectrum';

type Mapping<T> = T & {
    mappings: any
}

const Panel = function (props: Mapping<any>) {
    const {mappings } = props;
    const a = Object.values(props[':items']);
    return (
        <Flex direction="column" width="size-2000" gap="size-100">
            {a.map(renderItem(mappings))}
        </Flex>);
};

export default Panel;