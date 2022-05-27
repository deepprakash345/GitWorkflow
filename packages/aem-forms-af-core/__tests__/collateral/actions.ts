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

import {Action, BaseModel} from '../../src/types';

declare global {
    namespace jest {
        interface Matchers<R> {
            matchesAction(expected: { action: Action, target: BaseModel }): R;
        }

        interface Expect {
            matchesAction(expected: { action: Action, target: BaseModel }): void;
        }
    }
}

const customMatchers = {
    matchesAction(received: Action, expected: { action: Action, target: BaseModel }) {
        const passes = {
            'target': [received.target.id, expected.target.id, received.target == expected.target],
            'type': [received.type, expected.action.type, received.type === expected.action.type],
            'metadata': [JSON.stringify(received.metadata), JSON.stringify(expected.action.metadata), JSON.stringify(received.metadata) === JSON.stringify(expected.action.metadata)],
            'payload': [JSON.stringify(received.payload), JSON.stringify(expected.action.payload), JSON.stringify(received.payload) == JSON.stringify(expected.action.payload)]
        };
        const entries = Object.entries(passes).filter((key) => !key[1][2]);
        if (entries.length > 0) {
            return {
                message: () => {
                    let msg = `expected ${Object.keys(passes).length} to match but ${entries.length} did not match. `;
                    msg = msg + entries.map((key) => key[0]).join(',') + ' did not match';
                    msg = msg + '\n ' + entries.map((key) => key[0] + ' : ' + key[1][0] + ' !== ' + key[1][1]).join('\n');
                    return msg;
                },
                pass: false
            };
        } else {
            return {
                pass: true,
                message: () => 'actions matched'
            };
        }
    }
};

export default customMatchers;