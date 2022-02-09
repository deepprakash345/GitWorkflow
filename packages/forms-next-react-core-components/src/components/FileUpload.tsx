import FileUpload from './fileupload/FileUpload';
import {FieldJson} from '@aemforms/forms-next-core/lib';
import {useRenderer} from '@aemforms/forms-next-react-bindings';
import React from 'react';
import {baseConvertor, combineConvertors, constraintConvertor, withErrorMessage} from '../utils/SpectrumMappers';
import {FileObject} from '@aemforms/forms-next-core/lib/FileObject';
import {getFileSizeInBytes} from '@aemforms/forms-next-core/lib/utils/FormUtils';

const mapper = combineConvertors(baseConvertor, constraintConvertor, (a, b) => {
    // @ts-ignore
    let val = a.value && ((a.value as any instanceof Array) ? a.value : [a.value]).map((x: FileObject) => {
        if (x.data instanceof Blob) {
            return new File([x.data], x.name);
        } else {
            const renameKeys = (obj: FileObject, newKeys: any) => {
                const keyValues = Object.keys(obj).map(key => {
                    const newKey = newKeys[key] || key;
                    // @ts-ignore
                    return { [newKey]: obj[key] };
                });
                return Object.assign({}, ...keyValues);
            };
            const newKeys = { 'mediaType': 'type'};
            return renameKeys(x, newKeys);
        }
    }).reduce((a: any, v: { name: any; }) => ({ ...a, [`${v.name}${Math.floor(Math.random() * 10000) + 1}`]: v}), {});
    return {
        isReadOnly : a.readOnly === true,
        isRequired : a.required === true,
        updateFiles : b.dispatchChange,
        maxFileSizeInBytes : getFileSizeInBytes(a.maxFileSize),
        default : val,
        ...(a.type && (a.type == 'file[]' || a.type == 'string[]') && {
            multiple: true
        })
    };
});

const FileUploadWrapper = (props: any) => {
    const handleChange = (files: File[]) => {
        // todo: this can be array of mixed types (ie) Array<File | FileObject>
        props.updateFiles(files);
    };
    return <FileUpload {...props} updateFilesCb={handleChange}/>;
};

const FileUploadComponent = function (originalProps: FieldJson & {id: string}) {
    return useRenderer(originalProps, FileUploadWrapper, mapper, true);
};


export default FileUploadComponent;