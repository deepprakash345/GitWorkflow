import {Node} from '@adobe/forms-next-expression-parser/dist/node';
import {JSONValue} from '@adobe/forms-next-expression-parser/dist/types';
import {getProperty} from '../utils/JsonUtils';

export class AFPropertyNode implements Node {

    constructor(private name: string) {
    }

    search(data: JSONValue): JSONValue {
        if (data == null) {
            return null;
        }
        if (typeof data === 'object') {
            if (':items' in data && !this.name.startsWith(':') && this.name in data[':items']) {
                return data[':items'][this.name];
            } else {
                return getProperty(data, this.name, null);
            }
        }
        return null;
    }
}