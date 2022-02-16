# Class: Validate

[Form](../modules/Form.md).Validate

## Hierarchy

- `ActionImpl`

  ↳ **`Validate`**

## Table of contents

### Constructors

- [constructor](Form.Validate.md#constructor)

### Accessors

- [isCustomEvent](Form.Validate.md#iscustomevent)
- [metadata](Form.Validate.md#metadata)
- [payload](Form.Validate.md#payload)
- [target](Form.Validate.md#target)
- [type](Form.Validate.md#type)

### Methods

- [toJson](Form.Validate.md#tojson)
- [toString](Form.Validate.md#tostring)

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

• `get` **target**(): [`FormModel`](../interfaces/FormModel.FormModel-1.md) \| [`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md)

#### Returns

[`FormModel`](../interfaces/FormModel.FormModel-1.md) \| [`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md)

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
