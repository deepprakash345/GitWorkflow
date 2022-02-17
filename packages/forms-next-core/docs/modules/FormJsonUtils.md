# Module: FormJsonUtils

Defines generic utilities to interact with form model definition which is represented as json

## Table of contents

### Functions

- [getProperty](FormJsonUtils.md#getproperty)
- [isCheckbox](FormJsonUtils.md#ischeckbox)
- [isCheckboxGroup](FormJsonUtils.md#ischeckboxgroup)
- [isFile](FormJsonUtils.md#isfile)
- [jsonString](FormJsonUtils.md#jsonstring)

## Functions

### getProperty

▸ `Const` **getProperty**<`P`\>(`data`, `key`, `def`): `P`

Get the property value form the json

#### Type parameters

| Name | Description |
| :------ | :------ |
| `P` | type for the default value |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | object as json |
| `key` | `string` | name of the key |
| `def` | `P` | default value |

#### Returns

`P`

___

### isCheckbox

▸ `Const` **isCheckbox**(`item`): `boolean`

Checks if the input item provided is a form check box field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`FieldJson`](FormJsonTypes.md#fieldjson) \| [`FieldsetJson`](FormJsonTypes.md#fieldsetjson) | input item it could be [Fieldset](FormJsonTypes.md#fieldsetjson) or [Field](FormJsonTypes.md#fieldjson) |

#### Returns

`boolean`

`true` if `item` is a form check box, `false` otherwise

___

### isCheckboxGroup

▸ `Const` **isCheckboxGroup**(`item`): `boolean`

Checks if the input item provided is a form check box group field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`FieldJson`](FormJsonTypes.md#fieldjson) \| [`FieldsetJson`](FormJsonTypes.md#fieldsetjson) | input item it could be [Fieldset](FormJsonTypes.md#fieldsetjson) or [Field](FormJsonTypes.md#fieldjson) |

#### Returns

`boolean`

`true` if `item` is a form check box group, `false` otherwise

___

### isFile

▸ `Const` **isFile**(`item`): `boolean`

Checks if the input item provided is a form file attachment field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`FieldJson`](FormJsonTypes.md#fieldjson) \| [`FieldsetJson`](FormJsonTypes.md#fieldsetjson) | input item it could be [Fieldset](FormJsonTypes.md#fieldsetjson) or [Field](FormJsonTypes.md#fieldjson) |

#### Returns

`boolean`

`true` if `item` is a form file attachment, `false` otherwise

___

### jsonString

▸ `Const` **jsonString**(`obj`): `string`

Prettifies obj as json string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `any` | object to prettify |

#### Returns

`string`

json string
