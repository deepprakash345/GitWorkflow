import {resolve} from './utils/JsonUtils';
import {Change, propertyChange} from './controller/Controller';
import Field from './Field';
import {dataURItoBlob, getFileSizeInBytes} from './utils/FormUtils';
import {isDataUrl} from './utils/ValidationUtils';
import {FieldModel} from './types';
import {FileObject} from './FileObject';
import DataGroup from './data/DataGroup';

//todo: move to a single place in Model.ts or Json.ts
const defaults = {
    accept : ['audio/*', 'video/*', 'image/*', 'text/*', 'application/pdf'],
    maxFileSize : '2MB'
};

function addNameToDataURL(dataURL: string, name: string) {
    return dataURL.replace(';base64', `;name=${encodeURIComponent(name)};base64`);
}

function processFiles(files : FileObject[]) {
    return Promise.all([].map.call(files, processFile));
}

async function processFile(file : FileObject) {
    const { name, size, mediaType} = file;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let fileObj : FileObject = await new Promise((resolve, reject) => {
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

class FileUpload extends Field implements FieldModel {
    //private _files: FileObject[];

    protected _applyDefaults() {
        super._applyDefaults();
        Object.entries(defaults).map(([key, value]) => {
            //@ts-ignore
            if (this._jsonModel[key] === undefined) {
                //@ts-ignore
                this._jsonModel[key] = value;
            }
        });
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
                        const {blob, name} = dataURItoBlob(jFile?.data);
                        retVal =  {
                            name: jFile?.name,
                            mediaType: jFile?.type,
                            size : blob.size,
                            data: blob
                        };
                    } else if (typeof jFile === 'string') {
                        // case: data as external url
                        let fileName = jFile.split('/').pop();
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

    get maxFileSize() {
        return getFileSizeInBytes(this._jsonModel.maxFileSize);
    }

    get accept() {
        return this._jsonModel.accept;
    }

    get value() {
        // @ts-ignore
        this.ruleEngine.trackDependency(this);
        if (this._jsonModel.value === undefined) return null;
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

    set value(payload) {
        if (payload !== undefined) {
            // store file list here
            let fileInfoPayload = FileUpload.extractFileInfo(payload as any);
            fileInfoPayload = this.coerce(fileInfoPayload);
            const res = this.checkInput(fileInfoPayload);
            if (res.value !== this._jsonModel.value) {
                const curr = this._jsonModel.value;
                this._jsonModel.valid = res.valid;
                this._jsonModel.errorMessage = res.errorMessage;
                this._jsonModel.value = res.value;
                const changeAction = propertyChange('value', res.value, curr);
                this.dispatch(changeAction);
                this.form.getEventQueue().runPendingQueue();
                const dataNode = this.getDataNode();
                if (typeof dataNode !== 'undefined') {
                    let val : any = this._jsonModel.value;
                    let retVal = (val instanceof Array ? val : [val]).map(file => {
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
            }
        }
    }

    private async _serialize() {
        let val = this._jsonModel.value;
        if (val === undefined) return null;
        // @ts-ignore
        let filesInfo = await processFiles(val instanceof Array ? val : [val]);
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
                let fileObj: FileObject[] = FileUpload.extractFileInfo(value);
                newValue = this.coerce(fileObj);
                // is this needed ?
                this.form.getEventQueue().queue(this, propertyChange('value', newValue, this._jsonModel.value));
            }
            this._jsonModel.value = newValue;
        }
    }
}

export default FileUpload;
