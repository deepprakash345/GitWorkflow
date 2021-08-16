import { Flex } from '@adobe/react-spectrum';
import {useRenderChildren} from '../react-mapper/hooks';
const Form = function (props: { formJson: any }) {
    const { formJson} = props;
    return (
            <form>
                <Flex direction="column" width="size-4000" gap="size-100">
                    {useRenderChildren(formJson)}
                </Flex>
            </form>
    );
};

export default Form;