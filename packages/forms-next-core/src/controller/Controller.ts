/**
 * Defines all form events
 * @module Events
 */
import {
    Action,
    FieldModel, FieldsetModel, FormModel
} from '../types';

/**
 * Implementation of generic event
 * @private
 */
export class ActionImpl implements Action {
    protected _type: string
    private _payload?: any
    //@ts-ignore
    private _target: FieldModel | FormModel | FieldsetModel

    constructor(payload: any, type: string, private _metadata?: any) {
        this._payload = payload;
        this._type = type;
    }

    public get type() {
        return this._type;
    }

    public get payload() {
        return this._payload;
    }

    public get metadata() {
        return this._metadata;
    }

    public get target() {
        return this._target;
    }

    public get isCustomEvent() {
        return false;
    }

    protected payloadToJson() {
        return this.payload;
    }

    toJson() {
        return {
            payload: this.payloadToJson(),
            type: this.type,
            isCustomEvent: this.isCustomEvent
        };
    }

    toString() {
        return JSON.stringify(this.toJson());
    }
}

/**
 * Payload of change event
 */
export type ChangePayload = {
    /**
     * List of changes
     */
    changes : Array<{
        /**
         * Name of the property which has changed
         */
        propertyName: string,
        /**
         * Previous value of the property changed
         */
        prevValue?: any,
        /**
         * Current value of the property changed
         */
        currentValue: any
    }>
}

/**
 * Implementation of change event. The change event is triggered on the field whenever the value of the field is changed
 */
export class Change extends ActionImpl {
    /**
     * @constructor
     * @param [payload] event payload
     * @param [dispatch] true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
     */
    constructor(payload: ChangePayload, dispatch: boolean = false) {
        super(payload, 'change', {dispatch});
    }
}

/**
 * Implementation of invalid event. The invalid event is triggered when a Field’s value becomes invalid after a change event or whenever its value property change
 */
export class Invalid extends ActionImpl {
    /**
     * @constructor
     * @param [payload] event payload
     */
    constructor(payload: any = {}) {
        super(payload, 'invalid', {});
    }
}

/**
 * Implementation of valid event. The valid event is triggered whenever the field’s valid state is changed from invalid to valid.
 */
export class Valid extends ActionImpl {
    /**
     * @constructor
     * @param [payload] event payload
     */
    constructor(payload: any = {}) {
        super(payload, 'valid', {});
    }
}

/**
 * Implementation of an ExecuteRule event.
 * @private
 */
export class ExecuteRule extends ActionImpl {
    /**
     * @constructor
     * @param [payload] event payload
     * @param [dispatch] true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
     */
    constructor(payload: any = {}, dispatch: boolean = false) {
        super(payload, 'executeRule', {dispatch});
    }
}


/**
 * Creates a change event
 * @param propertyName  name of the form field property
 * @param currentValue  current value
 * @param prevValue     previous value
 * @returns {@link Change} change event
 */
export const propertyChange = (propertyName: string, currentValue: any, prevValue?: any) => {
    return new Change({
        changes: [
            {
                propertyName,
                currentValue,
                prevValue
            }
        ]
    });
};

/**
 * Implementation of initialize event. The event is triggered on all the fields when the form initialisation is complete
 */
export class Initialize extends ActionImpl {
    /**
     * @constructor
     * @param [payload] event payload
     * @param [dispatch] true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
     */
    constructor(payload?: any, dispatch: boolean = false) {
        super(payload, 'initialize', {dispatch});
    }
}

/**
 * Implementation of click event. The event is triggered when user clicks on an element.
 */
export class Click extends ActionImpl {
    /**
     * @constructor
     * @param [payload] event payload
     * @param [dispatch] true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
     */
    constructor(payload?: any, dispatch: boolean = false) {
        super(payload, 'click', {dispatch});
    }
}

/**
 * Implementation of submit event. The submit event is triggered on the Form.
 * To trigger the submit event, submit function needs to be invoked or one can invoke dispatchEvent API.
 */
export class Submit extends ActionImpl {
    /**
     * @constructor
     * @param [payload] event payload
     * @param [dispatch] true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
     */
    constructor(payload?: any, dispatch: boolean = false) {
        super(payload, 'submit', {dispatch});
    }
}

/**
 * Implementation of custom event.
 */
export class CustomEvent extends ActionImpl {
    /**
     * @constructor
     * @param [eventName] name of the event
     * @param [payload] event payload
     * @param [dispatch] true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
     */
    constructor(eventName: string, payload: any = {}, dispatch: boolean = false) {
        super(payload, eventName, {dispatch});
    }

    /**
     * Defines if the event is custom
     */
    public get isCustomEvent() {
        return true;
    }
}

/**
 * Implementation of additem event. The event is triggered on a panel to add a new instance of items inside it.
 */
export class AddItem extends ActionImpl {
    /**
     * @constructor
     * @param [payload] event payload
     */
    constructor(payload?: number) {
        super(payload, 'addItem');
    }
}

/**
 * Implementation of removeitem event. The event is triggered on a panel to remove an instance of items inside it.
 */
export class RemoveItem extends ActionImpl {
    /**
     * @constructor
     * @param [payload] event payload
     */
    constructor(payload?: number) {
        super(payload, 'removeItem');
    }
}

