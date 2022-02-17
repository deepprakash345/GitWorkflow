/**
 * @module
 * @private
 */

import {getProperty} from './utils/JsonUtils';

/**
 * Defines generic form object class which any form runtime model (like textbox, checkbox etc)
 * should extend from.
 * @typeparam T type of the node (for example, {@link MetaDataJson | form meta data}
 */
class Node<T> {

    protected _jsonModel: T

    constructor (inputModel: T) {
        this._jsonModel = {
            ...inputModel
        };
    }

    protected getP<S>(key: string, def: S): S {
        return getProperty(this._jsonModel, key, def);
    }

    get isContainer() {
        return false;
    }

}

export default Node;
