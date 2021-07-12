import Container from "./Container";
import { FieldSetModel } from "./Types";

class Fieldset extends Container<FieldSetModel> {

    public static getInitialValue(type?: string) {
        if (type === "object") return {}
        else return null
    }
    
    get count() {
        return this._jsonModel.count || 1
    }

    get initialCount() {
        return this._jsonModel.initialCount || 1
    }

    public json(): FieldSetModel {
        return Object.assign({}, super.json(), {
            count: this.count,
            initialCount: this.initialCount
        })
    }
}

export default Fieldset