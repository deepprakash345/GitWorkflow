import {jsonString} from '../utils/JsonUtils';
import {CustomEvent, Submit} from '../controller/Controller';
import {request as fRequest, RequestOptions} from '../utils/Fetch';

declare var window: any;

type HTTP_VERB = 'GET' | 'POST'

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
            // todo: only supports application/json for now
            request: (context: any, uri: string, httpVerb: HTTP_VERB, payload: object, success: string, error: string) => {
                this.request(context, uri, httpVerb, payload, success, error, 'application/json');
                return {};
            },
            dispatch_event: (context: any, element: any, eventName: string | any, payload?: any) => {
                let dispatch = false;
                if (typeof element === 'string') {
                    payload = eventName;
                    eventName = element;
                    dispatch = true;
                }
                const event = new CustomEvent(eventName, payload, dispatch);
                if (typeof element === 'string') {
                    context.$form.controller().dispatch(event);
                } else {
                    element.controller().dispatch(event);
                }
                return {};
            }
        };
    }

    async request(context: any, uri: string, httpVerb: HTTP_VERB, payload: object, success: string, error: string, payloadContentType: string = 'application/json') {
        const endpoint = uri;
        let requestOptions: RequestOptions = {
            method: httpVerb
        };
        let result;
        try {
            if (payload && Object.keys(payload).length === 0) {
                requestOptions.headers = {
                    'Content-Type': payloadContentType // this should match content type of the payload
                };
            }
            result = await fRequest(endpoint, payload, requestOptions);
        } catch (e) {
            //todo: define error payload
            console.log('error handled');
            context.$form.controller().dispatch(new CustomEvent(error, {}, true));
            return;
        }
        context.$form.controller().dispatch(new CustomEvent(success, result, true));
    }

    private validate (context: any) {
        return true;
    }

    private getData (context: any) {
        return context.$form.controller().getState().data;
    }

    async submit(context: any, success: string, error: string) {
        // todo have to implement validate here
        this.validate(context);
        const endpoint = context.$form.metaData?.action;
        const data = jsonString(this.getData(context));
        const formData = new FormData();
        formData.append(':data', data);
        formData.append(':contentType', 'application/json');
        await this.request(context, endpoint, 'POST', formData, success, error, 'multipart/form-data');
    }
}

const FunctionRuntime = new FunctionRuntimeImpl();

export default FunctionRuntime;