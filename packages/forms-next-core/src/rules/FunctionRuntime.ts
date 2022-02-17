/**
 * Implementation of function runtime in rule engine
 */
import {jsonString} from '../utils/JsonUtils';
import {AddItem, Change, Click, CustomEvent, RemoveItem, Submit} from '../controller/Controller';
import {request as fRequest, RequestOptions} from '../utils/Fetch';
import {FileObject} from '../FileObject';
import {getAttachments} from '../utils/FormUtils';

type HTTP_VERB = 'GET' | 'POST'

/**
 * Implementation of generic request API. This API can be used to make external web request
 * @param context                   expression execution context(consists of current form, current field, current event)
 * @param uri                       request URI
 * @param httpVerb                  http verb (for example, GET or POST)
 * @param payload                   request payload
 * @param success                   success handler
 * @param error                     error handler
 * @param payloadContentType        content type of the request
 * @private
 */
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
        context.form.dispatch(new CustomEvent(error, {}, true));
        return;
    }
    context.form.dispatch(new CustomEvent(success, result, true));
};

/**
 * Create multi part form data using form data and form attachments
 * @param data              form data
 * @param attachments       form events
 * @private
 */
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
    const endpoint = context.form.action;
    let data = input_data;
    if (typeof data != 'object' || data == null) {
        data = context.form.exportData();
    }
    // todo: have to implement sending of attachments here
    const attachments = getAttachments(context.$form);
    let submitContentType: string = submitAs;
    let formData: any;
    //if (Object.keys(attachments).length > 0) {
    //    multipartFormData(jsonString(data), attachments);
    //    submitContentType = 'multipart/form-data';
    //} else {
    formData = {':data' : data};
    submitContentType = 'application/json';
    //}
    // note: don't send multipart/form-data let browser decide on the content type
    await request(context, endpoint, 'POST', formData, success, error, submitContentType);
};

/**
 * Helper function to create an action
 * @param name          name of the event
 * @param payload       event payload
 * @param dispatch      true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
 * @private
 */
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

/**
 * Implementation of function runtime
 * @private
 */
class FunctionRuntimeImpl {

    getFunctions () {
        // todo: remove these once json-formula exposes a way to call them from custom functions
        function isArray(obj: unknown) {
            if (obj !== null) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            }
            return false;
        }

        function valueOf(a: any): any {
            if (a === null || a === undefined) return a;
            if (isArray(a)) {
                return (a as []).map(i => valueOf(i));
            }
            return a.valueOf();
        }

        function toString(a: any): string {
            if (a === null || a === undefined) return '';
            return a.toString();
        }

        return {
            validate : {
                _func:  () => {
                    return true;
                },
                _signature: []
            },
            get_data : {
                _func: (args: unknown, data: unknown, interpreter: any) => {
                    return interpreter.globals.form.exportData();
                },
                _signature: []
            },
            submit_form: {
                _func: (args: Array<unknown>, data: unknown, interpreter: any) => {
                    // success: string, error: string, submit_as: 'json' | 'multipart' = 'json', data: any = null
                    const success: string = toString(args[0]);
                    const error: string = toString(args[1]);
                    const submit_as = args.length > 2 ? toString(args[2]) : 'json';
                    const submit_data = args.length > 3 ? valueOf(args[3]) : null;
                    interpreter.globals.form.dispatch(new Submit({
                        success,
                        error,
                        submit_as,
                        data: submit_data
                    }));
                    return {};
                },
                _signature: []
            },
            // todo: only supports application/json for now
            request: {
                _func: (args: Array<unknown>, data: unknown, interpreter: any) => {
                    const uri: string = toString(args[0]);
                    const httpVerb: HTTP_VERB = toString(args[1]) as HTTP_VERB;
                    const payload: object = valueOf(args[2]);
                    const success: string = valueOf(args[3]);
                    const error: string = valueOf(args[4]);
                    request(interpreter.globals, uri, httpVerb, payload, success, error, 'application/json');
                    return {};
                },
                _signature: []
            },
            dispatch_event: {
                _func: (args: Array<unknown>, data: unknown, interpreter: any) => {
                    const element: any = args[0];
                    let eventName: string | any = valueOf(args[1]);
                    let payload: any = args.length > 2 ? valueOf(args[2]) : undefined;
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
                            interpreter.globals.form.dispatch(event);
                        } else {
                            interpreter.globals.form.getElement(element.id).dispatch(event);
                        }
                    }
                    return {};
                },
                _signature: []
            }
        };
    }
}

const FunctionRuntime = new FunctionRuntimeImpl();

export default FunctionRuntime;