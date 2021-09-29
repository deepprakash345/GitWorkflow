import {JSONFormula, makeFormula} from '@adobe/forms-next-expression-parser';
import AFNodeFactory from './AFNodeFactory';
import FunctionRuntime from './FunctionRuntime';

class RuleEngine {

    formula: JSONFormula

    constructor() {
        this.formula = makeFormula(FunctionRuntime.getFunctions(), new AFNodeFactory());
    }

    compileRule(rule: string) {
        return this.formula.compile(rule as string);
    }
}

export default new RuleEngine();



