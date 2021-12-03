import {
    Action,
    BaseModel
} from '../types';

export class ActionImpl implements Action {
    protected _type: string
    private _payload?: any
    //@ts-ignore
    private _target: BaseModel

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

export class Change extends ActionImpl {
    constructor(payload: any, dispatch: boolean = false) {
        super(payload, 'change', {dispatch});
    }
}

export class ExecuteRule extends ActionImpl {
    constructor(payload: any = {}, dispatch: boolean = false) {
        super(payload, 'executeRule', {dispatch});
    }
}

export const propertyChange = (propertyName: string, currentValue: any, prevValue: any) => {
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

export class Initialize extends ActionImpl {
    constructor(payload?: any, dispatch: boolean = false) {
        super(payload, 'initialize', {dispatch});
    }
}

export class Click extends ActionImpl {
    constructor(payload?: any, dispatch: boolean = false) {
        super(payload, 'click', {dispatch});
    }
}

export class Submit extends ActionImpl {
    constructor(payload?: any, dispatch: boolean = false) {
        super(payload, 'submit', {dispatch});
    }
}

export class CustomEvent extends ActionImpl {
    //todo: dispatch means bubble down, find a better name
    constructor(eventName: string, payload: any = {}, dispatch: boolean = false) {
        super(payload, eventName, {dispatch});
    }

    public get isCustomEvent() {
        return true;
    }
}



export class AddItem extends ActionImpl {
    constructor(payload?: number) {
        super(payload, 'addItem');
    }
}

export class RemoveItem extends ActionImpl {
    constructor(payload?: number) {
        super(payload, 'removeItem');
    }
}

