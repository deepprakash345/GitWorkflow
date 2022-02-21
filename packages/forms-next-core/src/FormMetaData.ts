import {FormMetaDataModel, MetaDataJson} from './types';
import Node from './Node';

/**
 * Defines form metadata which implements {@link FormMetaDataModel | Form MetaData Model}
 */
class FormMetaData extends Node<MetaDataJson> implements FormMetaDataModel {

    get version(): string {
        return this.getP('version', '');
    }

    get locale(): string {
        return this.getP('locale', '');
    }

    get grammar(): string {
        return this.getP('grammar', '');
    }
}

export default FormMetaData;
