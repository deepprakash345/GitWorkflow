import {BaseModel} from '../types';
import {ActionImpl} from '../controller/Controller';
import {Formula} from '@adobe/json-formula';
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

    execute(node: any, data: any, globals: any) {
        const oldContext = this._context;
        this._context = globals;
        const res = node.search(data, globals);
        this._context = oldContext;
        return res;
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



