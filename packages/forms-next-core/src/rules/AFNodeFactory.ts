import {NodeFactory, Node} from '@adobe/forms-next-expression-parser/dist/node';
import {AFPropertyNode} from './AFPropertyNode';
import AFReservedReferenceNode from './ReservedReferenceNode';

export default class AFNodeFactory extends NodeFactory {

    constructor(private form?: any, private field?: any) {
        super();
    }

    createPropertyNode(name: string): Node {
        return new AFPropertyNode(name);
    }

    createReservedReference(name: string): Node {
        return new AFReservedReferenceNode(this.form, this.field, name);
    }
}