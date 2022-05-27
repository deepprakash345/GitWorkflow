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

import {FormMetaDataModel, MetaDataJson} from './types';
import Node from './Node';

/**
 * Defines form metadata which implements {@link FormMetaDataModel | Form MetaData Model}
 */
class FormMetaData extends Node<MetaDataJson> implements FormMetaDataModel {

    get version(): string {
        return this.getP('version', '');
    }

    get locale(): string {
        return this.getP('locale', '');
    }

    get grammar(): string {
        return this.getP('grammar', '');
    }
}

export default FormMetaData;
