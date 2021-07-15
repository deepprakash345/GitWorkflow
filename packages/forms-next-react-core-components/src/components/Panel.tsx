import { renderItem } from './ItemRenderer';
import { Flex } from '@adobe/react-spectrum';

const Panel = function (props: any) {
    const { field } = props;
    return (<Flex direction="column" width="size-2000" gap="size-100">
        {
            field.items.map(renderItem)
        }
    </Flex>);
};

export default Panel;