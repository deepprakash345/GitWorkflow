# Module: utils/JsonUtils

## Table of contents

### Functions

- [deepClone](utils_JsonUtils.md#deepclone)
- [getProperty](utils_JsonUtils.md#getproperty)
- [isCheckbox](utils_JsonUtils.md#ischeckbox)
- [isCheckboxGroup](utils_JsonUtils.md#ischeckboxgroup)
- [isFile](utils_JsonUtils.md#isfile)
- [jsonString](utils_JsonUtils.md#jsonstring)

## Functions

### deepClone

▸ **deepClone**(`obj`): `any`

Clones an object completely including any nested objects or arrays

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`any`

___

### getProperty

▸ `Const` **getProperty**<`P`\>(`data`, `key`, `def`): `P`

#### Type parameters

| Name |
| :------ |
| `P` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `key` | `string` |
| `def` | `P` |

#### Returns

`P`

___

### isCheckbox

▸ `Const` **isCheckbox**(`item`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`FieldJson`](types_Json.md#fieldjson) \| [`FieldsetJson`](types_Json.md#fieldsetjson) |

#### Returns

`boolean`

___

### isCheckboxGroup

▸ `Const` **isCheckboxGroup**(`item`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`FieldJson`](types_Json.md#fieldjson) \| [`FieldsetJson`](types_Json.md#fieldsetjson) |

#### Returns

`boolean`

___

### isFile

▸ `Const` **isFile**(`item`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`FieldJson`](types_Json.md#fieldjson) \| [`FieldsetJson`](types_Json.md#fieldsetjson) |

#### Returns

`boolean`

___

### jsonString

▸ `Const` **jsonString**(`obj`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`string`
