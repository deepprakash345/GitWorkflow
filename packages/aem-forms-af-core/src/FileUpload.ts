/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

import {Change, propertyChange} from './controller/Controller';
import Field from './Field';
import {dataURItoBlob, getFileSizeInBytes} from './utils/FormUtils';
import {Constraints, isDataUrl} from './utils/ValidationUtils';
import {FieldModel} from './types';
import {FileObject} from './FileObject';
import DataGroup from './data/DataGroup';

function addNameToDataURL(dataURL: string, name: string) {
    return dataURL.replace(';base64', `;name=${encodeURIComponent(name)};base64`);
}

function processFiles(files : FileObject[]) {
    return Promise.all([].map.call(files, processFile));
}

async function processFile(file : FileObject) {
    const { name, size, mediaType} = file;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fileObj : FileObject = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => {
            resolve(new FileObject({
                // @ts-ignore
                data: addNameToDataURL(event.target.result, name),
                mediaType : mediaType,
                name,
                size
            }));
        };
        reader.readAsDataURL(file.data);
    });
    return fileObj;
}

/**
 * Implementation of FileUpload runtime model which extends from {@link Field | field}
 */
class FileUpload extends Field implements FieldModel {
    //private _files: FileObject[];

    protected _getDefaults() {
        return {
            ...super._getDefaults(),
            accept : ['audio/*', 'video/*', 'image/*', 'text/*', 'application/pdf'],
            maxFileSize : '2MB',
            type: 'file'
        };
    }

    private static extractFileInfo(files: string[] | string | File[]) : FileObject[] {
        return (files instanceof Array ? files : [files])
            .map((file: any) => {
                let retVal = null;
                if (file instanceof FileObject) {
                    retVal = file;
                } else if (typeof File !== 'undefined' && file instanceof File) {
                    // case: file object
                    retVal =  {
                        name: file.name,
                        mediaType: file.type,
                        size : file.size,
                        data : file
                    };
                } else if (typeof file === 'string' && isDataUrl(file as string)) {
                    // case: data URL
                    const {blob, name} = dataURItoBlob(file as string);
                    retVal =  {
                        name: name,
                        mediaType: blob.type,
                        size : blob.size,
                        data: blob
                    };
                } else {
                    // case: string as file object
                    let jFile = file;
                    try {
                        jFile = JSON.parse(file);
                        retVal = jFile;
                    } catch(ex) {
                        // do nothing
                    }
                    if (typeof jFile?.data === 'string' && isDataUrl(jFile?.data)) {
                        // case: data URL
                        const {blob} = dataURItoBlob(jFile?.data);
                        retVal =  {
                            name: jFile?.name,
                            mediaType: jFile?.type,
                            size : blob.size,
                            data: blob
                        };
                    } else if (typeof jFile === 'string') {
                        // case: data as external url
                        const fileName = jFile.split('/').pop();
                        retVal = {
                            name: fileName,
                            mediaType: 'application/octet-stream',  // todo: should we auto-deduce mime type based on file extension?
                            size : 0,
                            data: jFile
                        };
                    } else if (jFile instanceof Object) {
                        // todo: just added for ease of integration for the view layer
                        retVal = {
                            name : jFile?.name,
                            mediaType : jFile?.type,
                            size : jFile?.size,
                            data : jFile?.data
                        };
                    }
                }
                return new FileObject(retVal);
            });
    }

    /**
     * Returns the max file size in bytes as per IEC specification
     */
    get maxFileSize() {
        return getFileSizeInBytes(this._jsonModel.maxFileSize);
    }

    /**
     * Returns the list of mime types which file attachment can accept
     */
    get accept() {
        return this._jsonModel.accept;
    }

