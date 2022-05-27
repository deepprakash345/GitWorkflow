/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

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