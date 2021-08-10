import Container from './Container';
import { FieldsetModel } from './Types';

class Fieldset extends Container implements FieldsetModel  {
  get count () {
    return this.getP('count', 1);
  }

  get initialCount () {
    return this.getP('initialCount', 1);
  }

  public json (): any {
    return Object.assign({}, super.json(), {
      count: this.count,
      initialCount: this.initialCount
    });
  }
}

export default Fieldset;
