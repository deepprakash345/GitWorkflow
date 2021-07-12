import { search } from 'jmespath'
import { FieldModel, FieldSetModel, FormModel, NumberFieldModel, StringFieldModel } from './Types'
import {isString} from 'lodash';
import Field from './Field';
import Form from './Form'
import Fieldset from './Fieldset';
type Data = {
    [key: string]: any
}

const createField = function (field: FieldModel) {
    const fieldType = field.type
    switch(fieldType) {
        case "string":
            return new Field(field as StringFieldModel);
        case "number":
            return new Field(field as NumberFieldModel);
    }
}

const resolve = (items: Array<FieldModel|FieldSetModel>, data: Data, parentId: string = ""): Array<Fieldset | Field>  => {
    let formItems = items.map(item => {
        let query = item.dataRef || item.name
        if (!isString(query)) {
            query = "";
        }
        let value = undefined;
        const newItem = Object.assign({}, item);
        let retVal: Field | Fieldset;
        if (item.name) {
            newItem.id = (parentId.length > 0 ? parentId + "." : "") + item.name
        }
        if (query) {
            value = search(data, query)
        }
        if ((item as FieldSetModel).items) {
            let x = newItem as FieldSetModel;
            let subdata = value
            if (value === null || value === undefined) {
                subdata = data
                const d = Fieldset.getInitialValue(x.type)
                if (d !== null && query) {
                    data[query] = d
                    subdata = d
                }
            }
            let newItems = resolve(x.items, subdata, newItem.id);
            x.items = newItems.map(x => x.json());
            retVal = new Fieldset(x)
        } else {
            let x = newItem as FieldModel;
            if (value !== null) {
                x.value = value
            }
            retVal = createField(x)
            data[query] = x.value;
        }
        return retVal
    });
    return formItems;
}

const createFormInstance = function (formModel: FormModel, data: Data = {}) {
    const newData = Object.assign({}, data)
    const items = resolve(formModel.items, newData).map(x => x.json());
    const form = new Form({items})
    return ({
        form,
        data: newData
    })
}

export default createFormInstance