import {Node} from '@adobe/forms-next-expression-parser/dist/node';
import {JSONValue} from '@adobe/forms-next-expression-parser/dist/types';
import {getProperty} from '../utils/JsonUtils';

export class AFPropertyNode implements Node {

    constructor(private name: string) {
        console.log('accessing property node ' + name);
    }

    search(data: JSONValue): JSONValue {
        if (':items' in data && !this.name.startsWith(':') && this.name in data[':items']) {
            return data[':items'][this.name];
        } else {
            return getProperty(data, this.name, null);
        }
    }
}