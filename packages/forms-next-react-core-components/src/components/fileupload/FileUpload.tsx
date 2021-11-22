import React, {useEffect, useRef, useState} from 'react';
import {
    FileUploadContainer,
    FormField,
    DragDropText,
    UploadFileBtn,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    PreviewList,
    FileMetaData,
    RemoveFileIcon,
    InputLabel
} from './FileUpload.styles';

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000000;

const convertNestedObjectToArray = (nestedObj: { [x: string]: any; }) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes: number) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
                        // @ts-ignore
                        label,
                        // @ts-ignore
                        updateFilesCb,
                        maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
                        ...otherProps
                    }) => {
    const fileInputField = useRef(null);

    const handleUploadBtnClick = () => {
        // @ts-ignore
        fileInputField.current.click();
    };

    const addNewFiles = (newFiles: any) => {
        for (let file of newFiles) {
            if (file.size <= maxFileSizeInBytes) {
                if (!otherProps.multiple) {
                    return { file };
                }
                // @ts-ignore
                files[file.name] = file;
            }
        }
        return { ...files };
    };

    const callUpdateFilesCb = (files : File[]) => {
        const filesAsArray = convertNestedObjectToArray(files);
        updateFilesCb(filesAsArray);
    };

    const [files, setFiles] = useState({});
    // add the default values to the initial files checking the size
    useEffect(() => {
        if (otherProps?.default != null) {
            let updatedFiles: any = addNewFiles(convertNestedObjectToArray(otherProps?.default));
            setFiles(updatedFiles);
            callUpdateFilesCb(updatedFiles);
        }
    }, []);

    const handleNewFileUpload = (e: { target: { files: any; }; }) => {
        const { files: newFiles } = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            // @ts-ignore
            callUpdateFilesCb(updatedFiles);
        }
    };

    const removeFile = (fileName: string) => {
        // @ts-ignore
        delete files[fileName];
        setFiles({ ...files });
        // @ts-ignore
        callUpdateFilesCb({ ...files });
    };

    return (
        <>
            <FileUploadContainer>
                <InputLabel>{label}</InputLabel>
                <DragDropText>Drag and drop your files anywhere or</DragDropText>
                <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
                    <i className="fas fa-file-upload" />
                    <span> Upload {otherProps.multiple ? 'files' : 'a file'}</span>
                </UploadFileBtn>
                <FormField
                    type="file"
                    ref={fileInputField}
                    onChange={handleNewFileUpload}
                    defaultValue=""
                    disabled={otherProps.isReadOnly || otherProps.isDisabled}
                    required={otherProps.isRequired}
                    title=""
                    {...otherProps}
                />
            </FileUploadContainer>
            <FilePreviewContainer>
                <span>To Upload</span>
                <PreviewList>
                    {Object.keys(files).map((fileName, index) => {
                        // @ts-ignore
                        let file = files[fileName];
                        let isImageFile = file.type?.split('/')[0] === 'image';
                        return (
                            <PreviewContainer key={fileName}>
                                <div>
                                    {isImageFile && file instanceof File &&  (
                                        <ImagePreview
                                            src={URL?.createObjectURL(file)}
                                            alt={`file preview ${index}`}
                                        />
                                    )}
                                    <FileMetaData className="file-metadata" isImageFile={isImageFile}>
                                        <span>{file.name}</span>
                                        <aside>
                                            <span>{convertBytesToKB(file.size)} kb</span>
                                            <RemoveFileIcon
                                                className="fas fa-trash-alt"
                                                onClick={() => removeFile(fileName)}
                                            />
                                        </aside>
                                    </FileMetaData>
                                </div>
                            </PreviewContainer>
                        );
                    })}
                </PreviewList>
            </FilePreviewContainer>
        </>
    );
};

export default FileUpload;