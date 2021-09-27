import Node from './Node';
import {ContainerJson, ContainerModel, FieldJson, FieldModel, FieldsetJson, FieldsetModel, Items} from './types';
import {getProperty, splitTokens} from './utils/JsonUtils';
import {Action} from './controller/Actions';

const findChild = (container: ContainerModel,
                   childName: string) : FieldModel | FieldsetModel | undefined => {
  const entry = Object.entries(container.items).find(([key, element]) => {
    if (element.name === childName) {
      return true;
    } else if (element.isContainer && element.name?.length === 0) {
      return findChild(element as FieldsetModel, childName);
    } else {
      return false;
    }
  });
  if (entry != null) {
    return entry[1];
  }
};

abstract class Container<T extends ContainerJson> extends Node<T> implements ContainerModel {

  protected _children: Items<FieldModel|FieldsetModel>

  //todo : this should not be public
  get items (): { [key:string]: FieldModel|FieldsetModel } {
    return this._children;
  }

  get isContainer() {
    return true;
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
      Object.defineProperty(this._children, key, {
        get() {
          return retVal;
        },
        enumerable : true
      });
      this._jsonModel[':items'][key] = retVal.json();
    });
  }

  public getElement(id: string) : FieldModel | ContainerModel | undefined  {
    if (id == this.id) {
      return this;
    }
    let child: FieldModel | ContainerModel | undefined = this;
    let tokens = splitTokens(id);
    let token = tokens.next();
    while(!token.done && child != undefined) {
      if (child?.isContainer) {
        child = findChild(child as ContainerModel, token.value);
      } else {
        child = undefined;
      }
      token = tokens.next();
    }
    return child;
  }

  private items2Json() {
    return Object.fromEntries(Object.entries(this.items).map(([key, elem]) => {
      return [key, elem.json()];
    }));
  }

  json(): T {
    return {
      ...super.json(),
      ':items' : this.items2Json()
    };
  }

  dispatch(action: Action) {

  }
}

export default Container;
