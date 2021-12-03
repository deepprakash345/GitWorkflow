import {getProperty} from './utils/JsonUtils';


class Node<T> {

    protected _jsonModel: T

    constructor (inputModel: T) {
        this._jsonModel = {
            ...inputModel
        };
    }

    protected getP<S>(key: string, def: S): S {
        return getProperty(this._jsonModel, key, def);
    }

    get isContainer() {
        return false;
    }

}

export default Node;
