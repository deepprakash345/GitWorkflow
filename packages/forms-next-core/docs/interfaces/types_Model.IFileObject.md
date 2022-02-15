# Interface: IFileObject

[types/Model](../modules/types_Model.md).IFileObject

Defines file object interface.

## Implemented by

- [`FileObject`](../classes/FileObject.FileObject-1.md)

## Table of contents

### Properties

- [data](types_Model.IFileObject.md#data)
- [mediaType](types_Model.IFileObject.md#mediatype)
- [name](types_Model.IFileObject.md#name)
- [size](types_Model.IFileObject.md#size)

## Properties

### data

• `Optional` **data**: `any`

Data of the file attachment. It can be uri or any file interface specific to channel (in web, it is file object).

___

### mediaType

• **mediaType**: `string`

Media type of the file data

___

### name

• **name**: `string`

Name of the file

___

### size

• `Optional` **size**: `number`

Size of the file binary as per iec specification.
