# Class: Validate

[Events](../modules/Events.md).Validate

Implementation of `validate` event. The validate event is triggered on the Form once any field is validated.

## Hierarchy

- `ActionImpl`

  ↳ **`Validate`**

## Table of contents

### Constructors

- [constructor](Events.Validate.md#constructor)

### Accessors

- [isCustomEvent](Events.Validate.md#iscustomevent)
- [metadata](Events.Validate.md#metadata)
- [payload](Events.Validate.md#payload)
- [target](Events.Validate.md#target)
- [type](Events.Validate.md#type)

### Methods

- [toJson](Events.Validate.md#tojson)
- [toString](Events.Validate.md#tostring)

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
