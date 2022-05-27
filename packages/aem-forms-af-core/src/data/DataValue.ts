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