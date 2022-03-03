/**
 * Defines data group
 */
import DataValue from './DataValue';

/**
 * @private
 */
export default class DataGroup extends DataValue {

    $_items: { [key: string|number]: DataValue | DataGroup } = {}

    constructor(_name:string|number, _value: { [key: string|number]: any }, _type: string = typeof _value) {
        super(_name, _value, _type);
        Object.entries(_value).forEach(([key, value]) => {
            let x:DataValue;
            const t = value instanceof Array ? 'array' : typeof value;
            if (typeof value === 'object' && value != null) {
                x = new DataGroup(key, value, t);
            } else {
                x = new DataValue(key, value, t);
            }
            this.$_items[key] = x;
        });
    }

    get $value(): Array<any> | { [key:string] : any } {
        if (this.$type === 'array') {
            return Object.values(this.$_items).filter(x => typeof x !== 'undefined').map(x => x.$value);
        } else {
            return Object.fromEntries(Object.values(this.$_items).filter(x => typeof x !== 'undefined').map(x => {
                return [x.$name, x.$value];
            }));
        }
    }

    get $length() {
        return Object.entries(this.$_items).length;
    }

    $convertToDataValue():DataValue {
        return new DataValue(this.$name, this.$value, this.$type);
    }

    $addDataNode(name: string|number, value: DataGroup|DataValue) {
        this.$_items[name] = value;
    }

    $removeDataNode(name: string|number) {
        //@ts-ignore not calling delete
        this.$_items[name] = undefined;
    }

    $getDataNode(name: string|number) {
        if (this.$_items.hasOwnProperty(name)) {
            return this.$_items[name];
        }
    }

    $containsDataNode(name: string| number) {
        return this.$_items.hasOwnProperty(name) && typeof(this.$_items[name]) !== 'undefined';
    }

    get $isDataGroup() {
        return true;
    }
}