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

import Field from './Field';
import {Constraints} from './utils/ValidationUtils';

/**
 * @param offValue
 * @private
 */
const requiredConstraint = (offValue: any) => (constraint: boolean, value: any) => {
    const valid =  Constraints.required(constraint, value) && (!constraint || value != offValue);
    return {valid, value};
};

/**
 * Implementation of check box runtime model which extends from {@link Field | field} model
 */
class Checkbox extends Field {

    private offValue() {
        const opts = this.enum;
        return opts.length > 1 ? opts[1] : null;
    }

    /**
     * @private
     */
    _getConstraintObject() {
        const baseConstraints =  {...super._getConstraintObject()};
        baseConstraints.required = requiredConstraint(this.offValue());
        return baseConstraints;
    }

    protected _getDefaults() {
        return {
            ...super._getDefaults(),
            enforceEnum: true
        };
    }

    /**
     * Returns the `enum` constraints from the json
     */
    get enum() {
        return this._jsonModel.enum || [];
    }
}

export default Checkbox;
