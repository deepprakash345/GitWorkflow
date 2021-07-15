import { FieldModel } from '@adobe/forms-next-core';
import { Button } from '@adobe/react-spectrum';

const ButtonComp = function (props: FieldModel) {
    const { title } = props;
    return (<Button variant="primary">{title}</Button>);
};

export default ButtonComp;