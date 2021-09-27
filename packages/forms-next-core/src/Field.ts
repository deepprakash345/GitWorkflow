import Node from './Node';
import {ConstraintsMessages, FieldJson, FieldModel} from './types';
import {filterProps, undefinedValueFilter} from './utils/JsonUtils';
import {Action} from './controller/Actions';
import {Constraints} from './utils/ValidationUtils';
import RuleEngine from './rules/RuleEngine';
import {Json} from '@adobe/forms-next-expression-parser';
import {Node as RuleNode} from '@adobe/forms-next-expression-parser/dist/node';

class Field extends Node<FieldJson> implements FieldModel {

  private _events : {
    [key:string] : RuleNode
  } = {};

  private _rules : {
    [key:string] : RuleNode
  } = {};

  public constructor (params: FieldJson) {
    super(params);
    let value = this.getP('value', undefined);
    if (value === undefined) {
      this._jsonModel[':value'] = this.default; //TODO: see if we want to keep :
    }
  }

  get readOnly () {
    return this.getP(':readOnly', false);
  }

  get enabled () {
    return this.getP(':enabled', true);
  }

  get 'default' () {
    return this.getP(':default', undefined);
  }

  get visible () {
    return this.getP(':visible', true);
  }

  get valid () {
    return this._jsonModel[':valid'];
  }

  get id() {
    return this._jsonModel[':id'];
  }

  public json (): FieldJson {
    return filterProps(Object.assign({}, super.json(), {
      ':value': this.value,
      ':readOnly': this.readOnly,
      ':enabled': this.enabled,
      ':default': this.default,
      ':visible': this.visible,
      ':valid': this.valid,
      ':id' : this.id
      // eslint-disable-next-line no-unused-vars
    }), undefinedValueFilter);
  }

  get value() {
    return this.getP('value', null);
  }

  get name() {
    return this._jsonModel[':name'];
  }

  get rules() {
    return this._jsonModel[':rules'] || {};
  }

  get dataRef() {
    return this._jsonModel[':dataRef'];
  }

  get title() {
    return this._jsonModel[':title'];
  }

  private getCompiledRule(eName: string, rule: string, ruleEngine: RuleEngine) {
    if (!(eName in this._rules)) {
      let eString = rule || this.rules[eName];
      if (typeof eString === 'string' && eString.length > 0) {
        this._rules[eName] = ruleEngine.compileRule(eString);
      } else {
        throw new Error(`only expression strings are supported. ${typeof(eString)} types are not supported`);
      }
    }
    return this._rules[eName];
  }

  private getCompiledEvent(eName: string, ruleEngine: RuleEngine) {
    if (!(eName in this._events)) {
      let eString = this._jsonModel[':events']?.[eName];
      if (typeof eString === 'string' && eString.length > 0) {
        this._events[eName] = ruleEngine.compileRule(eString);
      }
    }
    return this._events[eName];
  }

  private getErrorMessage(constraint: keyof(ConstraintsMessages)) {
    return this._jsonModel[':constraintMessages']?.[constraint as keyof(ConstraintsMessages)] || 'There is an error in the field';
  }

  private evaluateConstraints(value: string) {
    let constraint = ':dataType';
    let elem = this._jsonModel;
    const constraints = elem[':constraints'] || {};
    const res = Constraints.dataType(constraints[':dataType'] || 'string', value);
    if (res.valid) {
      const invalidConstraint = Object.entries(constraints).find(([key, restriction]) => {
        let x = key.replace(/^:/, '');
        if (x in Constraints && x !== 'dataType' && typeof (Constraints as any)[x] === 'function') {
          return !((Constraints as any)[x](restriction, res.value).valid);
        } else if (x !== 'dataType') {
          console.error('invalid constraint ' + key);
          return false;
        }
      });
      if (invalidConstraint != null) {
        res.valid = false;
        constraint = invalidConstraint[0];
      }
    }
    return {
      valid: res.valid,
      constraint,
      value: res.value
    };
  }

  private executeAllRules(ruleEngine: RuleEngine, context: any) {
    return Object.fromEntries(Object.entries(this.rules).map(([prop, rule]) => {
      const node = this.getCompiledRule(prop, rule, ruleEngine);
      return [prop, node.search(this as unknown as Json, context)];
    }));
  }

  private checkInput(input: string) {
    //todo : execute change event
    let {valid, value, constraint} = this.evaluateConstraints(input);
    let elem = {
      ':valid' : valid,
      ':value' : value,
      ':errorMessage' : ''
    };
    if (!valid) {
      console.log(`${constraint} validation failed for ${this.id} with value ${value}`);
      elem[':errorMessage'] = this.getErrorMessage(constraint as keyof ConstraintsMessages);
    } else {
      elem[':value'] = value;
      elem[':errorMessage'] = '';
      //todo : make it conditional based on valid flag
    }
    return elem;
  }

  dispatch(action: Action, ruleEngine: RuleEngine, context: any) {
    let event, res : any, updates : any = {}, eventName;
    switch (action.type) {
      case 'change':
        //todo : set empty string to `empty` value
        if (action.payload !== undefined) {
          res = this.checkInput(action.payload != null ? action.payload.toString() : undefined);
          updates = {
            ...res
          };
        }
        if (!res || res[':valid'] == false) {
          updates = {
            ...updates,
            ...this.executeAllRules(ruleEngine, context)
          };
        }
        break;
      case 'click':
        context = {
          ...context,
          '$field' : this,
          '$event' : {
            'target': this,
            'type': eventName
          }
        };
        event = this.getCompiledEvent('click', ruleEngine);
        if (event) {
          updates = event.search(this as unknown as Json, context);
        }
        break;
      case 'customEvent':
        eventName = action.payload[':name'];
        context = {
          ...context,
          '$field' : this,
          '$event' : {
            'target': this,
            'type': eventName,
            'payload' : action.payload.payload
          }
        };
        event = this.getCompiledEvent(eventName, ruleEngine);
        if (event) {
          updates = event.search(this as unknown as Json, context);
        }
        break;
    }
    if (updates && Object.keys(updates).length > 0) {
      this._jsonModel = {
        ...this._jsonModel,
        ...updates
      };
    }
    return updates;
  }
}

export default Field;
