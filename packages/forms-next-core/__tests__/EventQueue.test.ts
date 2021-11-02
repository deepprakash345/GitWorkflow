import EventQueue from '../src/controller/EventQueue';
import {Change, Click} from '../src/controller/Controller';
import mock = jest.mock;

describe('Event Queue', () => {

    let eventQueue: EventQueue<any>;
    let mockController : any;

    beforeEach(() => {
        eventQueue = new EventQueue();
        mockController = {
            dispatch: jest.fn()
        };
    });

    test('has size 0 on creation', () => {
        expect(eventQueue.length).toEqual(0);
    });

    test('has size equal to the number of elements being put inside it', () => {
        eventQueue.queue({
            controller: () => {return mockController;}
        }, new Click());
        expect(eventQueue.length).toEqual(1);
        eventQueue.queue({
            controller: () => {return mockController;}
        }, new Click());
        expect(eventQueue.length).toEqual(2);
    });

    test('isQueued returns true for the elements inside the queue', () => {
        const node = {
            controller: () => {return mockController;}
        };
        const evnt = new Click();
        eventQueue.queue(node, evnt);
        expect(eventQueue.isQueued(node, evnt)).toEqual(true);
    });

    test('isQueued returns false for the elements not inside the queue', () => {
        const node = {
            controller: () => {return mockController;}
        };
        const evnt = new Click();
        eventQueue.queue(node, evnt);
        expect(eventQueue.isQueued({
            controller: () => {return mockController;}
        }, evnt)).toEqual(false);
    });

    test('isQueued returns true for the element with same event type', () => {
        const node = {
            controller: () => {return mockController;}
        };
        const evnt = new Click();
        eventQueue.queue(node, evnt);
        expect(eventQueue.isQueued(node, new Click())).toEqual(true);
    });

    test('isQueued returns false for the element with different event type', () => {
        const node = {
            controller: () => {return mockController;}
        };
        const evnt = new Click();
        eventQueue.queue(node, evnt);
        expect(eventQueue.isQueued(node, new Change(1))).toEqual(false);
    });

    test.skip('isQueued returns false for the element with same event type but different payload', () => {
        const node = {
            controller: () => {return mockController;}
        };
        const evnt = new Click();
        eventQueue.queue(node, evnt);
        expect(eventQueue.isQueued(node, new Click(12))).toEqual(false);
    });

    test('queue multiple events', () => {
        const node = {
            controller: () => {return mockController;}
        };
        const evnts = [new Click(), new Change(1)];
        eventQueue.queue(node, evnts);
        expect(eventQueue.length).toEqual(2);
        expect(eventQueue.isQueued(node, new Click())).toEqual(true);
        expect(eventQueue.isQueued(node, new Change(1))).toEqual(true);
    });

    test('queue when events or node is missing should do nothing', () => {
        const node = {
            controller: () => {return mockController;}
        };
        const evnts = [new Click(), new Change(1)];
        // @ts-ignore
        eventQueue.queue(node);
        expect(eventQueue.length).toEqual(0);
        eventQueue.queue(undefined, evnts);
        expect(eventQueue.length).toEqual(0);
    });

    test('queue event which is already queue ignores after 10 attempts', () => {
        const node = {
            controller: () => {return mockController;}
        };
        eventQueue.isQueued = jest.fn().mockReturnValue(true);
        for (let i = 0; i < 10; i ++) {
            eventQueue.queue(node, new Click());
        }
        expect(eventQueue.length).toEqual(10);
        eventQueue.queue(node, new Click());
        expect(eventQueue.length).toEqual(10);
    });

    test('runPendingQueue dispatches the events', () => {
        const node = {
            controller: mockController
        };
        eventQueue.queue(node, new Click());
        eventQueue.runPendingQueue();
        expect(mockController.dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type : 'click',
            payload : undefined
        }));
    });

    test('cyclic events should be handled', () => {
        const mockController = {
            dispatch : jest.fn().mockImplementation(() => {
                eventQueue.queue(node, new Click());
            })
        };
        const node = {
            controller: mockController
        };
        eventQueue.queue(node, new Click());
        eventQueue.runPendingQueue();
        expect(mockController.dispatch).toHaveBeenCalledTimes(10);
    });

});