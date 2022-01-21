import Field from './Field';
import {Constraints} from './utils/ValidationUtils';

const requiredConstraint = (offValue: any) => (constraint: boolean, value: any) => {
    const valid =  Constraints.required(constraint, value) && value != offValue;
    return {valid, value};
};

class Checkbox extends Field {

    private offValue() {
        const opts = this.enum || [];
        return opts.length > 1 ? opts[1] : null;
    }

    _getConstraintObject() {
        const baseConstraints =  {...super._getConstraintObject()};
        baseConstraints.required = requiredConstraint(this.offValue());
        return baseConstraints;
    }
}

export default Checkbox;