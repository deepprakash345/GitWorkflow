import FileUpload from './fileupload/FileUpload';
import {FieldJson} from '@aemforms/forms-next-core/lib';
import {useRenderer} from '../react-mapper/hooks';
import React from 'react';
import {baseConvertor, combineConvertors, constraintConvertor} from '../utils/SpectrumMappers';


const mapper = combineConvertors(baseConvertor, constraintConvertor, (a, b) => {
    return {
        isReadOnly : a.readOnly === true,
        updateFiles : b.dispatchChange,
        maxFileSizeInBytes : a.maxFileSize,
        ...(a.type && (a.type == 'file[]' || a.type == 'string[]') && {
            multiple: true
        })
    };
});

const FileUploadWrapper = (props: any) => {
    const handleChange = (files: File[]) => {
        props.updateFiles(files);
    };
    return <FileUpload {...props} updateFilesCb={handleChange}/>;
};



const FileUploadComponent = function (originalProps: FieldJson) {
    return useRenderer(originalProps, mapper, FileUploadWrapper);
};


export default FileUploadComponent;