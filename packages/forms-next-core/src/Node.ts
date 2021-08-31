import {getProperty} from './utils/JsonUtils';


class Node<T> {
    protected _jsonModel: T

    constructor (node: T) {
      this._jsonModel = node;
    }

    public json (): T {
      return Object.assign({}, this._jsonModel);
    }

    protected getP<S>(key: string, def: S): S {
        return getProperty(this._jsonModel, key, def);
    }
}

export default Node;
