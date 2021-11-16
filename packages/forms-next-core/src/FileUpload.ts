import {FieldModel, FileObject} from './types';
import {resolve} from './utils/JsonUtils';
import {Change} from './controller/Controller';
import Field from './Field';
import {dataURItoBlob} from './utils/FormUtils';

//todo: move to a single place in Model.ts or Json.ts
const defaults = {
    accept : ['audio/*', 'video/*', 'image/*', 'text/*', 'application/pdf'],
    maxFileSize : 200000000
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
            resolve({
                // @ts-ignore
                data: addNameToDataURL(event.target.result, name),
                name,
                size,
                mediaType : mediaType
            });
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

    private static extractFileInfo(files: string[] | File[]) : FileObject[] {
        return files
            .map((file: any) => {
                if (file instanceof File) {
                    // case: file object
                    return {
                        name: file.name,
                        mediaType: file.type,
                        size : file.size,
                        data : file
                    };
                } else {
                    // case: data URL
                    const {blob, name} = dataURItoBlob(file);
                    return {
                        name: name,
                        mediaType: blob.type,
                        size : blob.size,
                        data: blob
                    };
                }
            });
    }

    get maxFileSize() {
        return this._jsonModel.maxFileSize;
    }

    get accept() {
        return this._jsonModel.accept;
    }

    get value() {
        // @ts-ignore
        this.ruleEngine.trackDependency(this);
        if (this._jsonModel.value === undefined) return null;
        let that = this,
            val = this._jsonModel.value;
        // based on type, serialize
        if (val != null) {
            // @ts-ignore
            val = this.coerce((val instanceof Array ? val : [val])
                    .map(file => {
                        if (that.type === 'file' || that.type === 'file[]') {
                            return {
                                'name' : file.name, 
                                'mediaType' : file.mediaType, 
                                'size' : file.size
                            };
                        } else if (that.type === 'string' || that.type === 'string[]') {
                            // @ts-ignore
                            return file.name;
                        }
                    }));
        }
        return val;
    }

    private async _serialize() {
        let that = this,
            val = this._jsonModel.value;
        if (val === undefined) return null;
        // @ts-ignore
        let filesInfo = await processFiles(val instanceof Array ? val : [val]);
        return filesInfo
                .map(file => {
                    if (that.type === 'file' || that.type === 'file[]') {
                        return file;
                    } else if (that.type === 'string' || that.type === 'string[]') {
                        // @ts-ignore
                        return file.data;
                    }
                });
    }

    private coerce(val: any) {
        let retVal = val;
        if ((this.type === 'string' || this.type === 'file') && val instanceof Array) {
            // @ts-ignore
            retVal = val[0];
        }
        return retVal;
    }

    protected handleValueChange(payload: any) {
        if (payload !== undefined) {
            // store file list here
            let fileInfoPayload = FileUpload.extractFileInfo(payload);
            fileInfoPayload = this.coerce(fileInfoPayload);
            return this.checkInput(fileInfoPayload);
        }
        return {};
    }

    // @ts-ignore
    async exportData(dataModel: any) {
        let val = await this._serialize();
        val = this.coerce(val);
        if (this.dataRef != 'none' && this.dataRef !== undefined) {
            resolve(dataModel, this.dataRef, val);
        } else if (this.dataRef !== 'none') {
            return val;
        }
    }


    importData(dataModel: any, parentDataModel: any) {
        let data: any;
        const name = this.name || '';
        if (this.dataRef != 'none' && this.dataRef !== undefined) {
            data = resolve(dataModel, this.dataRef);
        } else if (this.dataRef !== 'none' && name.length > 0) {
            data = resolve(parentDataModel, name);
        }
        if (data !== undefined) {
            // todo: have to implement this
            this.controller.queueEvent(new Change(FileUpload.extractFileInfo(data)));
        }
    }
}

export default FileUpload;
