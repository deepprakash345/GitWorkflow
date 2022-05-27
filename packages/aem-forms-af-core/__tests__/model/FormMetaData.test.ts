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

import {MetaDataJson} from '../../src/types';
import FormMetaData from '../../src/FormMetaData';

test('FormMetaData should return correct values', () => {
    const metadata:MetaDataJson = {
        'version' : '0.1',
        'grammar' : 'af-formcalc-1.0',
        'locale': 'en-us'
    };
    const f = new FormMetaData(metadata);
    expect(f.version).toEqual('0.1');
    expect(f.grammar).toEqual('af-formcalc-1.0');
    expect(f.locale).toEqual('en-us');
});