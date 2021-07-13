abstract class Node<T> {
    protected _jsonModel: T

    constructor (node: T) {
      this._jsonModel = node;
    }

    public json (): T {
      return Object.assign({}, this._jsonModel);
    }
}

export default Node;
