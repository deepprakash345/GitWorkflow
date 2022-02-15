# Module: utils/FormUtils

## Table of contents

### Functions

- [IdGenerator](utils_FormUtils.md#idgenerator)
- [dataURItoBlob](utils_FormUtils.md#datauritoblob)
- [getAttachments](utils_FormUtils.md#getattachments)
- [getFileSizeInBytes](utils_FormUtils.md#getfilesizeinbytes)
- [randomWord](utils_FormUtils.md#randomword)
- [sizeToBytes](utils_FormUtils.md#sizetobytes)

## Functions

### IdGenerator

▸ `Const` **IdGenerator**(`initial?`): `Generator`<`string`, `void`, `string`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `initial` | `number` | `50` |

#### Returns

`Generator`<`string`, `void`, `string`\>

___

### dataURItoBlob

▸ `Const` **dataURItoBlob**(`dataURI`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataURI` | `string` |

#### Returns

`Object`

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
| `input` | [`ContainerModel`](../interfaces/types_Model.ContainerModel.md) |

#### Returns

`any`

___

### getFileSizeInBytes

▸ `Const` **getFileSizeInBytes**(`str`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `any` |

#### Returns

`number`

___

### randomWord

▸ `Const` **randomWord**(`l`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | `number` |

#### Returns

`string`

___

### sizeToBytes

▸ `Const` **sizeToBytes**(`size`, `symbol`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |
| `symbol` | `string` |

#### Returns

`number`
