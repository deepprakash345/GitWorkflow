/**
 * Implementation of rule engine
 * @module
 * @private
 */
import {BaseModel} from '../types';
import {ActionImpl} from '../controller/Controller';
import {Formula} from '@aemforms/json-formula';
import FunctionRuntime from './FunctionRuntime';

/**
 * Implementation of AddDependant event
 * @private
 */
class AddDependent extends ActionImpl {
    constructor(payload: BaseModel) {
        super(payload, 'addDependent');
    }

    protected payloadToJson() {
        return this.payload.getState();
    }
}

/**
 * Implementation of rule engine
 * @private
 */
class RuleEngine {
    //todo: somehow get rid of this state
    private _context: any
    private _globalNames = [
        '$form',
        '$field',
        '$event'
    ];

    compileRule(rule: string) {
        const customFunctions = FunctionRuntime.getFunctions();
        return new Formula(rule as string, customFunctions, undefined, this._globalNames);
    }

    execute(node: any, data: any, globals: any, useValueOf = false) {
        const oldContext = this._context;
        this._context = globals;
        const res = node.search(data, globals);
        let finalRes = res;
        if (useValueOf) {
            if (typeof res === 'object' && res !== null) {
                finalRes = Object.getPrototypeOf(res).valueOf.call(res);
            }
        }
        this._context = oldContext;
        return finalRes;
    }

    /**
     * Listen to subscriber for
     * @param subscriber
     */
    trackDependency(subscriber: BaseModel) {
        if (this._context && this._context.field !== undefined && this._context.field !== subscriber) {
            subscriber.dispatch(new AddDependent(this._context.field));
        }
    }
}

export default RuleEngine;



