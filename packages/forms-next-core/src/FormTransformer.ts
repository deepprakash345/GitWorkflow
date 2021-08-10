declare var fetch: any;

const splitOptions = (key:string, options: Array<String>) => {
    return [`constraints.${key}`, options.map(opt => {
        let [value, text] = opt.split('=');
        return {
            value,
            text
        };
    })];
};

const mappings: {[key: string]: string | Function} = {
    'sling:resourceType': 'viewType',
    'jcr:title': 'title',
    'mandatory': 'constraints.required',
    'placeholderText' : 'placeholder',
    'longDescription' : 'description',
    'options' : splitOptions
};

const gncMapping: {[key: string]: string} = {
    'guideTextBox' : 'string'
};
const keep  = ['name', 'hideTitle', 'visible'];
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

        const mergeFunction = (newKey: String, value: any) => {
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
        };

        if (key === 'guideNodeClass') return ['constraints', {'type' : gncMapping[value as string]}];
        else if (mappings[key] instanceof Function) {
            let fn = mappings[key] as Function;
            let [newKey, newValue] = fn(key, value);
            if (newKey.indexOf('.') > -1) {
                return mergeFunction(newKey, newValue);
            }
            return [newKey, newValue];
        }
        else if (typeof mappings[key] === 'string') {
            let newKey = mappings[key] as String;
            if (newKey.indexOf('.') > -1) {
                return mergeFunction(newKey, value);
            }
            return [mappings[key], value];
        }
        else if (keep.indexOf(key) > -1) return [key, value];
        else return ['extra', undefined];
    }).filter(e => e[1] != undefined).map(e => Object.fromEntries([e]));
    return mergeDeep(newObj, ...props);
};

export const fetchAFForm = (url: string) : Promise<string> =>  {
    return fetch(`${url}/jcr:content/guideContainer.guidejson`)
        .then((response: any) => response.text()).then((data: string) => {
            const oldForm = JSON.parse(data);
            const newForm = {items: [mapProperties(oldForm.rootPanel)]};
            console.log(newForm);
            return JSON.stringify(newForm, null, 2);
        });
};