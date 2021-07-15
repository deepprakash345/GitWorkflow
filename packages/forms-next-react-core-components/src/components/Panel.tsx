import { renderItem } from './ItemRenderer';
import { Flex } from '@adobe/react-spectrum';

const Panel = function (props: any) {
    const { items, title, mappings } = props;
    return (<Flex direction="column" width="size-2000" gap="size-100">
        <h1>{title}</h1>
        {
            items.map(renderItem(mappings))
        }
    </Flex>);
};

export default Panel;