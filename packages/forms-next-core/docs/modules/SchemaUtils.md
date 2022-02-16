# Module: SchemaUtils

Defines generic utilities to convert form model definition to json schema

## Table of contents

### Functions

- [defaultViewTypes](SchemaUtils.md#defaultviewtypes)
- [exportDataSchema](SchemaUtils.md#exportdataschema)

## Functions

### defaultViewTypes

▸ `Const` **defaultViewTypes**(`schema`): `string`

Returns the default view type for a given form field object based on `crispr form specification`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `any` | schema item for which default view type is to found |

#### Returns

`string`

default view type

___

### exportDataSchema

▸ `Const` **exportDataSchema**(`form`): `any`

Creates a json schema from form model definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `form` | [`FormJson`](FormJsonTypes.md#formjson) | [form model definition](FormJsonTypes.md#formjson) |

#### Returns

`any`

json schema of form model definition
