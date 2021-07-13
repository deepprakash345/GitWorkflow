import Node from './Node';
import { ContainerModel, FieldModel, FieldSetModel } from './Types';

class Container<T extends ContainerModel<FieldModel|FieldSetModel>> extends Node<T> {
  get items () {
    return this._jsonModel.items;
  }
}

export default Container;
