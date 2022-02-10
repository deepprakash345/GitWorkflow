import {FormMetaDataModel, MetaDataJson} from './types';
import Node from './Node';
class FormMetaData extends Node<MetaDataJson> implements FormMetaDataModel {

    get version(): string {
        return this.getP('version', '');
    }

    get locale(): string {
        return this.getP('locale', '');
    }

    get grammarVersion(): string {
        return this.getP('grammarVersion', '');
    }
}

export default FormMetaData;
