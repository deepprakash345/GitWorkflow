import {getProperty} from './utils/JsonUtils';


class Node<T> {

    protected _jsonModel: T

    constructor (jsonModel: T) {
        this._jsonModel = jsonModel;
    }

    public json (): T {
      return Object.assign({id : ''}, this._jsonModel);
    }

    protected getP<S>(key: string, def: S): S {
        return getProperty(this._jsonModel, key, def);
    }

    get isContainer() {
        return false;
    }

}

export default Node;
