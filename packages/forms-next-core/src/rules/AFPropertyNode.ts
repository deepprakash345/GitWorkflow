import {Node} from '@adobe/forms-next-expression-parser/dist/node';
import {Json} from '@adobe/forms-next-expression-parser/dist/types';
import {getProperty} from '../utils/JsonUtils';

export class AFPropertyNode implements Node {

    constructor(private name: string) {
    }

    search(data: Json): Json {
        if (data == null) {
            return null;
        }
        if (typeof data === 'object') {
            const obj = data as any;
            if ('items' in obj && this.name in obj.items) {
                return obj['items'][this.name];
            } else {
                return getProperty(obj, this.name, null);
            }
        }
        return null;
    }
}