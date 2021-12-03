import {makeFormula} from '@aemforms/forms-next-expression-parser';
import AFNodeFactory from './AFNodeFactory';
import FunctionRuntime from './FunctionRuntime';
import {Node as RuleNode} from '@aemforms/forms-next-expression-parser/dist/node/node';
import {BaseModel} from '../types';
import {ActionImpl} from '../controller/Controller';

class AddDependent extends ActionImpl {
    constructor(payload: BaseModel) {
        super(payload, 'addDependent');
    }

    protected payloadToJson() {
        return this.payload.getState();
    }
}

const formula = makeFormula(FunctionRuntime.getFunctions(), new AFNodeFactory());

class RuleEngine {
    //todo: somehow get rid of this state
    private _context: any

    compileRule(rule: string) {
        return formula.compile(rule as string);
    }

    execute(node: RuleNode, data: any, context: any) {
        const oldContext = this._context;
        this._context = context;
        const res = node.search(data, context);
        this._context = oldContext;
        return res;
    }

    /**
     * Listen to subscriber for
     * @param subscriber
     */
    trackDependency(subscriber: BaseModel) {
        if (this._context && this._context.$field !== undefined && this._context.$field !== subscriber) {
            subscriber.dispatch(new AddDependent(this._context.$field));
        }
    }
}

export default RuleEngine;



