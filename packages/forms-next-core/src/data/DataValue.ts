/**
 * Defines data value
 */
import {FieldModel} from '../types';

/**
 * @private
 */
export default class DataValue {

    private $_fields: Array<FieldModel> = []

    constructor(private $_name: string|number, private $_value: any, private $_type: string = typeof $_value) {
    }

    valueOf() {
        return this.$_value;
    }

    get $name() {
        return this.$_name;
    }

    get $value() {
        return this.$_value;
    }

    set $value(v:any) {
        this.$_value = v;
    }

    get $type() {
        return this.$_type;
    }

    $bindToField(field: FieldModel) {
        if (this.$_fields.indexOf(field) === -1) {
            this.$_fields.push(field);
        }
    }

    $convertToDataValue():DataValue {
        return this;
    }

    get $isDataGroup() {
        return false;
    }
}