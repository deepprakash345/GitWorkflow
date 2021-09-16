import Container from './Container';
import {FieldJson, FieldModel, FieldsetJson, FieldsetModel} from './types';
import Field from './Field';


export const createChild = (child: FieldsetJson | FieldJson) => {
  let retVal: Fieldset | Field;
  if (':items' in child) {
    retVal = new Fieldset(child as FieldsetJson);
  } else {
    retVal = new Field(child as FieldJson);
  }
  return retVal;
};

export class Fieldset extends Container<FieldsetJson> implements FieldsetModel {
  get count () {
    return this.getP('count', 1);
  }

  get initialCount () {
    return this.getP('initialCount', 1);
  }

  get visible () {
    return this.getP(':visible', true);
  }

  public json (): any {
    return Object.assign({}, super.json(), {
      ':count': this.count,
      ':initialCount': this.initialCount,
      ':visible': this.visible
    });
  }

  protected _createChild(child: FieldsetJson | FieldJson): FieldModel | FieldsetModel {
    return createChild(child);
  }
}
