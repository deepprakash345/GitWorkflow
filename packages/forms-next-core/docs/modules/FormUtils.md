# Module: FormUtils

Defines generic utilities to interact with form runtime model

## Table of contents

### Functions

- [dataURItoBlob](FormUtils.md#datauritoblob)
- [getAttachments](FormUtils.md#getattachments)
- [getFileSizeInBytes](FormUtils.md#getfilesizeinbytes)
- [randomWord](FormUtils.md#randomword)
- [sizeToBytes](FormUtils.md#sizetobytes)

## Functions

### dataURItoBlob

▸ `Const` **dataURItoBlob**(`dataURI`): `Object`

Utility to convert data URI to a `blob` object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataURI` | `string` | uri to convert to blob |

#### Returns

`Object`

`Blob` object for the data URI

| Name | Type |
| :------ | :------ |
| `blob` | `Blob` |
| `name` | `string` |

___

### getAttachments

▸ `Const` **getAttachments**(`input`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`ContainerModel`](../interfaces/FormModel.ContainerModel.md) |

#### Returns

`any`

___

### getFileSizeInBytes

▸ `Const` **getFileSizeInBytes**(`str`): `number`

Converts file size in string to bytes based on IEC specification

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `any` | file size |

#### Returns

`number`

file size as bytes (in kb) based on IEC specification

___

### randomWord

▸ `Const` **randomWord**(`l`): `string`

Utility to generate a random word from seed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `l` | `number` | seed value |

#### Returns

`string`

random word

___

### sizeToBytes

▸ `Const` **sizeToBytes**(`size`, `symbol`): `number`

Converts number to bytes based on the symbol as per IEC specification

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` | size as number |
| `symbol` | `string` | symbol to use (for example, kb, mb, gb or tb) |

#### Returns

`number`

number as bytes based on the symbol
