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

import EventQueue from '../src/controller/EventQueue';
import {Change, Click, propertyChange} from '../src/controller/Controller';
import mock = jest.mock;

describe('Event Queue', () => {

    let eventQueue: EventQueue;
    let mockNode : any;

    beforeEach(() => {
        eventQueue = new EventQueue();
        mockNode = {
            dispatch: jest.fn(),
            executeAction: jest.fn()
        };
    });

    test('has size 0 on creation', () => {
        expect(eventQueue.length).toEqual(0);
    });

    test('has size equal to the number of elements being put inside it', () => {
        eventQueue.queue(mockNode, new Click());
        expect(eventQueue.length).toEqual(1);
        eventQueue.queue(mockNode, new Click());
        expect(eventQueue.length).toEqual(2);
    });

    test('isQueued returns true for the elements inside the queue', () => {
        const evnt = new Click();
        eventQueue.queue(mockNode, evnt);
        expect(eventQueue.isQueued(mockNode, evnt)).toEqual(true);
    });

    test('isQueued returns false for the elements not inside the queue', () => {
        const evnt = new Click();
        eventQueue.queue(mockNode, evnt);
        expect(eventQueue.isQueued({
            dispatch: jest.fn()
        } as any, evnt)).toEqual(false);
    });

    test('isQueued returns true for the element with same event type', () => {
        const evnt = new Click();
        eventQueue.queue(mockNode, evnt);
        expect(eventQueue.isQueued(mockNode, new Click())).toEqual(true);
    });

    test('isQueued returns false for the element with different event type', () => {
        const evnt = new Click();
        eventQueue.queue(mockNode, evnt);
        expect(eventQueue.isQueued(mockNode, propertyChange('value', 1))).toEqual(false);
    });

    test.skip('isQueued returns false for the element with same event type but different payload', () => {
        const evnt = new Click();
        eventQueue.queue(mockNode, evnt);
        expect(eventQueue.isQueued(mockNode, new Click(12))).toEqual(false);
    });

    test('queue multiple events', () => {
        const evnts = [new Click(), propertyChange('value', 1)];
        eventQueue.queue(mockNode, evnts);
        expect(eventQueue.length).toEqual(2);
        expect(eventQueue.isQueued(mockNode, new Click())).toEqual(true);
        expect(eventQueue.isQueued(mockNode, propertyChange('value', 1))).toEqual(true);
    });

    test('queue when events or node is missing should do nothing', () => {
        const evnts = [new Click(), propertyChange('value', 1)];
        // @ts-ignore
        eventQueue.queue(mockNode);
        expect(eventQueue.length).toEqual(0);
        //@ts-ignore
        eventQueue.queue(undefined, evnts);
        expect(eventQueue.length).toEqual(0);
    });

    test('queue event which is already queue ignores after 10 attempts', () => {
        eventQueue.isQueued = jest.fn().mockReturnValue(true);
        for (let i = 0; i < 10; i ++) {
            eventQueue.queue(mockNode, new Click());
        }
        expect(eventQueue.length).toEqual(10);
        eventQueue.queue(mockNode, new Click());
        expect(eventQueue.length).toEqual(10);
    });

    test('runPendingQueue executes the handlers', () => {
        eventQueue.queue(mockNode, new Click());
        eventQueue.runPendingQueue();
        expect(mockNode.executeAction).toHaveBeenCalledWith(expect.objectContaining({
            type : 'click',
            payload : undefined
        }));
    });

    test('cyclic events should be handled', () => {
        const mockNode: any = {
            executeAction : jest.fn().mockImplementation(() => {
                eventQueue.queue(mockNode, new Click());
            })
        };
        eventQueue.queue(mockNode, new Click());
        eventQueue.runPendingQueue();
        expect(mockNode.executeAction).toHaveBeenCalledTimes(10);
    });

});