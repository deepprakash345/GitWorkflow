# Class: FieldChanged

[Form](../modules/Form.md).FieldChanged

## Hierarchy

- `ActionImpl`

  ↳ **`FieldChanged`**

## Table of contents

### Properties

- [\_type](Form.FieldChanged.md#_type)

### Constructors

- [constructor](Form.FieldChanged.md#constructor)

### Accessors

- [isCustomEvent](Form.FieldChanged.md#iscustomevent)
- [metadata](Form.FieldChanged.md#metadata)
- [payload](Form.FieldChanged.md#payload)
- [target](Form.FieldChanged.md#target)
- [type](Form.FieldChanged.md#type)

### Methods

- [payloadToJson](Form.FieldChanged.md#payloadtojson)
- [toJson](Form.FieldChanged.md#tojson)
- [toString](Form.FieldChanged.md#tostring)

## Properties

### \_type

• `Protected` **\_type**: `string`

#### Inherited from

ActionImpl.\_type

## Constructors

### constructor

• **new FieldChanged**(`changes`, `field`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | [`ChangePayload`](../modules/controller_Controller.md#changepayload) |
| `field` | [`BaseJson`](../modules/types_Json.md#basejson) |

#### Overrides

ActionImpl.constructor

## Accessors

### isCustomEvent

• `get` **isCustomEvent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ActionImpl.isCustomEvent

___

### metadata

• `get` **metadata**(): `any`

#### Returns

`any`

#### Inherited from

ActionImpl.metadata

___

### payload

• `get` **payload**(): `any`

#### Returns

`any`

#### Inherited from

ActionImpl.payload

___

### target

• `get` **target**(): [`FormModel`](../interfaces/types_Model.FormModel.md) \| [`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md)

#### Returns

[`FormModel`](../interfaces/types_Model.FormModel.md) \| [`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md)

#### Inherited from

ActionImpl.target

___

### type

• `get` **type**(): `string`

#### Returns

`string`

#### Inherited from

ActionImpl.type

## Methods

### payloadToJson

▸ `Protected` **payloadToJson**(): `any`

#### Returns

`any`

#### Inherited from

ActionImpl.payloadToJson

___

### toJson

▸ **toJson**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `isCustomEvent` | `boolean` |
| `payload` | `any` |
| `type` | `string` |

#### Inherited from

ActionImpl.toJson

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Inherited from

ActionImpl.toString
