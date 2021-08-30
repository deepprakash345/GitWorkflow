import Container from './Container';
import {FieldsetJson, FieldsetModel} from './Types';

class Fieldset extends Container<FieldsetJson> implements FieldsetModel  {
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
}

export default Fieldset;
