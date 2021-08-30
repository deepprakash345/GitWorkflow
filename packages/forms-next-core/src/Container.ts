import Node from './Node';
import {ContainerJson, ContainerModel} from './Types';
import Field from './Field';
import Fieldset from './Fieldset';

class Container<T extends ContainerJson> extends Node<T> implements ContainerModel<Field | Fieldset> {
  get items (): { [key:string]: Field|Fieldset } {
    return this.getP('items', {});
  }
}

export default Container;
