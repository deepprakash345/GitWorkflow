# Class: Validate

[Form](../modules/Form.md).Validate

## Hierarchy

- `ActionImpl`

  ↳ **`Validate`**

## Table of contents

### Properties

- [\_type](Form.Validate.md#_type)

### Constructors

- [constructor](Form.Validate.md#constructor)

### Accessors

- [isCustomEvent](Form.Validate.md#iscustomevent)
- [metadata](Form.Validate.md#metadata)
- [payload](Form.Validate.md#payload)
- [target](Form.Validate.md#target)
- [type](Form.Validate.md#type)

### Methods

- [payloadToJson](Form.Validate.md#payloadtojson)
- [toJson](Form.Validate.md#tojson)
- [toString](Form.Validate.md#tostring)

## Properties

### \_type

• `Protected` **\_type**: `string`

#### Inherited from

ActionImpl.\_type

## Constructors

### constructor

• **new Validate**()

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
