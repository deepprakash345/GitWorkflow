import {getProperty} from './utils/JsonUtils';
import {FormMetaDataModel, MetaDataJson} from './Types';

class FormMetaData implements FormMetaDataModel {

    public constructor (params: MetaDataJson) {
        this._action = getProperty(params, 'action', '');
        this._version = getProperty(params, 'version', '');
        this._locale = getProperty(params, 'locale', '');
        this._grammarVersion = getProperty(params, 'grammarVersion', '');
        this._dataUrl = getProperty(params, 'dataUrl', '');
    }

    get version(): string {
        return this._version;
    }

    set version(value: string) {
        this._version = value;
    }
    get locale(): string {
        return this._locale;
    }

    set locale(value: string) {
        this._locale = value;
    }
    get grammarVersion(): string {
        return this._grammarVersion;
    }

    set grammarVersion(value: string) {
        this._grammarVersion = value;
    }
    get dataUrl(): string {
        return this._dataUrl;
    }

    set dataUrl(value: string) {
        this._dataUrl = value;
    }
    get action(): string {
        return this._action;
    }

    set action(value: string) {
        this._action = value;
    }

    private _action: string;
    private _dataUrl: string;
    private _grammarVersion: string;
    private _locale: string;
    private _version: string;
}

export default FormMetaData;
