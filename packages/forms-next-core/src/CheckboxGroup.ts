import Field from './Field';
import {ContainerModel, FieldJson, FormModel} from './types';

class CheckboxGroup extends Field {

    public constructor(params: FieldJson,
                       _options: { form: FormModel, parent: ContainerModel }) {
        super(params, _options);
        const type = params.type;
        const _enum = this.enum.length > 0 ? this.enum[0] : '';
        const enumType = typeof _enum;
        if (typeof type !== 'string') {
            this._jsonModel.type = `${enumType}[]`;
        }
    }

    protected _getDefaults() {
        return {
            ...super._getDefaults(),
            enforceEnum: true
        };
    }

    get enum() {
       return super.enum || [];
    }
}

export default CheckboxGroup;