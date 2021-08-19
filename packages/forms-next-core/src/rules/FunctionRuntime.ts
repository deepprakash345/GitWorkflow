import Form from '../Form';
import {submitForm} from '../FormInstance';
import {jsonString} from '../utils/JsonUtils';

//declare var window: any;

export default class FunctionRuntime {

    constructor(private form: Form) {

    }

    getFunctions () {
        return {
            validate : () => {
                // todo have to implement
              return this.validate();
            },
            getData : () => {
                this.getData();
            },
            submit: () => {
                this.submit();
            }
        };
    }

    private validate () {
        return true;
    }

    private getData () {
        return this.form.getState().data;
    }

    private async submit() {
        // todo have to implement validate here
        this.validate();
        if (this.form.metaData && this.form.metaData.action) {
            const data = await submitForm(this.form.metaData.action, jsonString(this.getData()), this.form);
            console.log(data);
        }  else {
            console.log('error', 'no submit url configured');
        }

    }
}