import Node from './Node';
import {ContainerModel} from './Types';
import Field from './Field';
import Fieldset from './Fieldset';

class Container extends Node<any> implements ContainerModel<Field | Fieldset> {
  get items (): { [key:string]: Field|Fieldset } {
    return this.getP('items', {});
  }

  children () {
    return Object.values(this._jsonModel[':items']);
  }

}

export default Container;
