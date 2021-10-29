import Node from '../Node';
import {BaseModel} from '../types';
import {Action} from './Controller';

class EventNode<T extends BaseModel> {
    constructor(private _node: T, private _event: Action) {
    }

    get node() {
        return this._node;
    }

    get event() {
        return this._event;
    }

    isEqual(that: EventNode<T>) {
        if (that === null || that === undefined) {
            return false;
        }
        return this._node == that._node && this._event.type  == that._event.type;
    }

    toString() {
        return this._node.id + '__' + this.event.type;
    }

    valueOf() {
        return this.toString();
    }
}

class EventQueue<T extends BaseModel> {

    private _runningEventCount: any
    private _isProcessing: boolean = false
    private _pendingEvents: EventNode<T>[] = []

    constructor() {
        this._runningEventCount = {};
    }

    get length() {
       return this._pendingEvents.length;
    }

    isQueued(node: T, event: Action) {
        const evntNode = new EventNode(node, event);
        return this._pendingEvents.find(x => evntNode.isEqual(x)) !== undefined;
    }

    queue(node : T, events: Action | Action[]) {
        if (!node || !events) {
            return;
        }
        if (!(events instanceof Array)) {
            events = [events];
        }
        events.forEach(e => {
            const evntNode = new EventNode(node, e);
            const counter = this._runningEventCount[evntNode.valueOf()] || 0;
            const alreadyExists = this.isQueued(node, e);
            if (!alreadyExists || counter < 10) {
                this._pendingEvents.push(evntNode);
                this._runningEventCount[evntNode.valueOf()] = counter + 1;
            }
        });
    }

    runPendingQueue() {
        if (this._isProcessing) {
            return;
        }
        this._isProcessing = true;
        while(this._pendingEvents.length > 0) {
            const e = this._pendingEvents[0];
            e.node.controller().dispatch(e.event);
            this._pendingEvents.shift();
        }
        this._runningEventCount = {};
        this._isProcessing = false;
    }
}

export default EventQueue;