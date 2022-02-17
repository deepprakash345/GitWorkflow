# Class: FieldChanged

[Events](../modules/Events.md).FieldChanged

Implementation of `fieldChanged` event. The field changed event is triggered on the field which it has changed.

## Hierarchy

- `ActionImpl`

  ↳ **`FieldChanged`**

## Table of contents

### Constructors

- [constructor](Events.FieldChanged.md#constructor)

### Accessors

- [isCustomEvent](Events.FieldChanged.md#iscustomevent)
- [metadata](Events.FieldChanged.md#metadata)
- [payload](Events.FieldChanged.md#payload)
- [target](Events.FieldChanged.md#target)
- [type](Events.FieldChanged.md#type)

### Methods

- [toJson](Events.FieldChanged.md#tojson)
- [toString](Events.FieldChanged.md#tostring)

## Constructors

### constructor

• **new FieldChanged**(`changes`, `field`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | [`ChangePayload`](../modules/Events.md#changepayload) |
| `field` | [`BaseJson`](../modules/FormJsonTypes.md#basejson) |

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
