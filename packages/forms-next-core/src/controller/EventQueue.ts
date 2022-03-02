/**
 * Defines event queue and event node
 */
import {Action, BaseJson} from '../types';
import {BaseNode} from '../BaseNode';
import {Logger} from "../Form";

/**
 * Implementation of event node
 * @private
 */
class EventNode<T extends BaseJson> {
    constructor(private _node: BaseNode<T>, private _event: Action) {
    }

    get node() {
        return this._node;
    }

    get event() {
        return this._event;
    }

    isEqual(that: EventNode<T>) {
        return that !== null && that !== undefined && this._node == that._node && this._event.type  == that._event.type;
    }

    toString() {
        return this._node.id + '__' + this.event.type;
    }

    valueOf() {
        return this.toString();
    }
}

/**
 * Implementation of event queue. When a user event, like change or click, is captured the expression to be evaluated
 * must be put in an Event Queue and then evaluated.
 * @private
 */
class EventQueue {

    private _runningEventCount: any
    private _isProcessing: boolean = false
    private _pendingEvents: EventNode<any>[] = []

    constructor(private logger: Logger = new Logger("off")) {
        this._runningEventCount = {};
    }

    get length() {
       return this._pendingEvents.length;
    }

    get isProcessing() {
        return this._isProcessing;
    }

    isQueued<T extends BaseJson>(node: BaseNode<T>, event: Action) {
        const evntNode = new EventNode(node, event);
        return this._pendingEvents.find(x => evntNode.isEqual(x)) !== undefined;
    }

    queue<T extends BaseJson>(node : BaseNode<T>, events: Action | Action[], priority: boolean = false) {
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
                this.logger.info(`Queued event : ${e.type} node: ${node.id} - ${node.name}`);
                //console.log(`Event Details ${e.toString()}`)
                if (priority) {
                    const index = this._isProcessing ? 1 : 0;
                    this._pendingEvents.splice(index, 0, evntNode);
                } else {
                    this._pendingEvents.push(evntNode);
                }
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
            this.logger.info(`Dequeued event : ${e.event.type} node: ${e.node.id} - ${e.node.name}`);
            //console.log(`Event Details ${e.event.toString()}`);
            e.node.executeAction(e.event);
            this._pendingEvents.shift();
        }
        this._runningEventCount = {};
        this._isProcessing = false;
    }
}

export default EventQueue;