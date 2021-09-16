import Node from './Node';
import {ContainerJson, ContainerModel, FieldJson, FieldModel, FieldsetJson, FieldsetModel, Items} from './types';
import {getProperty} from './utils/JsonUtils';

abstract class Container<T extends ContainerJson> extends Node<T> implements ContainerModel<FieldModel | FieldsetModel> {

  protected _children: Items<FieldModel|FieldsetModel>

  //todo : this should not be public
  get children (): { [key:string]: FieldModel|FieldsetModel } {
    return this._children;
  }

  protected abstract _createChild(child: FieldJson | FieldsetJson): FieldModel | FieldsetModel

  constructor(args: T) {
    super(args);
    this._children = {};
    this.initialize();
  }

  get id() {
    return this._jsonModel[':id'] || '';
  }

  protected initialize() {
    let items = this._jsonModel[':items'];
    Object.entries(items).map(([key, item]) => {
      const name = getProperty(item, 'name', '');
      const parentId = this.id.length > 0 ? this.id + '.' : '';
      const id = name.length > 0 ? parentId + name : undefined;
      const newItem = Object.assign(item, {':id' : id});
      let retVal: FieldModel | FieldsetModel = this._createChild(newItem);
      //retVal.parent = this;
      this._children[key] = retVal;
      this._jsonModel[':items'][key] = retVal.json();
    });
  }
}

export default Container;
