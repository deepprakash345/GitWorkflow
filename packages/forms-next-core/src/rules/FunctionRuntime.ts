import {jsonString} from '../utils/JsonUtils';
import {CustomEvent} from '../controller/Actions';
import {request, RequestOptions} from '../utils/Fetch';

declare var window: any;

class FunctionRuntimeImpl {

    getFunctions () {
        return {
            validate : (context: any) => {
              return this.validate(context);
            },
            get_data : (context : any) => {
                return this.getData(context);
            },
            submit_form: (context: any, success: string, error: string) => {
                this.submit(context, success, error);
                return {};
            },
            show_message_box: (context: any, str?: String) => {
                //todo : let it be defined using some view mechanism
                window.alert(str);
                return {};
            },
            dispatch_event: (context: any, element: any, eventName: string | any, payload?: any) => {
                let dispatch = false;
                if (typeof element === 'string') {
                    payload = eventName;
                    eventName = element;
                    dispatch = true;
                }
                context.$form.controller().dispatch(new CustomEvent(eventName, payload, dispatch));
                return {};
            }
        };
    }

    private validate (context: any) {
        return true;
    }

    private getData (context: any) {
        return context.$form.controller().getState()[':data'];
    }

    async submit(context: any, success: string, error: string) {
        // todo have to implement validate here
        this.validate(context);
        const endpoint = context.$form.metaData?.action;
        const data = jsonString(this.getData(context));
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
            context.$form.controller().dispatch(new CustomEvent(error, {}));
            return;
        }
        context.$form.controller().dispatch(new CustomEvent(success, result));
    }
}

const FunctionRuntime = new FunctionRuntimeImpl();

export default FunctionRuntime;