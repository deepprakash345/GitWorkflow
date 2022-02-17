# Class: FileObject

[FileObject](../modules/FileObject.md).FileObject

Defines a file object which implements the [file object interface](../interfaces/FormModel.IFileObject.md)

## Implements

- [`IFileObject`](../interfaces/FormModel.IFileObject.md)

## Table of contents

### Constructors

- [constructor](FileObject.FileObject-1.md#constructor)

### Properties

- [data](FileObject.FileObject-1.md#data)
- [mediaType](FileObject.FileObject-1.md#mediatype)
- [name](FileObject.FileObject-1.md#name)
- [size](FileObject.FileObject-1.md#size)

### Methods

- [toJSON](FileObject.FileObject-1.md#tojson)

## Constructors

### constructor

• **new FileObject**(`init?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `init?` | `Partial`<[`FileObject`](FileObject.FileObject-1.md)\> |

## Properties

### data

• **data**: `any`

Data of the file attachment. It can be uri or any file interface specific to channel (in web, it is file object).

#### Implementation of

[IFileObject](../interfaces/FormModel.IFileObject.md).[data](../interfaces/FormModel.IFileObject.md#data)

___

### mediaType

• **mediaType**: `string` = `'application/octet-stream'`

Media type of the file data

#### Implementation of

[IFileObject](../interfaces/FormModel.IFileObject.md).[mediaType](../interfaces/FormModel.IFileObject.md#mediatype)

___

### name

• **name**: `string` = `'unknown'`

Name of the file

#### Implementation of

[IFileObject](../interfaces/FormModel.IFileObject.md).[name](../interfaces/FormModel.IFileObject.md#name)

___

### size

• **size**: `number` = `0`

Size of the file binary as per iec specification.

#### Implementation of

[IFileObject](../interfaces/FormModel.IFileObject.md).[size](../interfaces/FormModel.IFileObject.md#size)

## Methods

### toJSON

▸ **toJSON**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `mediaType` | `string` |
| `name` | `string` |
| `size` | `number` |
