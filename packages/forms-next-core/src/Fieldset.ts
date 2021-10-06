import Container from './Container';
import {FieldJson, FieldModel, FieldsetJson, FieldsetModel} from './types';
import Field from './Field';
import {Controller} from './controller/Controller';

export const createChild = (child: FieldsetJson | FieldJson,
                            createController: (elem: FieldModel | FieldsetModel) => Controller) => {
  let retVal: Fieldset | Field;
  if ('items' in child) {
    retVal = new Fieldset(child as FieldsetJson, createController);
  } else {
    retVal = new Field(child as FieldJson, createController);
  }
  return retVal;
};

export class Fieldset extends Container<FieldsetJson> implements FieldsetModel {

  private _controller;

  public constructor (params: FieldsetJson,
                      _createController: (elem : FieldModel | FieldsetModel) => Controller) {
    super(params, _createController);
    this._controller = _createController(this as FieldsetModel);
  }

  get count () {
    return this.getP('count', 1);
  }

  get initialCount () {
    return this.getP('initialCount', 1);
  }

  get visible () {
    return this.getP('visible', true);
  }

  public json (): any {
    return Object.assign({}, super.json(), {
      'count': this.count,
      'initialCount': this.initialCount,
      'visible': this.visible
    });
  }

  protected _createChild(child: FieldsetJson | FieldJson, _createController: (elem : FieldModel | FieldsetModel) => Controller): FieldModel | FieldsetModel {
    return createChild(child, _createController);
  }

  get name () {
    return this.getP('name', '');
  }

  controller() {
    return this._controller;
  }
}
