# Class: Valid

[Events](../modules/Events.md).Valid

Implementation of `valid` event. The valid event is triggered whenever the field’s valid state is changed from invalid to valid.

## Hierarchy

- `ActionImpl`

  ↳ **`Valid`**

## Table of contents

### Constructors

- [constructor](Events.Valid.md#constructor)

### Accessors

- [isCustomEvent](Events.Valid.md#iscustomevent)
- [metadata](Events.Valid.md#metadata)
- [payload](Events.Valid.md#payload)
- [target](Events.Valid.md#target)
- [type](Events.Valid.md#type)

### Methods

- [toJson](Events.Valid.md#tojson)
- [toString](Events.Valid.md#tostring)

## Constructors

### constructor

• **new Valid**(`payload?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `any` |

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
