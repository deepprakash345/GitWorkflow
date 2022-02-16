import Field from './Field';
import {Constraints} from './utils/ValidationUtils';

/**
 * @param offValue
 * @private
 */
const requiredConstraint = (offValue: any) => (constraint: boolean, value: any) => {
    const valid =  Constraints.required(constraint, value) && (!constraint || value != offValue);
    return {valid, value};
};

/**
 * Implementation of check box runtime model which extends from {@link Field | field} model
 */
class Checkbox extends Field {

    private offValue() {
        const opts = this.enum;
        return opts.length > 1 ? opts[1] : null;
    }

    /**
     * @private
     */
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

    /**
     * Returns the `enum` constraints from the json
     */
    get enum() {
        return this._jsonModel.enum || [];
    }
}

export default Checkbox;