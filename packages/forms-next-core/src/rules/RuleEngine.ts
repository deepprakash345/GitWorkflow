import {Json, makeFormula} from '@adobe/forms-next-expression-parser';
import AFNodeFactory from './AFNodeFactory';
import FunctionRuntime from './FunctionRuntime';
import {Node as RuleNode} from '@adobe/forms-next-expression-parser/dist/node/node';
import {BaseModel} from '../types';
import {AddDependent} from '../controller/Controller';

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

    trackDependency(subscriber: BaseModel) {
        if (this._context && this._context.$field !== undefined) {
            subscriber.controller().dispatch(new AddDependent(this._context.$field));
        }
    }
}

export default RuleEngine;



