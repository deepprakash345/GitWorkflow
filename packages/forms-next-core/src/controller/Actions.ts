export interface Action {
    type: string,
    payload: any
    metadata: any
}

class ActionImpl implements Action {
    protected _type: string
    private _payload?: any

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
}

export class Change extends ActionImpl {
    constructor(payload: any, dispatch: boolean = false) {
        super(payload, 'change', {dispatch});
    }
}

export class Click extends ActionImpl {
    constructor(payload?: any, dispatch: boolean = false) {
        super(payload, 'click', {dispatch});
    }
}

export class CustomEvent extends ActionImpl {
    //todo: dispatch means bubble down, find a better name
    constructor(eventName: string, payload: any, dispatch: boolean = false) {
        super(payload, 'customEvent', {
            ':name': eventName,
            dispatch
        });
    }
}