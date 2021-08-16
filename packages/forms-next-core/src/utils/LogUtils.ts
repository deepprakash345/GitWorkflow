import {callbackFn} from '../controller/Controller';

export const logFormCallbacks = (callbacks: {[key: string] : callbackFn[]}) => {
    const s = Object.entries(callbacks).map(([id, fn]) => {
        return `${id} : ${fn.length}`;
    }).join(' ');
    console.log(s);
};