    /**
     * Checks whether there are any updates in the properties
     * @param propNames
     * @param updates
     * @private
     */
    protected _applyUpdates(propNames: string[], updates: any) {
        return propNames.reduce((acc: any, propertyName) => {
            //@ts-ignore
            const prevValue = this._jsonModel[propertyName];
            const currentValue = updates[propertyName];
            if (currentValue !== prevValue) {
                acc[propertyName] = {
                    propertyName,
                    currentValue,
                    prevValue
                };
                if (prevValue instanceof FileObject && typeof currentValue === 'object' && propertyName === 'value') {
                    // @ts-ignore
                    this._jsonModel[propertyName] = new FileObject({...prevValue, ...{'data' : currentValue.data}});
                } else {
                    // @ts-ignore
                    this._jsonModel[propertyName] = currentValue;
                }
            }
            return acc;
        }, {});
    }

    typeCheck(value: any) {
        const type = this._jsonModel.type || 'file';
        switch(type) {
            case 'string':
                return {valid: true, value: value};
            default:
                return Constraints.type(type, value);
        }
    }

    get value() {
        // @ts-ignore
        this.ruleEngine.trackDependency(this);
        if (this._jsonModel.value === undefined) {return null;}
        let val = this._jsonModel.value;
        // always return file object irrespective of data schema
        if (val != null) {
            // @ts-ignore
            val = this.coerce((val instanceof Array ? val : [val])
                .map(file => {
                    let retVal = file;
                    if (!(retVal instanceof FileObject)) {
                        retVal = new FileObject({
                            'name': file.name,
                            'mediaType': file.mediaType,
                            'size': file.size,
                            'data': file.data
                        });
                    }
                    // define serialization here
                    /*
                    Object.defineProperty(retVal, 'data', {
                        get: async function() {
                            if (file.data instanceof File) {
                                return processFile(file);
                            } else {
                                return file.data;
                            }
                        }
                    });
                    */
                    return retVal;
                }));
        }
        return val;
    }

    set value(value) {
        if (value !== undefined) {
            // store file list here
            const typeRes = this.typeCheck(value);
            const changes = this._setProperty('value', typeRes.value, false);
            let fileInfoPayload = FileUpload.extractFileInfo(value as any);
            fileInfoPayload = this.coerce(fileInfoPayload);
            this._setProperty('value', fileInfoPayload, false);
            if (changes.length > 0) {
                const dataNode = this.getDataNode();
                if (typeof dataNode !== 'undefined') {
                    let val: any = this._jsonModel.value;
                    const retVal = (val instanceof Array ? val : [val]).map(file => {
                        if (this.type === 'file' || this.type === 'file[]') {
                            return file;
                        } else if (this.type === 'string' || this.type === 'string[]') {
                            // @ts-ignore
                            return file.data.toString();
                        }
                    });
                    val = this.coerce(retVal);
                    dataNode.$value = val;
                }
                let updates;
                if (typeRes.valid) {
                    updates = this.evaluateConstraints();
                } else {
                    const changes = {
                        'valid': typeRes.valid,
                        'errorMessage': typeRes.valid ? '' : this.getErrorMessage('type')
                    };
                    updates = this._applyUpdates(['valid', 'errorMessage'], changes);
                }
                if (updates.valid) {
                    this.triggerValidationEvent(updates);
                }
                const changeAction = new Change({changes: changes.concat(Object.values(updates))});
                this.dispatch(changeAction);
            }
        }
    }

    private async _serialize() {
        const val = this._jsonModel.value;
        if (val === undefined) {return null;}
        // @ts-ignore
        const filesInfo = await processFiles(val instanceof Array ? val : [val]);
        return filesInfo;
    }

    private coerce(val: any) {
        let retVal = val;
        if ((this.type === 'string' || this.type === 'file') && retVal instanceof Array) {
            // @ts-ignore
            retVal = val[0];
        }
        return retVal;
    }

    importData(dataModel?:DataGroup) {
        this._bindToDataModel(dataModel);
        const dataNode = this.getDataNode();
        if (dataNode !== undefined) {
            const value = dataNode.$value;
            let newValue = value;
            // only if not undefined, proceed further
            if (value != null) {
                const fileObj: FileObject[] = FileUpload.extractFileInfo(value);
                newValue = this.coerce(fileObj);
                // is this needed ?
                this.form.getEventQueue().queue(this, propertyChange('value', newValue, this._jsonModel.value));
            }
            this._jsonModel.value = newValue;
        }
    }
}

export default FileUpload;
