import { FormModel } from '@adobe/forms-next-core';
import { renderItem } from './ItemRenderer';

const Form = function (props: FormModel, mappings: any) {
    const { items } = props;
    return (<form>{
        items.map(renderItem(mappings))
    }
    </form>);
};

export default Form;