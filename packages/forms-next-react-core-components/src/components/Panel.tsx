import { Flex } from '@adobe/react-spectrum';
import {FieldsetJson} from '@adobe/forms-next-core/lib';
import {useRenderChildren} from '../react-mapper/hooks';

const Panel = function (props: FieldsetJson) {
    return (
        <Flex direction="column" width="size-2000" gap="size-100">
            {useRenderChildren(props)}
        </Flex>);
};

export default Panel;