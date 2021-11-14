import {Node} from '@aemforms/forms-next-expression-parser/dist/node';
import {Json} from '@aemforms/forms-next-expression-parser/dist/types';

export default class AFReservedReferenceNode implements Node {

    constructor(private name: string) {
        // do nothing
    }

    search(data: Json, context?: { [p: string]: Json }): Json {
        switch (this.name.toLowerCase()) {
            case 'form':
                return context?.$form || null;
            case 'field':
                return context?.$field || null;
            case 'event':
                return context?.$event || null;
        }
        return null;
    }
}

