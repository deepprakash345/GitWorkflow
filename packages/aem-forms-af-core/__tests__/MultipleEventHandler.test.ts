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

//@ts-ignore
import * as formJson from './collateral/MultipleEventHandler.form.json';
import {createFormInstance} from '../src';
import {Click} from '../src/controller/Controller';

test('multiple event handlers should get executed', () => {
    const form = createFormInstance(formJson);
    form.items[2].dispatch(new Click());
    expect(form.items[3].value).toEqual('a');
    expect(form.items[4].value).toEqual('b');
});