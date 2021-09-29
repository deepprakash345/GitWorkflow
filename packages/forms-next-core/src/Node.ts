import {getProperty} from './utils/JsonUtils';


class Node<T> {

    constructor (protected _jsonModel: T) {

    }

    public json (): T {
      return Object.assign({}, this._jsonModel);
    }

    protected getP<S>(key: string, def: S): S {
        return getProperty(this._jsonModel, key, def);
    }

    get isContainer() {
        return false;
    }
}

export default Node;
