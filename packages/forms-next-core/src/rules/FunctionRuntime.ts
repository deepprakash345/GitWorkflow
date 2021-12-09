import {jsonString} from '../utils/JsonUtils';
import {AddItem, Change, Click, CustomEvent, RemoveItem, Submit} from '../controller/Controller';
import {request as fRequest, RequestOptions} from '../utils/Fetch';
import {FileObject} from '../FileObject';
import {getAttachments} from '../utils/FormUtils';

type HTTP_VERB = 'GET' | 'POST'

export const request = async (context: any,
                       uri: string,
                       httpVerb: HTTP_VERB,
                       payload: object,
                       success: string,
                       error: string,
                       payloadContentType: string = 'application/json') => {
    const endpoint = uri;
    let requestOptions: RequestOptions = {
        method: httpVerb
    };
    let result;
    let inputPayload: any;
    try {
        if (payload && payload instanceof FileObject && payload.data instanceof File) {
            // todo: have to implement array type
            let formData = new FormData();
            formData.append(payload.name, payload.data);
            inputPayload = formData;
        } else if (payload && typeof payload === 'object' && Object.keys(payload).length > 0) {
            if (payloadContentType.length > 0) {
                requestOptions.headers = {
                    'Content-Type': payloadContentType // this should match content type of the payload
                };
            }
            inputPayload = JSON.stringify(payload);
        }
        result = await fRequest(endpoint, inputPayload, requestOptions);
    } catch (e) {
        //todo: define error payload
        console.log('error handled');
        context.$form.dispatch(new CustomEvent(error, {}, true));
        return;
    }
    context.$form.dispatch(new CustomEvent(success, result, true));
};

const multipartFormData = (data: any, attachments: any) => {
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
    return formData;
};

export const submit = async (context: any,
                      success: string,
                      error: string,
                      submitAs: 'json' | 'multipart' = 'json',
                      input_data: any = null) => {
    const endpoint = context.$form.metaData?.action;
    let data = input_data;
    if (typeof data != 'object' || data == null) {
        data = context.$form.exportData();
    }
    // todo: have to implement sending of attachments here
    const attachments = getAttachments(context.$form);
    let submitContentType: string = submitAs;
    let formData: any;
    if (Object.keys(attachments).length > 0) {
        multipartFormData(jsonString(data), attachments);
        submitContentType = 'multipart/form-data';
    } else {
        formData = {':data' : data};
        submitContentType = 'application/json';
    }
    // note: don't send multipart/form-data let browser decide on the content type
    await request(context, endpoint, 'POST', formData, success, error, submitContentType);
};

const createAction = (name: string, payload: any = {}, dispatch: boolean = false)  => {
    switch (name) {
        case 'change':
            return new Change(payload);
        case 'submit':
            return new Submit(payload);
        case 'click':
            return new Click(payload);
        case 'addItem':
            return new AddItem(payload);
        case 'removeItem':
            return new RemoveItem(payload);
        default:
            console.error('invalid action');
    }
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
            submit_form: (context: any,  success: string, error: string, submit_as: 'json' | 'multipart' = 'json', data: any = null) => {
                submit(context, success, error, submit_as, data);
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
                let event;
                if (eventName.startsWith('custom:')) {
                    event = new CustomEvent(eventName.substring('custom:'.length), payload, dispatch);
                } else {
                    event = createAction(eventName, payload, dispatch);
                }
                if (event != null) {
                    if (typeof element === 'string') {
                        context.$form.dispatch(event);
                    } else {
                        context.$form.getElement(element.$id).dispatch(event);
                    }
                }
                return {};
            }
        };
    }


}

const FunctionRuntime = new FunctionRuntimeImpl();

export default FunctionRuntime;