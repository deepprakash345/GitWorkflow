import {FormModel} from '../types';
import {JSONFormula, makeFormula, Json} from '@adobe/forms-next-expression-parser';
import AFNodeFactory from './AFNodeFactory';

type FunctionType = {
    [name: string]: (...Json: any[]) => Json;
}

export default class RuleEngine {

    formula: JSONFormula

    constructor(private functions: FunctionType , private form: FormModel) {
        this.formula = makeFormula(functions, new AFNodeFactory());
    }

    compileRule(rule: string) {
        return this.formula.compile(rule as string);
    }
}

