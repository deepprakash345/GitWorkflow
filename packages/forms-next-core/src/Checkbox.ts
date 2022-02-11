import Field from './Field';
import {Constraints} from './utils/ValidationUtils';

const requiredConstraint = (offValue: any) => (constraint: boolean, value: any) => {
    const valid =  Constraints.required(constraint, value) && (!constraint || value != offValue);
    return {valid, value};
};

class Checkbox extends Field {

    private offValue() {
        const opts = this.enum;
        return opts.length > 1 ? opts[1] : null;
    }

    _getConstraintObject() {
        const baseConstraints =  {...super._getConstraintObject()};
        baseConstraints.required = requiredConstraint(this.offValue());
        return baseConstraints;
    }

    protected _getDefaults() {
        return {
            ...super._getDefaults(),
            enforceEnum: true
        };
    }

    get enum() {
        return this._jsonModel.enum || [];
    }
}

export default Checkbox;