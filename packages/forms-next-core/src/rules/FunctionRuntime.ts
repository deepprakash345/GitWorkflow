import Form from '../Form';
import {request, RequestOptions} from '../FormInstance';
import {jsonString} from '../utils/JsonUtils';
import {CustomEvent} from '../controller/Actions';

declare var window: any;

export default class FunctionRuntime {

    constructor(private form: Form) {

    }

    getFunctions () {
        return {
            validate : () => {
              return this.validate();
            },
            get_data : () => {
                return this.getData();
            },
            submit_form: (success: string, error: string) => {
                this.submit(success, error);
                return {};
            },
            show_message_box: (str?: String) => {
                //todo : let it be defined using some view mechanism
                window.alert(str);
                return {};
            },
            dispatch_event: (element: any, eventName: string | any, payload?: any) => {
                if (typeof element === 'string') {
                    payload = eventName;
                    eventName = element;
                    element = {':id' : '$all'};
                }
                this.form.dispatch(new CustomEvent(eventName, payload, element[':id']));
                return {};
            }
        };
    }

    private validate () {
        return true;
    }

    private getData () {
        return this.form.getState().data;
    }

    async submit(success: string, error: string) {
        // todo have to implement validate here
        this.validate();
        const endpoint = this.form.metaData?.action;
        const data = jsonString(this.getData());
        const formData = new FormData();
        formData.append(':data', data);
        formData.append(':contentType', 'application/json');
        const requestOptions: RequestOptions = {
            method: 'POST',
            contentType : 'application/json'
        };
        let result;
        try {
            result = await request(endpoint, formData, requestOptions);
        } catch (e) {
            //todo: define error payload
            console.log('error handled');
            this.form.dispatch(new CustomEvent(error, {}));
            return;
        }
        this.form.dispatch(new CustomEvent(success, result));
    }
}