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

import FileUpload from './fileupload/FileUpload';
import {FieldJson, State} from '@adobe/aem-forms-af-core';
import {useRenderer} from '@adobe/aem-forms-af-super-component';
import React from 'react';
import {baseConvertor, combineConvertors, constraintConvertor} from '../utils/SpectrumMappers';
import {FileObject} from '@adobe/aem-forms-af-core';
import {getFileSizeInBytes} from '@adobe/aem-forms-af-core';

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

const FileUploadComponent = function (originalProps: State<FieldJson>) {
    return useRenderer(originalProps, FileUploadWrapper, mapper, true);
};


export default FileUploadComponent;