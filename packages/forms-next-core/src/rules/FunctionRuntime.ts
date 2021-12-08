import {isFile, jsonString} from '../utils/JsonUtils';
import {CustomEvent, Submit} from '../controller/Controller';
import {request as fRequest, RequestOptions} from '../utils/Fetch';
import {FileObject} from '../FileObject';

declare var window: any;

type HTTP_VERB = 'GET' | 'POST'

export const request = async (context: any, uri: string,
                              httpVerb: HTTP_VERB, payload: object,
                              success: string, error: string,
                              payloadContentType: string = 'application/json') => {
    const endpoint = uri;
    let requestOptions: RequestOptions = {
        method: httpVerb
    };
    let result;
    try {
        if (payload && payload instanceof FileObject && payload.data instanceof File) {
            // todo: have to implement array type
            let formData = new FormData();
            formData.append(payload.name, payload.data);
            payload = formData;
        }
        if (payload && Object.keys(payload).length === 0) {
            if (payloadContentType.length > 0) {
                requestOptions.headers = {
                    'Content-Type': payloadContentType // this should match content type of the payload
                };
            }
        }
        result = await fRequest(endpoint, payload, requestOptions);
    } catch (e) {
        //todo: define error payload
        console.log('error handled');
        context.$form.dispatch(new CustomEvent(error, {}, true));
        return;
    }
    context.$form.dispatch(new CustomEvent(success, result, true));
};

export const submit = async (context: any, success: string, error: string) => {
    const endpoint = context.$form.metaData?.action;
    const data = jsonString(context.$form.getState().data);
    // todo: have to implement sending of attachments here
    const attachments = context.$form.getState().attachments;
    const formData = new FormData();
    formData.append(':data', data);
    formData.append(':contentType', 'application/json');
    const transformAttachment = (objValue: any, formData: any) : any => {
        let newValue = {
            ':name' : objValue.name,
            ':contentType' : objValue.mediaType,
            ':data' : objValue.data,
            ':bindRef' : objValue.dataRef
        };
        if (objValue?.data instanceof File) {
            let attIdentifier = `${objValue?.dataRef}/${objValue?.name}`;
            if (!attIdentifier.startsWith('/')) {
                attIdentifier = `/${attIdentifier}`;
            }
            formData.append(attIdentifier, objValue.data);
            newValue[':data'] = `#${attIdentifier}`;
        }
        return newValue;
    };
    // @ts-ignore
    let submitAttachments = Object.keys(attachments).reduce((acc, curr) => {
        const objValue = attachments[curr];
        if(objValue && objValue instanceof Array) {
            return [...acc, ...objValue.map((x)=>transformAttachment(x, formData))];
        } else {
            return [...acc, transformAttachment(objValue, formData)];
        }
    }, []);
    if (submitAttachments?.length > 0) {
        formData.append(':attachments', jsonString(submitAttachments));
    }
    // note: don't send multipart/form-data let browser decide on the content type
    await request(context, endpoint, 'POST', formData, success, error, '');
};

class FunctionRuntimeImpl {

    getFunctions () {
        return {
            validate : (context: any) => {
              return true;
            },

            get_data : (context : any) => {
                return context.$form.exportData();
            },

            submit_form: (context: any, success: string, error: string) => {
                const submit = new Submit({
                    success,
                    error
                });
                context.$form.dispatch(submit);
                return {};
            },

            // todo: only supports application/json for now
            request: (context: any, uri: string, httpVerb: HTTP_VERB, payload: object, success: string, error: string) => {
                request(context, uri, httpVerb, payload, success, error, 'application/json');
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
                    context.$form.dispatch(event);
                } else {
                    context.$form.getElement(element.$id).dispatch(event);
                }
                return {};
            }
        };
    }
}

const FunctionRuntime = new FunctionRuntimeImpl();

export default FunctionRuntime;