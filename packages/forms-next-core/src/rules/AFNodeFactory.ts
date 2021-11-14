import {Node} from '@aemforms/forms-next-expression-parser/dist/node';
import {DefaultNodeFactory} from '@aemforms/forms-next-expression-parser/dist/node/nodeFactory';
import {AFPropertyNode} from './AFPropertyNode';
import AFReservedReferenceNode from './ReservedReferenceNode';

export default class AFNodeFactory extends DefaultNodeFactory {

    createPropertyNode(name: string): Node {
        return new AFPropertyNode(name);
    }

    createReservedReference(name: string): Node {
        return new AFReservedReferenceNode(name);
    }
}