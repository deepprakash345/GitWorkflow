export interface Action {
    type: string,
    id: string,
    payload: any
}

abstract class ActionImpl implements Action {
    private _id: string
    protected _type: string
    private _payload: any

    protected constructor(id: string, payload: any, type: string) {
        this._id = id;
        this._payload = payload;
        this._type = type;
    }

    public get type() {
        return this._type;
    }

    public get id() {
        return this._id;
    }

    public get payload() {
        return this._payload;
    }
}

export class Change extends ActionImpl {
    constructor(id: string, payload: any) {
        super(id, payload, 'change');
    }
}