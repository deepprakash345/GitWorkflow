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

import {IFileObject} from './types';

/**
 * Defines a file object which implements the {@link IFileObject | file object interface}
 */
export class FileObject implements IFileObject {
    data: any;
    mediaType = 'application/octet-stream';
    name = 'unknown';
    size = 0;

    public constructor(init?:Partial<FileObject>) {
        Object.assign(this, init);
    }
    public toJSON() {
        return {
            'name'                  : this.name,
            'size'                  : this.size,
            'mediaType'             : this.mediaType,
            'data'                  : this.data.toString()
        };
    }
}