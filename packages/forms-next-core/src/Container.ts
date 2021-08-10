import Node from './Node';

class Container extends Node<any> {
  get items () {
    return this.getP('items', []);
  }
}

export default Container;
