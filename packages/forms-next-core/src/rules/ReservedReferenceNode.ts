import {Node} from '@adobe/forms-next-expression-parser/dist/node';
import {JSONValue} from '@adobe/forms-next-expression-parser/dist/types';

export default class AFReservedReferenceNode implements Node {

    constructor(private form: any, private field: any, private name: string) {
        // do nothing
    }

    search(data: JSONValue, references?: { [p: string]: JSONValue }, event?: JSONValue): JSONValue {
        switch (this.name.toLowerCase()) {
            // we might consider converting a reservedRef to a namedRef if an reserved name does not exist.
            case 'event':
                return event;
            case 'field':
                return this.field;
            case 'form':
                return this.form;
        }
        return;
    }
}

