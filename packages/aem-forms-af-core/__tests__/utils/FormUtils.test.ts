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

import {getFileSizeInBytes} from '../../src/utils/FormUtils';


test('get file size in bytes from human readable file size', () => {
    expect(getFileSizeInBytes('2KB')).toEqual(2048);
    expect(getFileSizeInBytes('2')).toEqual(2048);
    expect(getFileSizeInBytes('2MB')).toEqual(2097152);
    expect(getFileSizeInBytes('2.')).toEqual(0);
});