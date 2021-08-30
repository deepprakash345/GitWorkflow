import {FormMetaDataModel, MetaDataJson} from './Types';
import Node from './Node';
class FormMetaData extends Node<MetaDataJson> implements FormMetaDataModel {

    get version(): string {
        return this.getP(':version', '');
    }

    get locale(): string {
        return this.getP(':locale', '');
    }

    get grammarVersion(): string {
        return this.getP(':grammarVersion', '');
    }

    get dataUrl(): string {
        return this.getP(':dataUrl', '');
    }

    get action(): string {
        return this.getP(':action', '');
    }

}

export default FormMetaData;
