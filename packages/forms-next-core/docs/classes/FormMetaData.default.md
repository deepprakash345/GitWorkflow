# Class: default

[FormMetaData](../modules/FormMetaData.md).default

## Hierarchy

- [`default`](Node.default.md)<[`MetaDataJson`](../modules/types_Json.md#metadatajson)\>

  ↳ **`default`**

## Implements

- [`FormMetaDataModel`](../interfaces/types_Model.FormMetaDataModel.md)

## Table of contents

### Properties

- [\_jsonModel](FormMetaData.default.md#_jsonmodel)

### Constructors

- [constructor](FormMetaData.default.md#constructor)

### Methods

- [getP](FormMetaData.default.md#getp)

### Accessors

- [grammarVersion](FormMetaData.default.md#grammarversion)
- [isContainer](FormMetaData.default.md#iscontainer)
- [locale](FormMetaData.default.md#locale)
- [version](FormMetaData.default.md#version)

## Properties

### \_jsonModel

• `Protected` **\_jsonModel**: [`MetaDataJson`](../modules/types_Json.md#metadatajson)

#### Inherited from

[default](Node.default.md).[_jsonModel](Node.default.md#_jsonmodel)

## Constructors

### constructor

• **new default**(`inputModel`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputModel` | [`MetaDataJson`](../modules/types_Json.md#metadatajson) |

#### Inherited from

[default](Node.default.md).[constructor](Node.default.md#constructor)

## Methods

### getP

▸ `Protected` **getP**<`S`\>(`key`, `def`): `S`

#### Type parameters

| Name |
| :------ |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `def` | `S` |

#### Returns

`S`

#### Inherited from

[default](Node.default.md).[getP](Node.default.md#getp)

## Accessors

### grammarVersion

• `get` **grammarVersion**(): `string`

Version of the rule grammar

#### Returns

`string`

#### Implementation of

[FormMetaDataModel](../interfaces/types_Model.FormMetaDataModel.md).[grammarVersion](../interfaces/types_Model.FormMetaDataModel.md#grammarversion)

___

### isContainer

• `get` **isContainer**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Node.isContainer

___

### locale

• `get` **locale**(): `string`

Form locale

#### Returns

`string`

#### Implementation of

[FormMetaDataModel](../interfaces/types_Model.FormMetaDataModel.md).[locale](../interfaces/types_Model.FormMetaDataModel.md#locale)

___

### version

• `get` **version**(): `string`

Version of the adaptive form specification

#### Returns

`string`

#### Implementation of

[FormMetaDataModel](../interfaces/types_Model.FormMetaDataModel.md).[version](../interfaces/types_Model.FormMetaDataModel.md#version)
