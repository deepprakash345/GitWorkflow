# Class: default

[FormMetaData](../modules/FormMetaData.md).default

Defines form metadata which implements [Form MetaData Model](../interfaces/FormModel.FormMetaDataModel.md)

## Hierarchy

- `Node`<[`MetaDataJson`](../modules/FormJsonTypes.md#metadatajson)\>

  ↳ **`default`**

## Implements

- [`FormMetaDataModel`](../interfaces/FormModel.FormMetaDataModel.md)

## Table of contents

### Constructors

- [constructor](FormMetaData.default.md#constructor)

### Accessors

- [grammarVersion](FormMetaData.default.md#grammarversion)
- [isContainer](FormMetaData.default.md#iscontainer)
- [locale](FormMetaData.default.md#locale)
- [version](FormMetaData.default.md#version)

## Constructors

### constructor

• **new default**(`inputModel`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputModel` | [`MetaDataJson`](../modules/FormJsonTypes.md#metadatajson) |

#### Inherited from

Node<MetaDataJson\>.constructor

## Accessors

### grammarVersion

• `get` **grammarVersion**(): `string`

Version of the rule grammar

#### Returns

`string`

#### Implementation of

[FormMetaDataModel](../interfaces/FormModel.FormMetaDataModel.md).[grammarVersion](../interfaces/FormModel.FormMetaDataModel.md#grammarversion)

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

[FormMetaDataModel](../interfaces/FormModel.FormMetaDataModel.md).[locale](../interfaces/FormModel.FormMetaDataModel.md#locale)

___

### version

• `get` **version**(): `string`

Version of the crispr form specification

#### Returns

`string`

#### Implementation of

[FormMetaDataModel](../interfaces/FormModel.FormMetaDataModel.md).[version](../interfaces/FormModel.FormMetaDataModel.md#version)
