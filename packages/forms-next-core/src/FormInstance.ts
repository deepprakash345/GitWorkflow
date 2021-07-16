import { search } from 'jmespath';
import { FieldModel, FieldSetModel, FormModel, NumberFieldModel, StringFieldModel } from './Types';
import { isString } from 'lodash';
import Field from './Field';
import Form from './Form';
import Fieldset from './Fieldset';
type Data = {
    [key: string]: any
}

const createField = function (field: FieldModel) {
  const fieldType = field.type;
  switch (fieldType) {
    case 'string':
      return new Field(field as StringFieldModel);
    case 'number':
      return new Field(field as NumberFieldModel);
  }
};

const resolve = (items: Array<FieldModel|FieldSetModel>, data: Data, parentId: string = ''): Array<Fieldset | Field> => {
  const formItems = items.map(item => {
    let query = item.dataRef || item.name;
    if (!isString(query)) {
      query = '';
    }
    let value;
    const newItem = Object.assign({}, item);
    let retVal: Field | Fieldset;
    if (item.name) {
      newItem.id = (parentId.length > 0 ? parentId + '.' : '') + item.name;
    }
    if (query) {
      value = search(data, query);
    }
    if ((item as FieldSetModel).items) {
      const x = newItem as FieldSetModel;
      let subdata = value;
      if (value === null || value === undefined) {
        subdata = data;
        const d = Fieldset.getInitialValue(x.type);
        if (d !== null && query) {
          data[query] = d;
          subdata = d;
        }
      }
      const newItems = resolve(x.items, subdata, newItem.id);
      x.items = newItems.map(x => x.json());
      retVal = new Fieldset(x);
    } else {
      const x = newItem as FieldModel;
      if (value !== null) {
        x.value = value;
      }
      retVal = createField(x);
      data[query] = x.value;
    }
    return retVal;
  });
  return formItems;
};

export const createFormInstance = (formModel: FormModel, data: Data = {}) => {
  const newData = Object.assign({}, data);
  const items = resolve(formModel.items, newData).map(x => x.json());
  const form = new Form({ items });
  return ({
    form,
    data: newData
  });
};

declare var fetch: any;

const mappings: {[key: string]: string} = {
  'sling:resourceType': 'viewType',
  'jcr:title': 'title',
  'mandatory': 'constraints.required',
  'placeholderText' : 'placeholder',
  'longDescription' : 'description'
};

const gncMapping: {[key: string]: string} = {
  'guideTextBox' : 'string'
}
const keep  = ['name'];
const isObject = function (item: any) {
  return (item && typeof item === 'object' && !Array.isArray(item));
};

function mergeDeep(target: any, ...sources: any[]): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

const mapProperties = function (obj: any): any {
  let newObj: any = {};
  if (obj.items) {
    newObj.items = Object.entries(obj.items).map((e) => {
      return mapProperties(e[1]);
    });
  }
  const props = Object.entries(obj).map(([key, value]) => {
    if (key === 'guideNodeClass') return ['constraints', {'type' : gncMapping[value as string]}];
    else if (mappings[key]) {
      let newKey = mappings[key];
      if (newKey.indexOf('.') > -1) {
        let acc = {};
        let curr:any = acc;
        let [prop, ...rest] = newKey.split('.');
        for (let i =0;i < rest.length; i++) {
          if (i == rest.length - 1) {
            curr[rest[i]] = value;
          } else {
            curr[rest[i]] = {};
            curr = curr[rest[i]];
          }
        }
        return [prop, acc];
      }
      return [mappings[key], value];
    }
    else if (keep.indexOf(key) > -1) return [key, value];
    else return ['extra', undefined];
  }).filter(e => e[1] != undefined).map(e => Object.fromEntries([e]));
  return mergeDeep(newObj, ...props);
};


export const fetchForm = (url: string) : Promise<string> =>  {
  return fetch(`${url}/jcr:content/guideContainer.guidejson`)
  .then((response: any) => response.text()).then((data: string) => {
    const oldForm = JSON.parse(data);
    const newForm = {items: [mapProperties(oldForm.rootPanel)]};
    return JSON.stringify(newForm, null, 2);
  });
};
