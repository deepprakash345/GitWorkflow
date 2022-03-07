import Field from './Field';
import {ContainerModel, FieldJson, FormModel} from './types';

/**
 * Implementation of CheckBoxGroup runtime model which extends from {@link Field | field}
 */
class CheckboxGroup extends Field {

    /**
     * @param params
     * @param _options
     * @private
     */
    public constructor(params: FieldJson,
                       _options: { form: FormModel, parent: ContainerModel }) {
        super(params, _options);
    }

    /**
     * converts the fallback type, if required, to an array. Since checkbox-group has an array type
     * @protected
     */
    protected _getFallbackType(): string | undefined {
        const fallbackType =  super._getFallbackType();
        if (typeof fallbackType === "string") {
            return `${fallbackType}[]`
        }
    }

    protected _getDefaults() {
        return {
            ...super._getDefaults(),
            enforceEnum: true,
            enum : []
        };
    }
}

export default CheckboxGroup;