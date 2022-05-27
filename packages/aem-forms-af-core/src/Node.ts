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

import {getProperty} from './utils/JsonUtils';

/**
 * Defines generic form object class which any form runtime model (like textbox, checkbox etc)
 * should extend from.
 * @typeparam T type of the node (for example, {@link MetaDataJson | form meta data}
 */
class Node<T> {

    protected _jsonModel: T

    constructor (inputModel: T) {
        this._jsonModel = {
            ...inputModel
        };
    }

    protected getP<S>(key: string, def: S): S {
        return getProperty(this._jsonModel, key, def);
    }

    get isContainer() {
        return false;
    }

}

export default Node;
