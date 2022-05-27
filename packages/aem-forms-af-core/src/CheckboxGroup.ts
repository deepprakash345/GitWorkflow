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
import {ContainerModel, FieldJson, FormModel} from './types';

/**
 * Implementation of CheckBoxGroup runtime model which extends from {@link Field | field}
 */
class CheckboxGroup extends Field {

    /**
     * @param params
     * @param _options
     * @private
     */
    public constructor(params: FieldJson,
                       _options: { form: FormModel, parent: ContainerModel }) {
        super(params, _options);
    }

    /**
     * converts the fallback type, if required, to an array. Since checkbox-group has an array type
     * @protected
     */
    protected _getFallbackType(): string | undefined {
        const fallbackType =  super._getFallbackType();
        if (typeof fallbackType === 'string') {
            return `${fallbackType}[]`;
        }
    }

    protected _getDefaults() {
        return {
            ...super._getDefaults(),
            enforceEnum: true,
            enum : []
        };
    }
}

export default CheckboxGroup;