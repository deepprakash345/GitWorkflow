import Container from './Container';
import {ContainerModel, FieldJson, FieldModel, FieldsetJson, FieldsetModel} from './types';
import Field from './Field';
import {Action, Change, Controller} from './controller/Controller';
import RuleEngine from './rules/RuleEngine';

export const createChild = (child: FieldsetJson | FieldJson,
                            ruleEngine: RuleEngine,
                            createController: (elem: FieldModel | FieldsetModel) => Controller) => {
  let retVal: Fieldset | Field;
  if ('items' in child) {
    retVal = new Fieldset(child as FieldsetJson,
        ruleEngine,
        createController);
  } else {
    retVal = new Field(child as FieldJson, ruleEngine, createController);
  }
  return retVal;
};

export class Fieldset extends Container<FieldsetJson> implements FieldsetModel {

  private _controller;

  public constructor (params: FieldsetJson,
                      ruleEngine: RuleEngine,
                      _createController: (elem : FieldModel | FieldsetModel) => Controller) {
    super(params, ruleEngine, _createController);
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

  protected _createChild(child: FieldsetJson | FieldJson,
                         ruleEngine: RuleEngine,
                         _createController: (elem : FieldModel | FieldsetModel) => Controller): FieldModel | FieldsetModel {
    return createChild(child, ruleEngine, _createController);
  }

  get name () {
    return this.getP('name', '');
  }

  controller() {
    return this._controller;
  }
}
