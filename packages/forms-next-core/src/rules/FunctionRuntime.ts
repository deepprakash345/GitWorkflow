import Form from '../Form';
import {jsonString} from '../utils/JsonUtils';

declare var window: any;

export default class FunctionRuntime {

    constructor(private form: Form) {

    }

    getFunctions () {
        return {
            getData : () => {
                this.getData();
            },
            submit: () => {
                this.submit();
            }
        };
    }

    private getData () {
        return this.form.getState().data;
    }

    private submit () {
        //todo: fix this
        window.alert(jsonString(this.getData()));
    }
}